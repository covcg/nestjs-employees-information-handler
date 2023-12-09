/*
  Warnings:

  - Made the column `bloodType` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "hash" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "bloodType" SET NOT NULL;
