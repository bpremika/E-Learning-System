/*
  Warnings:

  - Made the column `studentUser_id` on table `Assignment_Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assignment_id` on table `Assignment_Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Assignment_Student" DROP CONSTRAINT "Assignment_Student_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment_Student" DROP CONSTRAINT "Assignment_Student_studentUser_id_fkey";

-- AlterTable
ALTER TABLE "Assignment_Student" ALTER COLUMN "studentUser_id" SET NOT NULL,
ALTER COLUMN "assignment_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignment_Student" ADD CONSTRAINT "Assignment_Student_studentUser_id_fkey" FOREIGN KEY ("studentUser_id") REFERENCES "StudentUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment_Student" ADD CONSTRAINT "Assignment_Student_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
