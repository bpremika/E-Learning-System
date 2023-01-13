import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { InstructorDetailedDashboardDto } from "../dto/common.dto";
import {
    UpdateCourseInInstructorDto,
    UpdateCourseVideoInInstructorDto,
    UpdateAssignmentInInstructorDto,
    CreateCourseVideoDto,
    CreateAssignmentDto,
} from "../dto/course.dto";
import {
    createAssignmentSchema,
    createCourseVideoSchema,
    updateAssignmentSchema,
    updateCourseVideoSchema,
    updateDescCourseSchema,
} from "../common/CourseValidator";

const getDetailedDashboard = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            studentUser: true,
            assignment: true,
            courseVideo: true,
        },
    });

    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    if (course.instructor_id != req.session.userID) {
        res.status(404).send({ message: "This course not contain this ID" });
        return;
    }

    const instructorDetailedDashboardDto: InstructorDetailedDashboardDto = {
        students_in_course: course.studentUser.map((student) => ({
            first_name: student.first_name,
            last_name: student.last_name,
        })),
        videos_in_course: course.courseVideo.map((video) => ({
            id: video.id,
            name: video.name,
            video_url: video.video_url,
        })),
        assignments_in_course: course.assignment.map((assignment) => ({
            id: assignment.id,
            name: assignment.name,
            description: assignment.description,
            aj_file_url: assignment.aj_file_url,
            max_score: assignment.max_score,
        })),
        course_desc: course.course_desc,
        course_detail: course.course_detail,
    };

    res.status(200).json(instructorDetailedDashboardDto);
};

const updateDescCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const newCourseDto: UpdateCourseInInstructorDto = req.body;
    const check = updateDescCourseSchema.safeParse(newCourseDto);

    if (check.success) {
        const course_check_id = await prisma.course.findUnique({
            where: { id },
        });

        if (course_check_id == null) {
            res.status(404).send({ message: "not found" });
            return;
        }

        if (course_check_id.instructor_id != req.session.userID) {
            res.status(404).send({ message: "invalid ID" });
            return;
        }

        const course = await prisma.course.update({
            where: { id },
            data: {
                course_desc: newCourseDto.course_desc,
                course_detail: newCourseDto.course_detail,
            },
        });
        res.status(200).json(course);
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

const updateCourseVideo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const newVideoDto: UpdateCourseVideoInInstructorDto = req.body;
    const check = updateCourseVideoSchema.safeParse(newVideoDto);
    if (check.success) {
        const course_check_id = await prisma.course.findUnique({
            where: { id },
        });

        if (course_check_id == null) {
            res.status(404).send({ message: "not found" });
            return;
        }

        if (course_check_id.instructor_id != req.session.userID) {
            res.status(404).send({ message: "invalid ID" });
            return;
        }

        const courseVideo = await prisma.courseVideo.update({
            where: {
                id,
            },
            data: {
                name: newVideoDto.name,
                video_url: newVideoDto.video_url,
            },
        });
        res.status(200).json(courseVideo);
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

const updateAssignment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const newAssignment: UpdateAssignmentInInstructorDto = req.body;
    const check = updateAssignmentSchema.safeParse(newAssignment);
    if (check.success) {
        const course_check_id = await prisma.course.findUnique({
            where: { id },
        });

        if (course_check_id == null) {
            res.status(404).send({ message: "not found" });
            return;
        }

        if (course_check_id.instructor_id != req.session.userID) {
            res.status(404).send({ message: "invalid ID" });
            return;
        }

        const assignment = await prisma.assignment.update({
            where: { id },
            data: {
                name: newAssignment.name,
                description: newAssignment.description,
                aj_file_url: newAssignment.aj_file_url,
                max_score: newAssignment.max_score,
            },
        });
        res.status(200).json(assignment);
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

const createCourseVideo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const courseVideo: CreateCourseVideoDto = req.body;
    const check = createCourseVideoSchema.safeParse(courseVideo);
    if (check.success) {
        const course_check_id = await prisma.course.findUnique({
            where: { id },
        });

        if (course_check_id == null) {
            res.status(404).send({ message: "not found" });
            return;
        }

        if (course_check_id.instructor_id != req.session.userID) {
            res.status(404).send({ message: "invalid ID" });
            return;
        }

        try {
            const result = await prisma.courseVideo.create({
                data: {
                    name: courseVideo.name,
                    video_url: courseVideo.video_url,
                    course_id: id,
                },
            });

            console.log(result);

            res.status(201).json(result);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

const createAssignment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const assignment: CreateAssignmentDto = req.body;
    const check = createAssignmentSchema.safeParse(assignment);
    if (check.success) {
        const course_check_id = await prisma.course.findUnique({
            where: { id },
        });

        if (course_check_id == null) {
            res.status(404).send({ message: "not found" });
            return;
        }

        if (course_check_id.instructor_id != req.session.userID) {
            res.status(404).send({ message: "invalid ID" });
            return;
        }

        try {
            const result = await prisma.assignment.create({
                data: {
                    name: assignment.name,
                    description: assignment.description,
                    aj_file_url: assignment.aj_file_url,
                    max_score: assignment.max_score,
                    course_id: id,
                },
            });

            console.log(result);

            res.status(201).json(result);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

export {
    getDetailedDashboard,
    updateDescCourse,
    updateCourseVideo,
    updateAssignment,
    createCourseVideo,
    createAssignment,
};
