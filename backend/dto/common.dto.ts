export interface CourseHomeDto {
    name: string;
    course_desc: string;
    course_cover_url: string;
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
