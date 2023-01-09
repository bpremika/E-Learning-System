import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { CourseDto } from "../dto/common.dto";
import {
    CoursesDto,
    CreateCourseDto,
    UpdateCourseDto,
} from "../dto/course.dto";

const getOneCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            instructor: true,
            students: true,
        },
    });

    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    const courseDto: CourseDto = {
        id: course.id,
        name: course.name,
        category: course.category,
        course_desc: course.course_desc,
        students: course.students.map(
            (student: {
                id: any;
                username: any;
                email: any;
                password: any;
                first_name: any;
                last_name: any;
                phone_number: any;
            }) => ({
                id: student.id,
                username: student.username,
                email: student.email,
                password: student.password,
                first_name: student.first_name,
                last_name: student.last_name,
                phone_number: student.phone_number,
            })
        ),
    };

    res.status(200).json(courseDto);
};

const getManyCourse = async (req: Request, res: Response) => {
    const courses = await prisma.course.findMany();
    const coursesDto: CoursesDto = {
        total: courses.length,
        courses: courses.map(
            (course: {
                id: any;
                name: any;
                category: any;
                course_desc: any;
                students: {
                    id: any;
                    username: any;
                    email: any;
                    password: any;
                    first_name: any;
                    last_name: any;
                    phone_number: any;
                }[];
            }) => ({
                id: course.id,
                name: course.name,
                category: course.category,
                course_desc: course.course_desc,
                students: course.students.map(
                    (student: {
                        id: any;
                        username: any;
                        email: any;
                        password: any;
                        first_name: any;
                        last_name: any;
                        phone_number: any;
                    }) => ({
                        id: student.id,
                        username: student.username,
                        email: student.email,
                        password: student.password,
                        first_name: student.first_name,
                        last_name: student.last_name,
                        phone_number: student.phone_number,
                    })
                ),
            })
        ),
    };
    res.status(200).json(coursesDto);
};

const createCourse = async (req: Request, res: Response) => {
    const course: CreateCourseDto = req.body;

    const result = await prisma.course.create({
        data: {
            name: course.name,
            category: course.category,
            course_desc: course.course_desc,
            instructor_id: course.instructor_id,
        },
    });

    const courseDto: CourseDto = {
        id: result.id,
        name: result.name,
        category: result.category,
        course_desc: result.course_desc,
    };

    res.status(201).json(courseDto);
};

const updateCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const newCourseDto: UpdateCourseDto = req.body;
    const bio = await prisma.studentBio.update({
        where: { id },
        data: {
            name: newCourseDto.name,
            category: newCourseDto.category,
            course_desc: newCourseDto.course_desc,
            instructor_id: newCourseDto.instructor_id,
        },
    });
    res.status(200).json(bio);
};

const deleteCourse = async (req: Request, res: Response) => {
    const id = req.params.id;
    await prisma.course.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(204).send();
};

export { getOneCourse, getManyCourse, createCourse, deleteCourse };
