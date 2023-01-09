import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { CourseHomeDto } from "../dto/common.dto";
import {
    CoursesDto,
    CreateCourseDto,
    UpdateCourseDto,
} from "../dto/course.dto";
import { courseSchema } from "../common/CourseValidator";

const getOneCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            studentUser: true,
        },
    });

    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    const courseDto: CourseHomeDto = {
        name: course.name,
        course_desc: course.course_desc,
        course_cover_url: course.course_cover_url,
    };

    res.status(200).json(courseDto);
};

const getCategoryCourse = async (req: Request, res: Response) => {
    const category = req.params.cat.toUpperCase();
    const courses = await prisma.course.findMany({
        where: { category },
        include: {
            studentUser: true,
        },
    });

    if (courses === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    const coursesDto: CoursesDto = {
        total: courses.length,
        courses: courses.map((course) => ({
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };

    res.status(200).json(coursesDto);
};

const getManyCourse = async (req: Request, res: Response) => {
    const courses = await prisma.course.findMany();
    const coursesDto: CoursesDto = {
        total: courses.length,
        courses: courses.map((course) => ({
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };
    res.status(200).json(coursesDto);
};

const createCourse = async (req: Request, res: Response) => {
    const course: CreateCourseDto = req.body;
    const check = courseSchema.safeParse(course);
    if (check.success) {
        try {
            const result = await prisma.course.create({
                data: {
                    name: course.name,
                    category: course.category,
                    course_desc: course.course_desc,
                    course_detail: course.course_detail,
                    course_cover_url: course.course_cover_url,
                    guide_url: course.guide_url,
                    instructor_id: course.instructor_id,
                },
            });

            console.log(result);

            res.status(201).json(result);
        } catch (e) {
            console.log("have error");
            res.status(400).json({ message: "something wents wrong" });
        }
    } else {
        res.status(400).json({ message: "something wents wrong" });
    }
};

const updateCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const newCourseDto: UpdateCourseDto = req.body;
    const course = await prisma.course.update({
        where: { id },
        data: {
            name: newCourseDto.name,
            category: newCourseDto.category,
            course_desc: newCourseDto.course_desc,
            course_detail: newCourseDto.course_detail,
            course_cover_url: newCourseDto.course_cover_url,
            guide_url: newCourseDto.guide_url,
            instructor_id: newCourseDto.instructor_id,
        },
    });
    res.status(200).json(course);
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

export {
    getOneCourse,
    getCategoryCourse,
    getManyCourse,
    createCourse,
    updateCourse,
    deleteCourse,
};
