"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDescCourseSchema = exports.updateAssignmentSchema = exports.createAssignmentSchema = exports.updateCourseVideoSchema = exports.createCourseVideoSchema = exports.courseSchema = void 0;
const zod_1 = require("zod");
const isPositiveOrMinusOne = (n) => n >= 0 || n == -1;
exports.courseSchema = zod_1.z.object({
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    course_desc: zod_1.z.string().optional(),
    course_detail: zod_1.z.string().optional(),
    course_cover_url: zod_1.z.string().optional(),
    guide_url: zod_1.z.string(),
    course_material: zod_1.z.string().array().optional(),
    instructor_id: zod_1.z.number().int().positive(),
    max_student: zod_1.z.number().int().refine(isPositiveOrMinusOne).optional(),
    curr_student: zod_1.z.number().int().positive().optional(),
});
exports.createCourseVideoSchema = zod_1.z.object({
    name: zod_1.z.string(),
    video_url: zod_1.z.string(),
    course_id: zod_1.z.number().int().positive(),
});
exports.updateCourseVideoSchema = zod_1.z.object({
    name: zod_1.z.string(),
    video_url: zod_1.z.string(),
});
exports.createAssignmentSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    aj_file_url: zod_1.z.string(),
    max_score: zod_1.z.number().int().positive(),
    course_id: zod_1.z.number().int().positive(),
});
exports.updateAssignmentSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    aj_file_url: zod_1.z.string(),
    max_score: zod_1.z.number().int().positive(),
});
exports.updateDescCourseSchema = zod_1.z.object({
    course_desc: zod_1.z.string().optional(),
    course_detail: zod_1.z.string().optional(),
});
