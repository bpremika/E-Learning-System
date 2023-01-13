import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { MyCourseDto } from "../dto/common.dto";

const getMyCourse = async (req: Request, res: Response) => {
    const session = req.session;
    if (session.username == "") {
        res.status(404).json({ message: "Course Not found." });
    }
    const user = await prisma.studentUser.findUnique({
        where: {
            id: session.userID,
        },
        include: {
            course: true,
        },
    });
    if (req.session.role == "instructor") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }
    if (user === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    const myCourseDto: MyCourseDto = {
        courses: user.course.map((course) => ({
            id: course.id,
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };

    res.status(200).json(myCourseDto);
};

export { getMyCourse };
