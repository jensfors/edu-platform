/*
  Warnings:

  - Added the required column `link` to the `WCAGCriteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `WCAGPrinciple` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WCAGCriteria" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WCAGPrinciple" ADD COLUMN     "link" TEXT NOT NULL;
