-- CreateTable
CREATE TABLE "StudentUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstructorUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "course_desc" TEXT NOT NULL,
    "instructor_id" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseVideo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "CourseVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToStudentUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentUser_username_key" ON "StudentUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "StudentUser_email_key" ON "StudentUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorUser_username_key" ON "InstructorUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorUser_email_key" ON "InstructorUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToStudentUser_AB_unique" ON "_CourseToStudentUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToStudentUser_B_index" ON "_CourseToStudentUser"("B");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "InstructorUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseVideo" ADD CONSTRAINT "CourseVideo_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToStudentUser" ADD CONSTRAINT "_CourseToStudentUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToStudentUser" ADD CONSTRAINT "_CourseToStudentUser_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
