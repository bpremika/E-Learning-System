import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { InstructorDetailedDashboardDto } from "../dto/common.dto";
import {
    UpdateCourseInInstructorDto,
    UpdateCourseVideoInInstructorDto,
    UpdateAssignmentInInstructorDto,
    CreateCourseVideoDto,
    CreateAssignmentDto,
    UpdateScoreCheckHomeworkDto,
    CheckHomeworkDto,
} from "../dto/course.dto";
import {
    courseMaterialSchema,
    createAssignmentSchema,
    createCourseVideoSchema,
    updateAssignmentSchema,
    updateCourseVideoSchema,
    updateDescCourseSchema,
    UpdateScoreCheckHomeworkSchema,
} from "../common/CourseValidator";
import { CourseMaterial } from "../dto/user.dto";

const getDetailedDashboard2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            studentUser: true,
            assignment: {
                include: {
                    assignment_student: true,
                },
            },
            courseVideo: true,
        },
    });

    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }

    let all_submitted_student = 0;

    for (const assignment of course.assignment) {
        for (const assignment_student of assignment.assignment_student) {
            if (assignment_student.isSubmitted) {
                all_submitted_student++;
            }
        }
    }

    const instructorDetailedDashboardDto: InstructorDetailedDashboardDto = {
        students_in_course: course.studentUser.map((student) => ({
            username: student.username,
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
            all_submitted_student,
        })),
        course_desc: course.course_desc,
        course_detail: course.course_detail,
    };

    res.status(200).json(instructorDetailedDashboardDto);
};

const updateDescCourse2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const newCourseDto: UpdateCourseInInstructorDto = req.body;
    const check = updateDescCourseSchema.safeParse(newCourseDto);

    if (check.success) {
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

const updateCourseVideo2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const newVideoDto: UpdateCourseVideoInInstructorDto = req.body;
    const check = updateCourseVideoSchema.safeParse(newVideoDto);
    if (check.success) {
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

const updateAssignment2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const newAssignment: UpdateAssignmentInInstructorDto = req.body;
    const check = updateAssignmentSchema.safeParse(newAssignment);
    if (check.success) {
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

const createCourseVideo2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const courseVideo: CreateCourseVideoDto = req.body;
    const check = createCourseVideoSchema.safeParse(courseVideo);
    if (check.success) {
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

const createAssignment2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); //course id
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const assignment: CreateAssignmentDto = req.body;
    const check = createAssignmentSchema.safeParse(assignment);
    if (check.success) {
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

            const course = await prisma.course.findUnique({
                where: { id },
                include: {
                    studentUser: true,
                },
            });

            if (course == null) {
                res.status(400).json({ message: "not have course" });
                return;
            }
            for (const element of course.studentUser) {
                const result2 = await prisma.assignment_Student.create({
                    data: {
                        assignment_id: result.id,
                        studentUser_id: element.id,
                    },
                });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

const createCourseMaterial2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const material: CourseMaterial = req.body;
    const result = courseMaterialSchema.safeParse(material);
    if (result.success) {
        try {
            if (material == null || undefined) {
                res.status(401).send({ message: "file name is undefined" });
                return;
            }
            const course = await prisma.course.findUnique({
                where: {
                    id,
                },
            });
            if (course === null) {
                res.status(404).send({ message: "course not found" });
                return;
            }
            res.status(200).json({ message: "upload file successfully!" });
            course.course_material.push(result.data.name);
        } catch {
            res.status(401).send({ message: "upload file fail." });
            return;
        }
    } else {
        res.status(401).json({ message: "parse error." });
    }
};

const checkHomework2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); //id of assignment
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const assignment_Students = await prisma.assignment_Student.findMany({
        where: {
            assignment_id: id,
        },
        include: {
            StudentUser: true,
        },
    });

    const checkHomeworkDto: CheckHomeworkDto = {
        partCheckHomeworksDto: assignment_Students.map(
            (partCheckHomeworkDto) => ({
                name: partCheckHomeworkDto.StudentUser.username,
                file_url: partCheckHomeworkDto.file_url,
            })
        ),
    };

    res.status(200).json(checkHomeworkDto);
};

const updateScoreCheckHomework2 = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); //id of assignment_student
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    const updateScoreCheckHomeworkDto: UpdateScoreCheckHomeworkDto = req.body;
    const check = UpdateScoreCheckHomeworkSchema.safeParse(
        updateScoreCheckHomeworkDto
    );
    if (check.success) {
        const assignment_Student = await prisma.assignment_Student.update({
            where: { id },
            data: check.data,
        });
        res.status(200).json(assignment_Student);
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

export {
    getDetailedDashboard2,
    updateDescCourse2,
    updateCourseVideo2,
    updateAssignment2,
    createCourseVideo2,
    createAssignment2,
    createCourseMaterial2,
    checkHomework2,
    updateScoreCheckHomework2,
};
