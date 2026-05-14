-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "attachmentFileName" TEXT,
ADD COLUMN     "attachmentFileSizeBytes" INTEGER,
ADD COLUMN     "attachmentFileType" TEXT,
ADD COLUMN     "attachmentUrl" TEXT;
