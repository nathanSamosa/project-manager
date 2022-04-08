/*
  Warnings:

  - Added the required column `isKanban` to the `KanbanItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTicket` to the `KanbanItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KanbanItem" ADD COLUMN     "isKanban" BOOLEAN NOT NULL,
ADD COLUMN     "isTicket" BOOLEAN NOT NULL;
