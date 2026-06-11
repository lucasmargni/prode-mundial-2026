-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Match" ADD COLUMN "realGoalsLocal" INTEGER,
ADD COLUMN "realGoalsAway" INTEGER;