export interface CourseInfo {
    name: string;
    course_desc: string;
    course_cover_url: string;
}

export interface CourseResultDTO {
    total: number;
    courses: CourseInfo[];
}
