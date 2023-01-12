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
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getManyCourse = exports.getCategoryCourse = exports.searchCourse = exports.getOneCourse = void 0;
const prisma_1 = require("../common/prisma");
const CourseValidator_1 = require("../common/CourseValidator");
const amountPerPage = 12;
const getOneCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
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
        id: course.id,
        name: course.name,
        course_desc: course.course_desc,
        course_cover_url: course.course_cover_url,
    };
    res.status(200).json(courseDto);
});
exports.getOneCourse = getOneCourse;
const searchCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const pages = parseInt(req.params.pages);
    if (isNaN(pages)) {
        res.status(404).send({ message: "invalid Pages" });
        return;
    }
    let courses;
    if (search == null) {
        courses = yield prisma_1.prisma.course.findMany({
            skip: (pages - 1) * amountPerPage,
            take: amountPerPage,
        });
        res.status(404).send({ message: "not found" });
        return;
    }
    else {
        var search_arr = search.split("+");
        var new_search = search_arr.join(" & ");
        courses = yield prisma_1.prisma.course.findMany({
            where: {
                name: {
                    search: new_search,
                },
            },
            skip: (pages - 1) * amountPerPage,
            take: amountPerPage,
        });
        console.log("search by: " + new_search);
    }
    if (courses === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const coursesDto = {
        total: courses.length,
        courses: courses.map((course) => ({
            id: course.id,
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };
    res.status(200).json(coursesDto);
});
exports.searchCourse = searchCourse;
const getCategoryCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = parseInt(req.params.pages);
    if (isNaN(pages)) {
        res.status(404).send({ message: "invalid Pages" });
        return;
    }
    // const category = req.params.cat.toUpperCase();
    const category = req.params.cat;
    const courses = yield prisma_1.prisma.course.findMany({
        where: { category },
        include: {
            studentUser: true,
        },
        skip: (pages - 1) * amountPerPage,
        take: amountPerPage,
    });
    if (courses === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const coursesDto = {
        total: courses.length,
        courses: courses.map((course) => ({
            id: course.id,
            name: course.name,
            course_desc: course.course_desc,
            course_cover_url: course.course_cover_url,
        })),
    };
    res.status(200).json(coursesDto);
});
exports.getCategoryCourse = getCategoryCourse;
const getManyCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = parseInt(req.params.pages);
    if (isNaN(pages)) {
        res.status(404).send({ message: "invalid Pages" });
        return;
    }
    const courses = yield prisma_1.prisma.course.findMany({
        skip: (pages - 1) * amountPerPage,
        take: amountPerPage,
    });
    const coursesDto = {
        total: courses.length,
        courses: courses.map((course) => ({
            id: course.id,
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
                    // course_material: course.
                    instructor_id: course.instructor_id,
                    max_student: course.max_student,
                    curr_student: course.curr_student,
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
            max_student: newCourseDto.max_student,
            curr_student: newCourseDto.curr_student,
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
