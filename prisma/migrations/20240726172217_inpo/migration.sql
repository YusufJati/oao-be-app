/*
  Warnings:

  - You are about to drop the column `statuskawin` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "statuskawin",
ADD COLUMN     "status_pernikahan" VARCHAR(255);
