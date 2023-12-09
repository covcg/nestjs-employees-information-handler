-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EMPLOYEE', 'ADMINISTRATOR');

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "hash" VARCHAR(80) NOT NULL,
    "firstName" VARCHAR(40),
    "lastName" VARCHAR(40),
    "emergencyContact" VARCHAR(80),
    "emergencyNumber" VARCHAR(20),
    "bloodType" VARCHAR(8),
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees-permissions" (
    "usedId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "employees-permissions_pkey" PRIMARY KEY ("usedId","permissionId")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(160),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- AddForeignKey
ALTER TABLE "employees-permissions" ADD CONSTRAINT "employees-permissions_usedId_fkey" FOREIGN KEY ("usedId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees-permissions" ADD CONSTRAINT "employees-permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
