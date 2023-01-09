import { CourseDto } from "./common.dto";

export interface CoursesDto {
    total: number;
    courses: CourseDto[];
}

export interface CreateCourseDto {
    name: string;
    category: string;
    course_desc: string;
    instructor_id: number;
}

export interface UpdateCourseDto {
    name: string;
    category: string;
    course_desc: string;
    instructor_id: number;
}
