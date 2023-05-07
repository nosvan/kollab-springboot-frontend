/*
  Warnings:

  - The values [other] on the enum `ItemType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `item` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemType_new" AS ENUM ('assignment', 'note', 'project', 'reminder', 'meeting', 'test', 'general');
ALTER TABLE "item" ALTER COLUMN "item_type" TYPE "ItemType_new" USING ("item_type"::text::"ItemType_new");
ALTER TYPE "ItemType" RENAME TO "ItemType_old";
ALTER TYPE "ItemType_new" RENAME TO "ItemType";
DROP TYPE "ItemType_old";
COMMIT;

-- AlterTable
ALTER TABLE "item" DROP COLUMN "date",
DROP COLUMN "due_date",
DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "date_tz_insensitive" TIMESTAMP(3),
ADD COLUMN     "date_tz_sensitive" TIMESTAMP(3),
ADD COLUMN     "date_tz_sensitive_end" TIMESTAMP(3),
ADD COLUMN     "time_sensitive_flag" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "item_type" SET DEFAULT 'general';
