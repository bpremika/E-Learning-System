import { nullable } from "zod";
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

export interface UpdateCourseInInstructorDto {
    course_desc: string;
    course_detail: string;
}

export interface UpdateCourseVideoInInstructorDto {
    name: string;
    video_url: string;
}

export interface UpdateAssignmentInInstructorDto {
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}

export interface CreateCourseVideoDto {}

export interface CreateAssignmentDto {
    //     name           String
    //   description    String
    //   aj_file_url    String
    //   max_score      Int
    //   get_score      Int
    //   course_id      Int
    //   course         Course         @relation(fields: [course_id], references: [id])
    //   created_at     DateTime       @default(now())
    //   modified_at    DateTime       @default(now())
}
