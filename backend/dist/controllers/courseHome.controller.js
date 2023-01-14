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
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getHomeCourse = exports.getCategoryCourse = void 0;
const prisma_1 = require("../common/prisma");
const CourseValidator_1 = require("../common/CourseValidator");
const amountPerPage = 12;
const getHomeCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = parseInt(req.params.pages);
    const search = req.query.search;
    if (isNaN(pages)) {
        res.status(404).send({ message: "invalid Pages" });
        return;
    }
    if (search == null) {
        const courses = yield prisma_1.prisma.course.findMany({
            skip: (pages - 1) * amountPerPage,
            take: amountPerPage,
        });
        const coursesForAllCat = yield prisma_1.prisma.course.findMany();
        let all_category = [];
        for (const element of coursesForAllCat) {
            if (!all_category.includes(element.category)) {
                all_category.push(element.category);
            }
        }
        all_category.sort();
        const coursesDto = {
            all_category,
            courses: courses.map((course) => ({
                id: course.id,
                name: course.name,
                course_desc: course.course_desc,
                course_cover_url: course.course_cover_url,
            })),
        };
        res.status(200).json(coursesDto);
    }
    else {
        const search_arr = search.split("+");
        const new_search = search_arr.join(" & ");
        const courses = yield prisma_1.prisma.course.findMany({
            where: {
                name: {
                    search: new_search,
                },
                OR: {
                    course_desc: {
                        search: new_search,
                    },
                },
            },
            skip: (pages - 1) * amountPerPage,
            take: amountPerPage,
        });
        const coursesForAllCat = yield prisma_1.prisma.course.findMany();
        let all_category = [];
        for (const element of coursesForAllCat) {
            if (!all_category.includes(element.category)) {
                all_category.push(element.category);
            }
        }
        all_category.sort();
        console.log("search by: " + new_search);
        if (courses === null) {
            res.status(404).send({ message: "not found" });
            return;
        }
        const coursesDto = {
            all_category,
            courses: courses.map((course) => ({
                id: course.id,
                name: course.name,
                course_desc: course.course_desc,
                course_cover_url: course.course_cover_url,
            })),
        };
        res.status(200).json(coursesDto);
    }
});
exports.getHomeCourse = getHomeCourse;
// const searchCourse = async (req: Request, res: Response) => {
//     const search = req.query.search as string | null;
//     const pages = parseInt(req.params.pages);
//     if (isNaN(pages)) {
//         res.status(404).send({ message: "invalid Pages" });
//         return;
//     }
//     let courses;
//     if (search == null) {
//         courses = await prisma.course.findMany({
//             skip: (pages - 1) * amountPerPage,
//             take: amountPerPage,
//         });
//         if (courses === null) {
//             res.status(404).send({ message: "not found" });
//             return;
//         }
//         const coursesDto: CoursesDto = {
//             total: courses.length,
//             courses: courses.map((course) => ({
//                 id: course.id,
//                 name: course.name,
//                 course_desc: course.course_desc,
//                 course_cover_url: course.course_cover_url,
//             })),
//         };
//         res.status(200).json(coursesDto);
//     } else {
//         const search_arr = search.split("+");
//         const new_search = search_arr.join(" & ");
//         courses = await prisma.course.findMany({
//             where: {
//                 name: {
//                     search: new_search,
//                 },
//             },
//             skip: (pages - 1) * amountPerPage,
//             take: amountPerPage,
//         });
//         console.log("search by: " + new_search);
//         if (courses === null) {
//             res.status(404).send({ message: "not found" });
//             return;
//         }
//         const coursesDto: CoursesDto = {
//             total: courses.length,
//             courses: courses.map((course) => ({
//                 id: course.id,
//                 name: course.name,
//                 course_desc: course.course_desc,
//                 course_cover_url: course.course_cover_url,
//             })),
//         };
//         res.status(200).json(coursesDto);
//     }
// };
const getCategoryCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = parseInt(req.params.pages);
    const search = req.query.search;
    // const category = req.params.cat.toUpperCase();
    const category = req.params.cat;
    if (isNaN(pages)) {
        res.status(404).send({ message: "invalid Pages" });
        return;
    }
    if (search == null) {
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
        const coursesForAllCat = yield prisma_1.prisma.course.findMany();
        let all_category = [];
        for (const element of coursesForAllCat) {
            if (!all_category.includes(element.category)) {
                all_category.push(element.category);
            }
        }
        all_category.sort();
        const coursesDto = {
            all_category,
            courses: courses.map((course) => ({
                id: course.id,
                name: course.name,
                course_desc: course.course_desc,
                course_cover_url: course.course_cover_url,
            })),
        };
        res.status(200).json(coursesDto);
    }
    else {
        const search_arr = search.split("+");
        const new_search = search_arr.join(" & ");
        const courses = yield prisma_1.prisma.course.findMany({
            where: {
                name: {
                    search: new_search,
                },
                OR: {
                    course_desc: {
                        search: new_search,
                    },
                },
            },
            skip: (pages - 1) * amountPerPage,
            take: amountPerPage,
        });
        const coursesForAllCat = yield prisma_1.prisma.course.findMany();
        let all_category = [];
        for (const element of coursesForAllCat) {
            if (!all_category.includes(element.category)) {
                all_category.push(element.category);
            }
        }
        all_category.sort();
        console.log("search by: " + new_search);
        if (courses === null) {
            res.status(404).send({ message: "not found" });
            return;
        }
        const coursesDto = {
            all_category,
            courses: courses.map((course) => ({
                id: course.id,
                name: course.name,
                course_desc: course.course_desc,
                course_cover_url: course.course_cover_url,
            })),
        };
        res.status(200).json(coursesDto);
    }
});
exports.getCategoryCourse = getCategoryCourse;
// const getOneCourse = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//         res.status(404).send({ message: "invalid ID" });
//         return;
//     }
//     const course = await prisma.course.findUnique({
//         where: { id },
//         include: {
//             studentUser: true,
//         },
//     });
//     if (course === null) {
//         res.status(404).send({ message: "not found" });
//         return;
//     }
//     const courseDto: PartCourseHomeDto = {
//         id: course.id,
//         name: course.name,
//         course_desc: course.course_desc,
//         course_cover_url: course.course_cover_url,
//     };
//     res.status(200).json(courseDto);
// };
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
                    course_material: course.course_material,
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
        console.log(check.error);
        res.status(400).json({ message: "parsing error" });
    }
});
exports.createCourse = createCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newCourseDto = req.body;
    const check = CourseValidator_1.courseSchema.safeParse(newCourseDto);
    if (check.success) {
        const course = yield prisma_1.prisma.course.update({
            where: { id },
            data: check.data,
        });
        res.status(200).json(course);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
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
