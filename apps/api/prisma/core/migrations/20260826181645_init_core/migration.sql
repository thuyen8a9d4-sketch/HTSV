-- CreateEnum
CREATE TYPE "OtpPurpose" AS ENUM ('REGISTER', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "ConfessionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('LIKE');

-- CreateEnum
CREATE TYPE "BaoCaoStatus" AS ENUM ('OPEN', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "KiemDuyetAction" AS ENUM ('APPROVE', 'REJECT');

-- CreateTable
CREATE TABLE "NguoiDung" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(150) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NguoiDung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaiTro" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "VaiTro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quyen" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(60) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(300),

    CONSTRAINT "Quyen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NguoiDung_VaiTro" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "NguoiDung_VaiTro_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "VaiTro_Quyen" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "VaiTro_Quyen_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "GiangVien" (
    "userId" INTEGER NOT NULL,
    "lecturerCode" VARCHAR(20) NOT NULL,
    "department" VARCHAR(100),
    "title" VARCHAR(50),

    CONSTRAINT "GiangVien_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "SinhVien" (
    "userId" INTEGER NOT NULL,
    "studentCode" VARCHAR(20) NOT NULL,
    "className" VARCHAR(50),
    "major" VARCHAR(100),
    "enrollmentYear" INTEGER,

    CONSTRAINT "SinhVien_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MaXacThuc" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "purpose" "OtpPurpose" NOT NULL DEFAULT 'REGISTER',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaXacThuc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaiConfession" (
    "id" SERIAL NOT NULL,
    "authorUserId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "content" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "status" "ConfessionStatus" NOT NULL DEFAULT 'PENDING',
    "rejectReason" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),
    "approvedByUserId" INTEGER,

    CONSTRAINT "BaiConfession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DanhMucConfession" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,

    CONSTRAINT "DanhMucConfession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BinhLuan" (
    "id" SERIAL NOT NULL,
    "confessionId" INTEGER NOT NULL,
    "authorUserId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BinhLuan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuotThich" (
    "id" SERIAL NOT NULL,
    "confessionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "LikeType" NOT NULL DEFAULT 'LIKE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LuotThich_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaoCao" (
    "id" SERIAL NOT NULL,
    "confessionId" INTEGER,
    "commentId" INTEGER,
    "reporterUserId" INTEGER NOT NULL,
    "reason" VARCHAR(300) NOT NULL,
    "status" "BaoCaoStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BaoCao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhatKyKiemDuyet" (
    "id" SERIAL NOT NULL,
    "confessionId" INTEGER NOT NULL,
    "moderatorUserId" INTEGER NOT NULL,
    "action" "KiemDuyetAction" NOT NULL,
    "oldStatus" VARCHAR(20),
    "newStatus" VARCHAR(20),
    "note" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NhatKyKiemDuyet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NguoiDung_username_key" ON "NguoiDung"("username");

-- CreateIndex
CREATE UNIQUE INDEX "NguoiDung_email_key" ON "NguoiDung"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VaiTro_code_key" ON "VaiTro"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Quyen_code_key" ON "Quyen"("code");

-- CreateIndex
CREATE UNIQUE INDEX "GiangVien_lecturerCode_key" ON "GiangVien"("lecturerCode");

-- CreateIndex
CREATE UNIQUE INDEX "SinhVien_studentCode_key" ON "SinhVien"("studentCode");

-- CreateIndex
CREATE INDEX "MaXacThuc_userId_purpose_isUsed_idx" ON "MaXacThuc"("userId", "purpose", "isUsed");

-- CreateIndex
CREATE INDEX "BaiConfession_status_createdAt_idx" ON "BaiConfession"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DanhMucConfession_slug_key" ON "DanhMucConfession"("slug");

-- CreateIndex
CREATE INDEX "BinhLuan_confessionId_idx" ON "BinhLuan"("confessionId");

-- CreateIndex
CREATE UNIQUE INDEX "LuotThich_confessionId_userId_type_key" ON "LuotThich"("confessionId", "userId", "type");

-- AddForeignKey
ALTER TABLE "NguoiDung_VaiTro" ADD CONSTRAINT "NguoiDung_VaiTro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "NguoiDung"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NguoiDung_VaiTro" ADD CONSTRAINT "NguoiDung_VaiTro_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "VaiTro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaiTro_Quyen" ADD CONSTRAINT "VaiTro_Quyen_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "VaiTro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaiTro_Quyen" ADD CONSTRAINT "VaiTro_Quyen_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Quyen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiangVien" ADD CONSTRAINT "GiangVien_userId_fkey" FOREIGN KEY ("userId") REFERENCES "NguoiDung"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SinhVien" ADD CONSTRAINT "SinhVien_userId_fkey" FOREIGN KEY ("userId") REFERENCES "NguoiDung"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaXacThuc" ADD CONSTRAINT "MaXacThuc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "NguoiDung"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaiConfession" ADD CONSTRAINT "BaiConfession_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "NguoiDung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaiConfession" ADD CONSTRAINT "BaiConfession_approvedByUserId_fkey" FOREIGN KEY ("approvedByUserId") REFERENCES "NguoiDung"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaiConfession" ADD CONSTRAINT "BaiConfession_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DanhMucConfession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinhLuan" ADD CONSTRAINT "BinhLuan_confessionId_fkey" FOREIGN KEY ("confessionId") REFERENCES "BaiConfession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinhLuan" ADD CONSTRAINT "BinhLuan_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "NguoiDung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuotThich" ADD CONSTRAINT "LuotThich_confessionId_fkey" FOREIGN KEY ("confessionId") REFERENCES "BaiConfession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuotThich" ADD CONSTRAINT "LuotThich_userId_fkey" FOREIGN KEY ("userId") REFERENCES "NguoiDung"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_confessionId_fkey" FOREIGN KEY ("confessionId") REFERENCES "BaiConfession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "BinhLuan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_reporterUserId_fkey" FOREIGN KEY ("reporterUserId") REFERENCES "NguoiDung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhatKyKiemDuyet" ADD CONSTRAINT "NhatKyKiemDuyet_confessionId_fkey" FOREIGN KEY ("confessionId") REFERENCES "BaiConfession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhatKyKiemDuyet" ADD CONSTRAINT "NhatKyKiemDuyet_moderatorUserId_fkey" FOREIGN KEY ("moderatorUserId") REFERENCES "NguoiDung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
