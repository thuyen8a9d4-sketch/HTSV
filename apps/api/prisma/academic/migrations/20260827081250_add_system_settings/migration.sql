-- CreateTable
CREATE TABLE "CaiDatHeThong" (
    "id" SERIAL NOT NULL,
    "monetizationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaiDatHeThong_pkey" PRIMARY KEY ("id")
);
