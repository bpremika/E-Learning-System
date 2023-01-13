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
exports.getInstructorUser = void 0;
const prisma_1 = require("../common/prisma");
const getInstructorUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    if (req.session.role == "student") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }
    const instructorUser = yield prisma_1.prisma.instructorUser.findUnique({
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
    const instructorDashboardDto = {
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
});
exports.getInstructorUser = getInstructorUser;
