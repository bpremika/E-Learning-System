export interface CourseHomeDto {
    name: string;
    course_desc: string;
    course_cover_url: string;
}

export interface CourseEnrollDto {
    name: string;
    course_desc: string;
    first_name: string;
    last_name: string;
    guide_url: string;
}

export interface CourseStudentInfoDto {
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
    first_name: string;
    last_name: string;
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
