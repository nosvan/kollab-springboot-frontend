/*
  Warnings:

  - The `date` column on the `item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "start_time" SET DATA TYPE TEXT,
ALTER COLUMN "end_time" SET DATA TYPE TEXT;
