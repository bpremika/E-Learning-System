/*
  Warnings:

  - You are about to drop the column `modified_file_at` on the `Assignment_Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assignment_Student" DROP COLUMN "modified_file_at",
ALTER COLUMN "file_url" SET DEFAULT '';
