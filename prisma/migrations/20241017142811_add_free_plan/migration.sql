-- AlterEnum
ALTER TYPE "Plan" ADD VALUE 'FREE';

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "plan" SET DEFAULT 'FREE';
