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
exports.getcourse = void 0;
const prisma_1 = require("../common/prisma");
const getDetailedDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const course = yield prisma_1.prisma.course.findUnique({
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
    const instructorDetailedDashboardDto = {
        students_in_course: course.studentUser.map((student) => ({
            first_name: student.first_name,
            last_name: student.last_name,
        })),
        videos_in_course: course.courseVideo.map((video) => ({
            id: video.id,
            name: video.title,
            video_url: video.video_url,
        })),
        assignments_in_course: [],
        course_desc: "",
        course_detail: "",
    };
    res.status(200).json(instructorDashboardDto);
});
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const newCourseDto = req.body;
    const course = yield prisma_1.prisma.course.update({
        where: { id },
        data: {
            name: newCourseDto.name,
            category: newCourseDto.category,
            course_desc: newCourseDto.course_desc,
            course_detail: newCourseDto.course_detail,
            course_cover_url: newCourseDto.course_cover_url,
            guide_url: newCourseDto.guide_url,
            instructor_id: newCourseDto.instructor_id,
            max_student: newCourseDto.max_student,
            curr_student: newCourseDto.curr_student,
        },
    });
    res.status(200).json(course);
});
