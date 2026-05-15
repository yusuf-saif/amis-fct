-- CreateTable
CREATE TABLE "DuesTierSetting" (
    "id" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "tier1Amount" INTEGER NOT NULL,
    "tier2Amount" INTEGER NOT NULL,
    "tier3Amount" INTEGER NOT NULL,
    "tier4Amount" INTEGER NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DuesTierSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DuesTierSetting_academicYear_key" ON "DuesTierSetting"("academicYear");

-- CreateIndex
CREATE INDEX "DuesTierSetting_isCurrent_idx" ON "DuesTierSetting"("isCurrent");

-- CreateIndex
CREATE UNIQUE INDEX "AppSetting_key_key" ON "AppSetting"("key");
