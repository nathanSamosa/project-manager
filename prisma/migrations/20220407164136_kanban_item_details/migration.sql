/*
  Warnings:

  - Added the required column `details` to the `KanbanItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KanbanItem" ADD COLUMN     "details" TEXT NOT NULL;
