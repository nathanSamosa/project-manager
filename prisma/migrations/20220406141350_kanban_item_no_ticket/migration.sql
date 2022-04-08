/*
  Warnings:

  - You are about to drop the column `isKanban` on the `KanbanItem` table. All the data in the column will be lost.
  - You are about to drop the column `isTicket` on the `KanbanItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KanbanItem" DROP COLUMN "isKanban",
DROP COLUMN "isTicket";
