const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Simple env parser
const envFile = fs.readFileSync(path.join(__dirname, 'apps/server1/.env'), 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim().replace(/^"(.*)"$/, '$1');
  }
});

process.env.DATABASE_URL = env.DATABASE_URL;

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.findFirst();
    const template = await prisma.template.findFirst({ where: { isActive: true } });
    
    if (!user || !template) {
      console.log("Required data missing. User:", !!user, "Template:", !!template);
      return;
    }

    console.log("TEST_DATA_START");
    console.log(JSON.stringify({ 
      userId: user.id, 
      userEmail: user.email, 
      templateId: template.id,
      templateName: template.name,
      jwtSecret: env.JWT_SECRET
    }));
    console.log("TEST_DATA_END");
  } catch (err) {
    console.error("DB Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
