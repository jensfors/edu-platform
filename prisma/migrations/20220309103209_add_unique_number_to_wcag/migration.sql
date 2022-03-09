/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `WCAGCriteria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WCAGCriteria_number_key" ON "WCAGCriteria"("number");
