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
    courseMaterialSchema,
    createAssignmentSchema,
    createCourseVideoSchema,
    updateAssignmentSchema,
    updateCourseVideoSchema,
    updateDescCourseSchema,
} from "../common/CourseValidator";
import { CourseMaterial } from "../dto/user.dto";

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

const updateCourseVideo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const newVideoDto: UpdateCourseVideoInInstructorDto = req.body;
    const check = updateCourseVideoSchema.safeParse(newVideoDto);
    if (check.success) {
        const courseVideo = await prisma.courseVideo.update({
            where: { id },
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

const createCourseVideo = async (req: Request, res: Response) => {
    const courseVideo: CreateCourseVideoDto = req.body;
    const check = createCourseVideoSchema.safeParse(courseVideo);
    if (check.success) {
        try {
            const result = await prisma.courseVideo.create({
                data: {
                    name: courseVideo.name,
                    video_url: courseVideo.video_url,
                    course_id: courseVideo.course_id,
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
                    course_id: assignment.course_id,
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


const createCourseMaterial = async (req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    const material:CourseMaterial = req.body;
    const result = courseMaterialSchema.safeParse(material);
    if (result.success){
        try{
            if (material == null || undefined){
                res.status(401).send({ message: "file name is undefined" });
                return;
            }
            const course = await prisma.course.findUnique({
                where:{
                    id
                },
            })
            if (course === null) {
                res.status(404).send({ message: "course not found" });
                return;
            }
            res.status(200).json({message: "upload file successfully!"})
            course.course_material.push(result.data.name)
        }
        catch{
            res.status(401).send({ message: "upload file fail." });
            return;
        }
    }
    else{
        res.status(401).json({message: "parse error."})
    }

}
export {
    getDetailedDashboard,
    updateDescCourse,
    updateCourseVideo,
    updateAssignment,
    createCourseVideo,
    createAssignment,
    createCourseMaterial
};
