import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@repo/database';
import { ConflictError, UnauthorizedError, RateLimitError } from '@repo/shared-utils';
import { RegisterInput, LoginInput } from '@repo/validation';
import { AuthTokens, UserDTO } from '@repo/types';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from './redis.service';

export class AuthService {
  private static readonly ACCESS_TOKEN_EXPIRY = '1h';
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';

  static async register(input: RegisterInput): Promise<{ user: UserDTO; tokens: AuthTokens }> {
    const { email, password, name } = input;

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // 2. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });

    // 4. Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      tokens,
    };
  }

  static async login(input: LoginInput, ip: string): Promise<{ user: UserDTO; tokens: AuthTokens }> {
    const { email, password } = input;

    // 1. Check fail counter in Redis
    const failCount = await RedisService.getLoginFailCount(ip);
    if (failCount >= 5) {
      throw new RateLimitError('Too many failed attempts. Please try again in 15 minutes.');
    }

    // 2. Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 3. Verify password
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      await RedisService.incrementLoginFail(ip);
      throw new UnauthorizedError('Invalid credentials');
    }

    // 4. Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      tokens,
    };
  }

  static generateTokens(userId: number | string, email: string): AuthTokens {
    const accessToken = jwt.sign(
      { userId, email, jti: uuidv4() },
      process.env.JWT_SECRET!,
      { expiresIn: this.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { userId, email, jti: uuidv4() },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
  }


  static async logout(jti: string, exp: number): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    const remainingSeconds = exp - now;

    if (remainingSeconds > 0) {
      await RedisService.blacklistToken(jti, remainingSeconds);
    }
  }

  static async refresh(token: string): Promise<{ accessToken: string }> {
    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;

      // Check if blacklisted
      const isBlacklisted = await RedisService.isTokenBlacklisted(payload.jti);
      if (isBlacklisted) {
        throw new UnauthorizedError('Token blacklisted');
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: payload.userId, email: payload.email, jti: uuidv4() },
        process.env.JWT_SECRET!,
        { expiresIn: this.ACCESS_TOKEN_EXPIRY }
      );

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }
}
