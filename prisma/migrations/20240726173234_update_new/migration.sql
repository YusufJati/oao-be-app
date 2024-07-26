/*
  Warnings:

  - You are about to drop the column `jenis_identitas` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `kode_negara` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "jenis_identitas",
DROP COLUMN "kode_negara";
