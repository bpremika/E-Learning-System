/*
  Warnings:

  - Added the required column `course_cover_url` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_detail` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guide_url` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `InstructorUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "course_cover_url" TEXT NOT NULL,
ADD COLUMN     "course_detail" TEXT NOT NULL,
ADD COLUMN     "guide_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InstructorUser" ADD COLUMN     "image_url" TEXT NOT NULL;
