import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/academic/schema.prisma',
  datasource: {
    url: env('ACADEMIC_DATABASE_URL'),
  },
  migrations: {
    path: 'prisma/academic/migrations',
  },
});
