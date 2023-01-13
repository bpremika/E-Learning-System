import { DateTime } from "aws-sdk/clients/devicefarm";

export interface CourseHomeDto {
    all_category: string[];
    courses: PartCourseHomeDto[];
}

export interface PartCourseHomeDto {
    id: number;
    name: string;
    course_desc: string;
    course_cover_url: string;
}

export interface CourseEnrollDto {
    id: number;
    name: string;
    course_desc: string;
    first_name: string;
    last_name: string;
    guide_url: string;
}

export interface CourseStudentInfoDto {
    id: number;
    name: string;
    course_desc: string;
    course_detail: string;
    first_name: string;
    last_name: string;
    email: string;
    image_url: string;
}

export interface StudentUserDto {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    prefix: string;
    phone_number: string;
    image_url: string;
    courses?: CourseHomeDto[];
}

export interface InstructorUserDto {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    prefix: string;
    phone_number: string;
    image_url: string;
    courses?: CourseHomeDto[];
}

export interface InstructorDashboardDto {
    total_course: number;
    total_all_student: number;
    courses: CourseDashboardDto[];
}

export interface CourseDashboardDto {
    name: string;
    course_cover_url: string;
    max_student: number;
    curr_student: number;
}

export interface InstructorDetailedDashboardDto {
    students_in_course: StudentInInstructorDetailedDashboardDto[];
    videos_in_course: VideoInInstructorDetailedDashboardDto[];
    assignments_in_course: AssignmentInInstructorDetailedDashboardDto[];
    course_desc: string;
    course_detail: string;
}

export interface StudentInInstructorDetailedDashboardDto {
    username: string;
}

export interface VideoInInstructorDetailedDashboardDto {
    id: number;
    name: string;
    video_url: string;
}

export interface AssignmentInInstructorDetailedDashboardDto {
    id: number;
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}

export interface MyCourseDto {
    courses: PartCourseHomeDto[];
}

export interface CourseStudentAssignmentDto {
    to_do_assignments: ToDoAssignmentDto[];
    finished_assignments: FinishedAssignmentDto[];
}

export interface ToDoAssignmentDto {
    id: number;
    name: string;
    isSubmitted: boolean;
    max_score: number;
    modified_at: DateTime;
}

export interface FinishedAssignmentDto {
    id: number;
    name: string;
    isScored: boolean;
    getScored: number;
    max_score: number;
}
