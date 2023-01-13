import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { MyCourseDto } from "../dto/common.dto";

const getMyCourse = async (req: Request, res: Response) => {
    if (req.session.role == "instructor") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const courses = await prisma.course.findMany({
        include: {
            studentUser: true,
        },
    });

    if (courses === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    let new_courses = [];

    for (const course of courses) {
        for (const studentUser of course.studentUser) {
            if (studentUser.id === req.session.userID) {
                new_courses.push(course);
                continue;
            }
        }
    }

    const myCourseDto: MyCourseDto = {
        courses: new_courses.map((course) => ({
            id: course.id,
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };

    res.status(200).json(myCourseDto);
};

export { getMyCourse };
