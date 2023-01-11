import { CourseHomeDto } from "./common.dto";

export interface CoursesDto {
    total: number;
    courses: CourseHomeDto[];
}

export interface CreateCourseDto {
    name: string;
    category: string;
    course_desc: string;
    course_detail: string;
    course_cover_url: string;
    guide_url: string;
    instructor_id: number;
    max_student: number;
    curr_student: number;
}

export interface UpdateCourseDto {
    name: string;
    category: string;
    course_desc: string;
    course_detail: string;
    course_cover_url: string;
    guide_url: string;
    instructor_id: number;
    max_student: number;
    curr_student: number;
}
