import { prisma } from '@repo/database';
import { NotFoundError, AppError } from '@repo/shared-utils';
import * as fs from 'fs';
import * as path from 'path';

export class UserService {
  static async updateWorkspace(userId: number, workspacePath: string) {
    // 1. Validate if path is absolute and exists (or is creatable)
    if (!path.isAbsolute(workspacePath)) {
      throw new AppError(400, 'Workspace path must be absolute', 'INVALID_PATH');
    }

    // 2. Test if the disk is writable
    try {
      if (!fs.existsSync(workspacePath)) {
        fs.mkdirSync(workspacePath, { recursive: true });
      }
      
      const testFile = path.join(workspacePath, `.write-test-${Date.now()}`);
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
    } catch (err: any) {
      throw new AppError(400, `Cannot write to disk at "${workspacePath}": ${err.message}`, 'DISK_PERMISSION_DENIED');
    }

    // 3. Update in DB
    const user = await prisma.user.update({
      where: { id: userId },
      data: { workspacePath },
      select: { id: true, email: true, name: true, workspacePath: true }
    });

    return user;
  }

  static async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, workspacePath: true }
    });
    if (!user) throw new NotFoundError('User');
    return user;
  }
}
