"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScoreCheckHomework2 = exports.checkHomework2 = exports.createCourseMaterial2 = exports.createAssignment2 = exports.createCourseVideo2 = exports.updateAssignment2 = exports.updateCourseVideo2 = exports.updateDescCourse2 = exports.getDetailedDashboard2 = void 0;
const prisma_1 = require("../common/prisma");
const CourseValidator_1 = require("../common/CourseValidator");
const getDetailedDashboard2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const course = yield prisma_1.prisma.course.findUnique({
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
    const instructorDetailedDashboardDto = {
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
});
exports.getDetailedDashboard2 = getDetailedDashboard2;
const updateDescCourse2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newCourseDto = req.body;
    const check = CourseValidator_1.updateDescCourseSchema.safeParse(newCourseDto);
    if (check.success) {
        const course = yield prisma_1.prisma.course.update({
            where: { id },
            data: {
                course_desc: newCourseDto.course_desc,
                course_detail: newCourseDto.course_detail,
            },
        });
        res.status(200).json(course);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.updateDescCourse2 = updateDescCourse2;
const updateCourseVideo2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newVideoDto = req.body;
    const check = CourseValidator_1.updateCourseVideoSchema.safeParse(newVideoDto);
    if (check.success) {
        const courseVideo = yield prisma_1.prisma.courseVideo.update({
            where: {
                id,
            },
            data: {
                name: newVideoDto.name,
                video_url: newVideoDto.video_url,
            },
        });
        res.status(200).json(courseVideo);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.updateCourseVideo2 = updateCourseVideo2;
const updateAssignment2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newAssignment = req.body;
    const check = CourseValidator_1.updateAssignmentSchema.safeParse(newAssignment);
    if (check.success) {
        const assignment = yield prisma_1.prisma.assignment.update({
            where: { id },
            data: {
                name: newAssignment.name,
                description: newAssignment.description,
                aj_file_url: newAssignment.aj_file_url,
                max_score: newAssignment.max_score,
            },
        });
        res.status(200).json(assignment);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.updateAssignment2 = updateAssignment2;
const createCourseVideo2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const courseVideo = req.body;
    const check = CourseValidator_1.createCourseVideoSchema.safeParse(courseVideo);
    if (check.success) {
        try {
            const result = yield prisma_1.prisma.courseVideo.create({
                data: {
                    name: courseVideo.name,
                    video_url: courseVideo.video_url,
                    course_id: id,
                },
            });
            console.log(result);
            res.status(201).json(result);
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.createCourseVideo2 = createCourseVideo2;
const createAssignment2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); //course id
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const assignment = req.body;
    const check = CourseValidator_1.createAssignmentSchema.safeParse(assignment);
    if (check.success) {
        try {
            const result = yield prisma_1.prisma.assignment.create({
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
            const course = yield prisma_1.prisma.course.findUnique({
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
                const result2 = yield prisma_1.prisma.assignment_Student.create({
                    data: {
                        assignment_id: result.id,
                        studentUser_id: element.id,
                    },
                });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.createAssignment2 = createAssignment2;
const createCourseMaterial2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const material = req.body;
    const result = CourseValidator_1.courseMaterialSchema.safeParse(material);
    if (result.success) {
        try {
            if (material == null || undefined) {
                res.status(401).send({ message: "file name is undefined" });
                return;
            }
            const course = yield prisma_1.prisma.course.findUnique({
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
        }
        catch (_a) {
            res.status(401).send({ message: "upload file fail." });
            return;
        }
    }
    else {
        res.status(401).json({ message: "parse error." });
    }
});
exports.createCourseMaterial2 = createCourseMaterial2;
const checkHomework2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); //id of assignment
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const assignment_Students = yield prisma_1.prisma.assignment_Student.findMany({
        where: {
            assignment_id: id,
        },
        include: {
            StudentUser: true,
        },
    });
    const checkHomeworkDto = {
        partCheckHomeworksDto: assignment_Students.map((partCheckHomeworkDto) => ({
            name: partCheckHomeworkDto.StudentUser.username,
            file_url: partCheckHomeworkDto.file_url,
        })),
    };
    res.status(200).json(checkHomeworkDto);
});
exports.checkHomework2 = checkHomework2;
const updateScoreCheckHomework2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); //id of assignment_student
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const updateScoreCheckHomeworkDto = req.body;
    const check = CourseValidator_1.UpdateScoreCheckHomeworkSchema.safeParse(updateScoreCheckHomeworkDto);
    if (check.success) {
        const assignment_Student = yield prisma_1.prisma.assignment_Student.update({
            where: { id },
            data: check.data,
        });
        res.status(200).json(assignment_Student);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.updateScoreCheckHomework2 = updateScoreCheckHomework2;
