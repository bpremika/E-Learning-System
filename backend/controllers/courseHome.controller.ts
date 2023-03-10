import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { CourseHomeDto, PartCourseHomeDto } from "../dto/common.dto";
import {
    CoursesDto,
    CreateCourseDto,
    UpdateCourseDto,
} from "../dto/course.dto";
import { courseSchema } from "../common/CourseValidator";

const amountPerPage = 12;

const getHomeCourse = async (req: Request, res: Response) => {
    const pages = parseInt(req.params.pages);
    const search = req.query.search as string | null;
    if (isNaN(pages)) {
        res.status(404).send({ message: "invalid Pages" });
        return;
    }

    if (search == null) {
        const courses = await prisma.course.findMany({
            skip: (pages - 1) * amountPerPage,
            take: amountPerPage,
        });

        const coursesForAllCat = await prisma.course.findMany();

        let all_category: string[] = [];

        for (const element of coursesForAllCat) {
            if (!all_category.includes(element.category)) {
                all_category.push(element.category);
            }
        }
        all_category.sort();

        const coursesDto: CourseHomeDto = {
            all_category,
            courses: courses.map((course) => ({
                id: course.id,
                name: course.name,
                course_desc: course.course_desc,
                course_cover_url: course.course_cover_url,
            })),
        };
        res.status(200).json(coursesDto);
    } else {
        const search_arr = search.split("+");
        const new_search = search_arr.join(" & ");

        const courses = await prisma.course.findMany({
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

        const coursesForAllCat = await prisma.course.findMany();

        let all_category: string[] = [];

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

        const coursesDto: CourseHomeDto = {
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
};

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

const getCategoryCourse = async (req: Request, res: Response) => {
    const pages = parseInt(req.params.pages);
    const search = req.query.search as string | null;
    // const category = req.params.cat.toUpperCase();
    const category = req.params.cat;

    if (isNaN(pages)) {
        res.status(404).send({ message: "invalid Pages" });
        return;
    }

    if (search == null) {
        const courses = await prisma.course.findMany({
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

        const coursesForAllCat = await prisma.course.findMany();

        let all_category: string[] = [];

        for (const element of coursesForAllCat) {
            if (!all_category.includes(element.category)) {
                all_category.push(element.category);
            }
        }
        all_category.sort();

        const coursesDto: CourseHomeDto = {
            all_category,
            courses: courses.map((course) => ({
                id: course.id,
                name: course.name,
                course_desc: course.course_desc,
                course_cover_url: course.course_cover_url,
            })),
        };

        res.status(200).json(coursesDto);
    } else {
        const search_arr = search.split("+");
        const new_search = search_arr.join(" & ");

        const courses = await prisma.course.findMany({
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

        const coursesForAllCat = await prisma.course.findMany();

        let all_category: string[] = [];

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

        const coursesDto: CourseHomeDto = {
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
};

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

const createCourse = async (req: Request, res: Response) => {
    const course: CreateCourseDto = req.body;
    const check = courseSchema.safeParse(course);
    if (check.success) {
        try {
            const result = await prisma.course.create({
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
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    } else {
        console.log(check.error);
        res.status(400).json({ message: "parsing error" });
    }
};

const updateCourse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newCourseDto: UpdateCourseDto = req.body;
    const check = courseSchema.safeParse(newCourseDto);

    if (check.success) {
        const course = await prisma.course.update({
            where: { id },
            data: check.data,
        });
        res.status(200).json(course);
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

const deleteCourse = async (req: Request, res: Response) => {
    const id = req.params.id;
    await prisma.course.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(204).send();
};

export {
    // getOneCourse,
    // searchCourse,
    getCategoryCourse,
    getHomeCourse,
    createCourse,
    updateCourse,
    deleteCourse,
};
