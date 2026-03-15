import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import { PrismaClient } from "./generated/prisma";

// Required for Node.js environments when using WebSockets with Neon
if (typeof (globalThis as any).window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}



class PrismaDB {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaDB.instance) {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
      }
      const adapter = new PrismaNeon({ connectionString });
      
      const prismaClient = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });

      if (process.env.NODE_ENV !== "production") {
        const globalForPrisma = globalThis as unknown as {
          prisma: PrismaClient | undefined;
        };
        
        if (!globalForPrisma.prisma) {
          globalForPrisma.prisma = prismaClient;
        }
        
        return globalForPrisma.prisma;
      }

      PrismaDB.instance = prismaClient;
    }

    return PrismaDB.instance;
  }
}

export const prisma = PrismaDB.getInstance();

export * from "./generated/prisma";


