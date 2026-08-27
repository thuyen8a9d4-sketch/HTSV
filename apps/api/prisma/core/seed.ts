import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as argon2 from 'argon2';
import { PrismaClient } from '../../src/generated/core-client';

const adapter = new PrismaPg({ connectionString: process.env.CORE_DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const roles = [
    { code: 'ADMIN', name: 'Quản trị viên' },
    { code: 'LECTURER', name: 'Giảng viên' },
    { code: 'STUDENT', name: 'Sinh viên' },
  ];

  for (const role of roles) {
    await prisma.vaiTro.upsert({
      where: { code: role.code },
      update: {},
      create: role,
    });
  }

  const adminUsername = process.env.ADMIN_SEED_USERNAME ?? 'admin';
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? 'admin@htsv.local';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? 'Admin@123';

  const existingAdmin = await prisma.nguoiDung.findUnique({
    where: { username: adminUsername },
  });

  if (!existingAdmin) {
    const adminRole = await prisma.vaiTro.findUniqueOrThrow({
      where: { code: 'ADMIN' },
    });
    const passwordHash = await argon2.hash(adminPassword);
    await prisma.nguoiDung.create({
      data: {
        username: adminUsername,
        email: adminEmail,
        fullName: 'Administrator',
        passwordHash,
        isActive: true,
        userRoles: {
          create: { roleId: adminRole.id },
        },
      },
    });
    console.log(`Seeded admin account "${adminUsername}"`);
  } else {
    console.log(`Admin account "${adminUsername}" already exists, skipping`);
  }

  console.log('Core seed complete.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
