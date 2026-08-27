-- Exactly one correct answer per question (mirrors the old app's constraint)
CREATE UNIQUE INDEX "UX_DapAn_MotDapAnDung" ON "DapAn" ("questionId") WHERE "isCorrect" = true;

-- Rating must be between 1 and 5 stars
ALTER TABLE "DanhGiaTaiLieu" ADD CONSTRAINT "CK_DanhGia_Rating" CHECK ("rating" BETWEEN 1 AND 5);
