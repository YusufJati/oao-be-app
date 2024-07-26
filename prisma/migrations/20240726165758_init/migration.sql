/*
  Warnings:

  - You are about to drop the column `status_pernikahan` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "status_pernikahan",
ADD COLUMN     "statuskawin" VARCHAR(255);
