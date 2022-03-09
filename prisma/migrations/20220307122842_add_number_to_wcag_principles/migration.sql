/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `WCAGPrinciple` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `WCAGPrinciple` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WCAGPrinciple" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WCAGPrinciple_number_key" ON "WCAGPrinciple"("number");
