/*
  Warnings:

  - The values [classroom,group] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `classroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `school` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('list');
ALTER TABLE "item" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- DropTable
DROP TABLE "classroom";

-- DropTable
DROP TABLE "group";

-- DropTable
DROP TABLE "group_permission";

-- DropTable
DROP TABLE "school";

-- DropEnum
DROP TYPE "Semester";

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" INTEGER NOT NULL,
    "passcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_permission" (
    "id" SERIAL NOT NULL,
    "list_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permission" "AccessLevel" NOT NULL DEFAULT 'public',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_permission_pkey" PRIMARY KEY ("id")
);
