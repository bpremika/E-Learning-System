export interface CourseDto {
    id: number;
    name: string;
    category: string;
    course_desc: string;
    students?: StudentUserDto[];
    Instructor?: InstructorUserDto[];
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
    total_student: number;
}
