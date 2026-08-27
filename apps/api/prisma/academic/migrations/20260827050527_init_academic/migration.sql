-- CreateEnum
CREATE TYPE "SubjectLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "TaiLieuType" AS ENUM ('SLIDE', 'LESSON_PLAN', 'TEXTBOOK', 'OTHER');

-- CreateEnum
CREATE TYPE "TaiLieuStatus" AS ENUM ('DRAFT', 'PENDING', 'PUBLISHED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('PENDING', 'PROCESSED', 'FAILED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "AccessGrantSource" AS ENUM ('PURCHASE', 'FREE', 'ADMIN_GRANT');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE_CHOICE', 'MULTIPLE_CHOICE');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('AI_GENERATED', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ExamScopeType" AS ENUM ('BY_SUBJECT', 'BY_CHAPTER', 'CUSTOM');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED');

-- CreateEnum
CREATE TYPE "FlashcardSetStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "CardMasteryStatus" AS ENUM ('NEW', 'LEARNING', 'MASTERED');

-- CreateEnum
CREATE TYPE "DocumentQuestionStatus" AS ENUM ('OPEN', 'ANSWERED', 'CLOSED');

-- CreateTable
CREATE TABLE "MonHoc" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "thumbnailPath" VARCHAR(500),
    "level" "SubjectLevel",

    CONSTRAINT "MonHoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChuongMonHoc" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "chapterNo" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "weightPercent" DECIMAL(5,2),

    CONSTRAINT "ChuongMonHoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeCuong" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeCuong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaiLieu" (
    "id" SERIAL NOT NULL,
    "ownerUserId" INTEGER NOT NULL,
    "subjectId" INTEGER,
    "type" "TaiLieuType" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "isSellable" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(18,2),
    "status" "TaiLieuStatus" NOT NULL DEFAULT 'DRAFT',
    "previewPageLimit" INTEGER NOT NULL DEFAULT 2,
    "averageRating" DECIMAL(3,2),
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaiLieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhienBanTaiLieu" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "versionNo" INTEGER NOT NULL,
    "filePath" VARCHAR(500) NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL,
    "pageCount" INTEGER,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhienBanTaiLieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaiLieuKienThuc" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "processedStatus" "ProcessingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaiLieuKienThuc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoanKienThuc" (
    "id" SERIAL NOT NULL,
    "knowledgeDocumentId" INTEGER NOT NULL,
    "subjectChapterId" INTEGER NOT NULL,
    "sourceRef" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoanKienThuc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SanPham" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SanPham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonHang" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "DonHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietDonHang" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "ChiTietDonHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThanhToan" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "providerTxnId" VARCHAR(100),
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "ThanhToan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuyenTruyCapTaiLieu" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "grantedVia" "AccessGrantSource" NOT NULL,
    "orderId" INTEGER,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "QuyenTruyCapTaiLieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoTheGhiNho" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER,
    "subjectId" INTEGER,
    "ownerUserId" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "status" "FlashcardSetStatus" NOT NULL DEFAULT 'DRAFT',
    "cardCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoTheGhiNho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TheGhiNho" (
    "id" SERIAL NOT NULL,
    "setId" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "imagePath" VARCHAR(500),
    "position" INTEGER NOT NULL,

    CONSTRAINT "TheGhiNho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TienDoHocTap" (
    "id" SERIAL NOT NULL,
    "setId" INTEGER NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "roundsCompleted" INTEGER NOT NULL DEFAULT 0,
    "masteredCount" INTEGER NOT NULL DEFAULT 0,
    "lastStudiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TienDoHocTap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KetQuaTheThe" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "masteryStatus" "CardMasteryStatus" NOT NULL DEFAULT 'NEW',
    "correctStreak" INTEGER NOT NULL DEFAULT 0,
    "lastReviewedAt" TIMESTAMP(3),

    CONSTRAINT "KetQuaTheThe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauHoiTaiLieu" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "askerUserId" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "body" TEXT NOT NULL,
    "status" "DocumentQuestionStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CauHoiTaiLieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauTraLoiTaiLieu" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "responderUserId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CauTraLoiTaiLieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DanhGiaTaiLieu" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "reviewerUserId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DanhGiaTaiLieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NganHangCauHoi" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "subjectChapterId" INTEGER,
    "questionType" "QuestionType" NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "content" TEXT NOT NULL,
    "explanation" TEXT,
    "sourceKnowledgeChunkId" INTEGER,
    "status" "QuestionStatus" NOT NULL DEFAULT 'AI_GENERATED',
    "createdByUserId" INTEGER,
    "reviewedByUserId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NganHangCauHoi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DapAn" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "optionLabel" VARCHAR(2) NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "DapAn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeThi" (
    "id" SERIAL NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "scopeType" "ExamScopeType" NOT NULL,
    "scopeConfig" JSONB NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "durationMinutes" INTEGER,
    "theoryCount" INTEGER NOT NULL DEFAULT 0,
    "applicationCount" INTEGER NOT NULL DEFAULT 0,
    "practicalCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeThi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauHoiDeThi" (
    "id" SERIAL NOT NULL,
    "examId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "orderNo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CauHoiDeThi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuotLamBai" (
    "id" SERIAL NOT NULL,
    "examId" INTEGER NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "score" DECIMAL(5,2),
    "correctCount" INTEGER,
    "wrongCount" INTEGER,
    "status" "AttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',

    CONSTRAINT "LuotLamBai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauTraLoi" (
    "id" SERIAL NOT NULL,
    "attemptId" INTEGER NOT NULL,
    "examQuestionId" INTEGER NOT NULL,
    "selectedOptionId" INTEGER,
    "isCorrect" BOOLEAN,
    "answeredAt" TIMESTAMP(3),

    CONSTRAINT "CauTraLoi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonHoc_code_key" ON "MonHoc"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ChuongMonHoc_subjectId_chapterNo_key" ON "ChuongMonHoc"("subjectId", "chapterNo");

-- CreateIndex
CREATE INDEX "TaiLieu_status_type_idx" ON "TaiLieu"("status", "type");

-- CreateIndex
CREATE INDEX "TaiLieu_subjectId_idx" ON "TaiLieu"("subjectId");

-- CreateIndex
CREATE INDEX "TaiLieu_ownerUserId_idx" ON "TaiLieu"("ownerUserId");

-- CreateIndex
CREATE INDEX "TaiLieu_title_idx" ON "TaiLieu"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PhienBanTaiLieu_materialId_versionNo_key" ON "PhienBanTaiLieu"("materialId", "versionNo");

-- CreateIndex
CREATE UNIQUE INDEX "SanPham_materialId_key" ON "SanPham"("materialId");

-- CreateIndex
CREATE INDEX "DonHang_userId_status_idx" ON "DonHang"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "QuyenTruyCapTaiLieu_userId_materialId_key" ON "QuyenTruyCapTaiLieu"("userId", "materialId");

-- CreateIndex
CREATE INDEX "BoTheGhiNho_ownerUserId_idx" ON "BoTheGhiNho"("ownerUserId");

-- CreateIndex
CREATE INDEX "BoTheGhiNho_status_isPublic_idx" ON "BoTheGhiNho"("status", "isPublic");

-- CreateIndex
CREATE INDEX "BoTheGhiNho_subjectId_idx" ON "BoTheGhiNho"("subjectId");

-- CreateIndex
CREATE INDEX "TheGhiNho_setId_position_idx" ON "TheGhiNho"("setId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "TienDoHocTap_setId_studentUserId_key" ON "TienDoHocTap"("setId", "studentUserId");

-- CreateIndex
CREATE INDEX "KetQuaTheThe_studentUserId_masteryStatus_idx" ON "KetQuaTheThe"("studentUserId", "masteryStatus");

-- CreateIndex
CREATE UNIQUE INDEX "KetQuaTheThe_cardId_studentUserId_key" ON "KetQuaTheThe"("cardId", "studentUserId");

-- CreateIndex
CREATE INDEX "CauHoiTaiLieu_materialId_status_idx" ON "CauHoiTaiLieu"("materialId", "status");

-- CreateIndex
CREATE INDEX "CauHoiTaiLieu_askerUserId_idx" ON "CauHoiTaiLieu"("askerUserId");

-- CreateIndex
CREATE INDEX "CauTraLoiTaiLieu_questionId_idx" ON "CauTraLoiTaiLieu"("questionId");

-- CreateIndex
CREATE INDEX "DanhGiaTaiLieu_materialId_idx" ON "DanhGiaTaiLieu"("materialId");

-- CreateIndex
CREATE UNIQUE INDEX "DanhGiaTaiLieu_materialId_reviewerUserId_key" ON "DanhGiaTaiLieu"("materialId", "reviewerUserId");

-- CreateIndex
CREATE INDEX "NganHangCauHoi_subjectId_difficulty_idx" ON "NganHangCauHoi"("subjectId", "difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "DapAn_questionId_key" ON "DapAn"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "CauHoiDeThi_examId_questionId_key" ON "CauHoiDeThi"("examId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "CauTraLoi_attemptId_examQuestionId_key" ON "CauTraLoi"("attemptId", "examQuestionId");

-- AddForeignKey
ALTER TABLE "ChuongMonHoc" ADD CONSTRAINT "ChuongMonHoc_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "MonHoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeCuong" ADD CONSTRAINT "DeCuong_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "MonHoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaiLieu" ADD CONSTRAINT "TaiLieu_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "MonHoc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhienBanTaiLieu" ADD CONSTRAINT "PhienBanTaiLieu_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "TaiLieu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaiLieuKienThuc" ADD CONSTRAINT "TaiLieuKienThuc_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "TaiLieu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaiLieuKienThuc" ADD CONSTRAINT "TaiLieuKienThuc_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "MonHoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoanKienThuc" ADD CONSTRAINT "DoanKienThuc_knowledgeDocumentId_fkey" FOREIGN KEY ("knowledgeDocumentId") REFERENCES "TaiLieuKienThuc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoanKienThuc" ADD CONSTRAINT "DoanKienThuc_subjectChapterId_fkey" FOREIGN KEY ("subjectChapterId") REFERENCES "ChuongMonHoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanPham" ADD CONSTRAINT "SanPham_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "TaiLieu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ChiTietDonHang_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "DonHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ChiTietDonHang_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SanPham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThanhToan" ADD CONSTRAINT "ThanhToan_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "DonHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuyenTruyCapTaiLieu" ADD CONSTRAINT "QuyenTruyCapTaiLieu_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "TaiLieu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuyenTruyCapTaiLieu" ADD CONSTRAINT "QuyenTruyCapTaiLieu_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "DonHang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoTheGhiNho" ADD CONSTRAINT "BoTheGhiNho_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "TaiLieu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoTheGhiNho" ADD CONSTRAINT "BoTheGhiNho_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "MonHoc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheGhiNho" ADD CONSTRAINT "TheGhiNho_setId_fkey" FOREIGN KEY ("setId") REFERENCES "BoTheGhiNho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TienDoHocTap" ADD CONSTRAINT "TienDoHocTap_setId_fkey" FOREIGN KEY ("setId") REFERENCES "BoTheGhiNho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KetQuaTheThe" ADD CONSTRAINT "KetQuaTheThe_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "TheGhiNho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauHoiTaiLieu" ADD CONSTRAINT "CauHoiTaiLieu_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "TaiLieu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauTraLoiTaiLieu" ADD CONSTRAINT "CauTraLoiTaiLieu_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CauHoiTaiLieu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanhGiaTaiLieu" ADD CONSTRAINT "DanhGiaTaiLieu_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "TaiLieu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NganHangCauHoi" ADD CONSTRAINT "NganHangCauHoi_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "MonHoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NganHangCauHoi" ADD CONSTRAINT "NganHangCauHoi_subjectChapterId_fkey" FOREIGN KEY ("subjectChapterId") REFERENCES "ChuongMonHoc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NganHangCauHoi" ADD CONSTRAINT "NganHangCauHoi_sourceKnowledgeChunkId_fkey" FOREIGN KEY ("sourceKnowledgeChunkId") REFERENCES "DoanKienThuc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DapAn" ADD CONSTRAINT "DapAn_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "NganHangCauHoi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeThi" ADD CONSTRAINT "DeThi_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "MonHoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauHoiDeThi" ADD CONSTRAINT "CauHoiDeThi_examId_fkey" FOREIGN KEY ("examId") REFERENCES "DeThi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauHoiDeThi" ADD CONSTRAINT "CauHoiDeThi_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "NganHangCauHoi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuotLamBai" ADD CONSTRAINT "LuotLamBai_examId_fkey" FOREIGN KEY ("examId") REFERENCES "DeThi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauTraLoi" ADD CONSTRAINT "CauTraLoi_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "LuotLamBai"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauTraLoi" ADD CONSTRAINT "CauTraLoi_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "CauHoiDeThi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauTraLoi" ADD CONSTRAINT "CauTraLoi_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "DapAn"("id") ON DELETE SET NULL ON UPDATE CASCADE;
