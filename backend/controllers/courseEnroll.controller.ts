import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { CourseEnrollDto } from "../dto/common.dto";

const getCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            instructor: true,
        },
    });

    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    const instructor = course.instructor;

    const courseDto: CourseEnrollDto = {
        name: course.name,
        course_desc: course.course_desc,
        first_name: instructor.first_name,
        last_name: instructor.last_name,
        guide_url: course.guide_url,
    };

    res.status(200).json(courseDto);
};

export { getCourse };
