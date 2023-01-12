import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { InstructorDetailedDashboardDto } from "../dto/common.dto";
import {
    UpdateCourseInInstructorDto,
    UpdateCourseVideoInInstructorDto,
    UpdateAssignmentInInstructorDto,
} from "../dto/course.dto";

const getDetailedDashboard = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
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
    const newCourseDto: UpdateCourseInInstructorDto = req.body;
    const course = await prisma.course.update({
        where: { id },
        data: {
            course_desc: newCourseDto.course_desc,
            course_detail: newCourseDto.course_detail,
        },
    });
    res.status(200).json(course);
};

const updateCourseVideo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const newVideoDto: UpdateCourseVideoInInstructorDto = req.body;
    const courseVideo = await prisma.courseVideo.update({
        where: { id },
        data: {
            name: newVideoDto.name,
            video_url: newVideoDto.video_url,
        },
    });
    res.status(200).json(courseVideo);
};

const updateAssignment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const newAssignment: UpdateAssignmentInInstructorDto = req.body;
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
};

const createCourseVideo = async (req: Request, res: Response) => {};

export {
    getDetailedDashboard,
    updateDescCourse,
    updateCourseVideo,
    updateAssignment,
};
