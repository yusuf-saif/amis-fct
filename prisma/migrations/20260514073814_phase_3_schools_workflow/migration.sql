-- AlterEnum
ALTER TYPE "SchoolStatus" ADD VALUE 'MORE_INFO_REQUESTED';

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "moreInfoRequestMessage" TEXT;
