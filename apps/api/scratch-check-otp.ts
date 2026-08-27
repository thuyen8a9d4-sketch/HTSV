import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './src/generated/core-client';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.CORE_DATABASE_URL }) });

async function main() {
  const otp = await prisma.maXacThuc.findFirst({ where: { purpose: 'PASSWORD_RESET' }, orderBy: { id: 'desc' } });
  console.log(otp);
}
main().finally(() => prisma.$disconnect());
