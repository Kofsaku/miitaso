const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const user = await prisma.user.upsert({
      where: { email: 'admin@miitaso.com' },
      update: {
        password: hashedPassword,
        role: 'ADMIN'
      },
      create: {
        email: 'admin@miitaso.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    
    console.log('Admin user created/updated:', user.email);
    console.log('Login credentials:');
    console.log('Email: admin@miitaso.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();