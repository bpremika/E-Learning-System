"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const zod_1 = require("zod");
exports.courseSchema = zod_1.z.object({
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    course_desc: zod_1.z.string(),
    instructor_id: zod_1.z.number().int().positive(),
});
