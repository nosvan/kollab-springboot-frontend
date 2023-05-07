/*
  Warnings:

  - The values [admin] on the enum `VisibilityLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VisibilityLevel_new" AS ENUM ('private', 'public');
ALTER TABLE "item" ALTER COLUMN "permission_level" DROP DEFAULT;
ALTER TABLE "item" ALTER COLUMN "permission_level" TYPE "VisibilityLevel_new" USING ("permission_level"::text::"VisibilityLevel_new");
ALTER TYPE "VisibilityLevel" RENAME TO "VisibilityLevel_old";
ALTER TYPE "VisibilityLevel_new" RENAME TO "VisibilityLevel";
DROP TYPE "VisibilityLevel_old";
ALTER TABLE "item" ALTER COLUMN "permission_level" SET DEFAULT 'public';
COMMIT;
