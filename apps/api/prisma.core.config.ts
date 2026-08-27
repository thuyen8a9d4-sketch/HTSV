import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/core/schema.prisma',
  datasource: {
    url: env('CORE_DATABASE_URL'),
  },
  migrations: {
    path: 'prisma/core/migrations',
    seed: 'ts-node -r tsconfig-paths/register prisma/core/seed.ts',
  },
});
