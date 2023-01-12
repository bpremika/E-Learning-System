"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const zod_1 = require("zod");
const isPositiveOrMinusOne = (n) => n >= 0 || n == -1;
exports.courseSchema = zod_1.z.object({
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    course_desc: zod_1.z.string().optional(),
    course_detail: zod_1.z.string().optional(),
    course_cover_url: zod_1.z.string().optional(),
    guide_url: zod_1.z.string(),
    instructor_id: zod_1.z.number().int().positive(),
    max_student: zod_1.z.number().int().refine(isPositiveOrMinusOne).optional(),
    curr_student: zod_1.z.number().int().positive().optional(),
});
