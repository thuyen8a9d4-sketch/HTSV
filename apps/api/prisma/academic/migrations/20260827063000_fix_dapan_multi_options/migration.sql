-- Allow multiple answer options per question (A/B/C/D), instead of a strict
-- 1:1. Uniqueness moves to (questionId, optionLabel); "exactly one correct
-- answer per question" is still enforced separately by the partial index
-- added in add_raw_constraints.
DROP INDEX "DapAn_questionId_key";
CREATE UNIQUE INDEX "DapAn_questionId_optionLabel_key" ON "DapAn"("questionId", "optionLabel");
