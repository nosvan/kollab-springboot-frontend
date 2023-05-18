-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('assignment', 'note', 'project', 'reminder', 'meeting', 'test', 'other');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('admin', 'public');

-- CreateEnum
CREATE TYPE "VisibilityLevel" AS ENUM ('admin', 'private', 'public');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('classroom', 'group');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('fall', 'spring', 'summer', 'winter', 'na');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "town" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "school_name" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "description" TEXT,
    "passcode" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" INTEGER NOT NULL,
    "passcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_permission" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permission" "AccessLevel" NOT NULL DEFAULT 'public',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "Category",
    "category_id" INTEGER,
    "item_type" "ItemType" NOT NULL,
    "due_date" TIMESTAMP(3),
    "start_time" TEXT,
    "end_time" TEXT,
    "permission_level" "VisibilityLevel" NOT NULL DEFAULT 'public',
    "created_by_id" INTEGER NOT NULL,
    "last_modified_by_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_permission" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
