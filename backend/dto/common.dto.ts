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
    // courses?: CourseHomeDto[];
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
    // courses?: CourseHomeDto[];
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
