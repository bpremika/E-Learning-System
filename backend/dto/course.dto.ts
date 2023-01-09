// import { Days } from "@prisma/client"
// import { CourseDto } from "./common.dto"

export interface CoursesDto {
    total: number;
    //   courses: CourseDto[]
}

export interface CreateCourseDto {
    name: string;
    description: string;
    credit: number;
    //   day: Days
    time: string;
}
