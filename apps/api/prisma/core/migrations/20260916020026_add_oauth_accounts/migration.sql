-- AlterTable: password becomes optional (OAuth-only accounts have none),
-- and add the provider ids used to link a Google/Facebook login.
ALTER TABLE "NguoiDung" ALTER COLUMN "passwordHash" DROP NOT NULL;
ALTER TABLE "NguoiDung" ADD COLUMN "googleId" VARCHAR(255);
ALTER TABLE "NguoiDung" ADD COLUMN "facebookId" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "NguoiDung_googleId_key" ON "NguoiDung"("googleId");
CREATE UNIQUE INDEX "NguoiDung_facebookId_key" ON "NguoiDung"("facebookId");
