/*
  Warnings:

  - You are about to drop the column `email` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `employees-permissions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees-permissions" DROP CONSTRAINT "employees-permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "employees-permissions" DROP CONSTRAINT "employees-permissions_usedId_fkey";

-- DropIndex
DROP INDEX "employees_email_key";

-- DropIndex
DROP INDEX "permissions_name_key";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "email",
DROP COLUMN "hash",
DROP COLUMN "role",
ADD COLUMN     "qrCode" BYTEA;

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "code" VARCHAR(20) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(40);

-- DropTable
DROP TABLE "employees-permissions";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "hash" VARCHAR(128) NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrators-permissions" (
    "usedId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "administrators-permissions_pkey" PRIMARY KEY ("usedId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_key" ON "Administrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- AddForeignKey
ALTER TABLE "administrators-permissions" ADD CONSTRAINT "administrators-permissions_usedId_fkey" FOREIGN KEY ("usedId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrators-permissions" ADD CONSTRAINT "administrators-permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
