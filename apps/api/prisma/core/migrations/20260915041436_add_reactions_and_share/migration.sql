-- AlterEnum
ALTER TYPE "LikeType" ADD VALUE 'LOVE';
ALTER TYPE "LikeType" ADD VALUE 'HAHA';
ALTER TYPE "LikeType" ADD VALUE 'SAD';
ALTER TYPE "LikeType" ADD VALUE 'ANGRY';

-- AlterTable
ALTER TABLE "BaiConfession" ADD COLUMN "shareCount" INTEGER NOT NULL DEFAULT 0;

-- DropIndex
DROP INDEX "LuotThich_confessionId_userId_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "LuotThich_confessionId_userId_key" ON "LuotThich"("confessionId", "userId");
