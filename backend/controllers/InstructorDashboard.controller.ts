import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { InstructorDashboardDto } from "../dto/common.dto";

const getInstructorUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const instructorUser = await prisma.instructorUser.findUnique({
        where: { id },
        include: {
            course: true,
        },
    });

    if (instructorUser === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    if (instructorUser.id != req.session.userID) {
        res.status(404).send({ message: "Invalid ID" });
        return;
    }

    const courses = instructorUser.course;

    let total_all_student = 0;
    for (const element of courses) {
        total_all_student += element.curr_student;
    }

    const instructorDashboardDto: InstructorDashboardDto = {
        total_course: courses.length,
        total_all_student,
        courses: courses.map((course) => ({
            name: course.name,
            course_cover_url: course.course_cover_url,
            max_student: course.max_student,
            curr_student: course.curr_student,
        })),
    };

    res.status(200).json(instructorDashboardDto);
};

export { getInstructorUser };
