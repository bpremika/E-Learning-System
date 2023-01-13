export interface User {
    username: string;
    password: string;
}

export interface SessionDTO {
    userID: number;
    username: string;
    role: string;
}
export interface CreateUser {
    prefix: string;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    image_url: string;
}

export interface CourseMaterial {
    name: string;
}
