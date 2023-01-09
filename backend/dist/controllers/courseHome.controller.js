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
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getManyCourse = exports.getCategoryCourse = exports.getOneCourse = void 0;
const prisma_1 = require("../common/prisma");
const CourseValidator_1 = require("../common/CourseValidator");
const getOneCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const course = yield prisma_1.prisma.course.findUnique({
        where: { id },
        include: {
            studentUser: true,
        },
    });
    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const courseDto = {
        name: course.name,
        course_desc: course.course_desc,
        course_cover_url: course.course_cover_url,
    };
    res.status(200).json(courseDto);
});
exports.getOneCourse = getOneCourse;
const getCategoryCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.cat;
    const courses = yield prisma_1.prisma.course.findMany({
        where: { category },
        include: {
            studentUser: true,
        },
    });
    if (courses === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const coursesDto = {
        total: courses.length,
        courses: courses.map((course) => ({
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };
    res.status(200).json(coursesDto);
});
exports.getCategoryCourse = getCategoryCourse;
const getManyCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield prisma_1.prisma.course.findMany();
    const coursesDto = {
        total: courses.length,
        courses: courses.map((course) => ({
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };
    res.status(200).json(coursesDto);
});
exports.getManyCourse = getManyCourse;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = req.body;
    const check = CourseValidator_1.courseSchema.safeParse(course);
    if (check.success) {
        try {
            const result = yield prisma_1.prisma.course.create({
                data: {
                    name: course.name,
                    category: course.category,
                    course_desc: course.course_desc,
                    course_detail: course.course_detail,
                    course_cover_url: course.course_cover_url,
                    guide_url: course.guide_url,
                    instructor_id: course.instructor_id,
                },
            });
            console.log(result);
            res.status(201).json(result);
        }
        catch (e) {
            console.log("have error");
            res.status(400).json({ message: "something wents wrong" });
        }
    }
    else {
        res.status(400).json({ message: "something wents wrong" });
    }
});
exports.createCourse = createCourse;
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
        },
    });
    res.status(200).json(course);
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield prisma_1.prisma.course.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(204).send();
});
exports.deleteCourse = deleteCourse;
