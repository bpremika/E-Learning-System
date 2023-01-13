import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { CourseStudentInfoDto } from "../dto/common.dto";
import { CourseVideo, GetCourseVideoDTO } from "../dto/course.dto";
const getDetailedCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) && id != req.session.userID) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "instructor") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            instructor: true,
            studentUser: true,
        },
    });

    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    let check = false;

    for (const element of course.studentUser) {
        if (element.id === req.session.userID) {
            check = true;
        }
    }

    if (!check) {
        res.status(404).send({ message: "This course not contain this ID" });
        return;
    }

    const instructor = course.instructor;

    const courseDto: CourseStudentInfoDto = {
        id: course.id,
        name: course.name,
        course_desc: course.course_desc,
        course_detail: course.course_detail,
        first_name: instructor.first_name,
        last_name: instructor.last_name,
        email: instructor.email,
        image_url: instructor.image_url,
    };

    res.status(200).json(courseDto);
};

const getCourseVideo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            courseVideo: true,
        },
    });

    if (course === null) {
        res.status(404).send({ message: "course not found" });
        return;
    }

    const CourseVideos: GetCourseVideoDTO = {
        totalVideo: course.courseVideo.length,
        courseVideo: course.courseVideo as CourseVideo[],
    };

    res.status(200).json(CourseVideos);
};

export { getDetailedCourse, getCourseVideo };
