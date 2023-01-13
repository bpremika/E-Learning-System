import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { MyCourseDto } from "../dto/common.dto";

const getMyCourse = async (req: Request, res: Response) => {
    const courses = await prisma.course.findMany();

    if (courses === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    const myCourseDto: MyCourseDto = {
        courses: courses.map((course) => ({
            id: course.id,
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };

    res.status(200).json(myCourseDto);
};

export { getMyCourse };
