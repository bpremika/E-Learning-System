/*
  Warnings:

  - You are about to drop the `HomeworkFile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `file_url` to the `Assignment_Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HomeworkFile" DROP CONSTRAINT "HomeworkFile_assignment_id_fkey";

-- AlterTable
ALTER TABLE "Assignment_Student" ADD COLUMN     "file_url" TEXT NOT NULL,
ADD COLUMN     "modified_file_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "HomeworkFile";
