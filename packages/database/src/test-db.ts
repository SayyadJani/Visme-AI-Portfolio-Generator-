import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Use require to ensure dotenv has loaded variables before the client is initialized
const { prisma } = require('./index');

async function main() {
  console.log('🧪 Testing Prisma Client in database package...');
  
  try {
    // 1. Check connection/insert test user
    const user = await prisma.user.upsert({
      where: { email: 'prisma-test@example.com' },
      update: { name: 'Prisma Test User Updated' },
      create: {
        email: 'prisma-test@example.com',
        name: 'Prisma Test User',
        passwordHash: 'test_hash',
      },
    });

    console.log('✅ User Upserted:', user);

    // 2. Fetch all users
    const users = await prisma.user.findMany({
      take: 5
    });
    console.log('📊 Recent Users:', users.map((u: any) => u.email));

  } catch (e) {
    console.error('❌ Error during database test:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
