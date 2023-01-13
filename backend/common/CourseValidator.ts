import { z } from "zod";

const isPositiveOrMinusOne = (n: number) => n >= 0 || n == -1;

export const courseSchema = z.object({
    name: z.string(),
    category: z.string(),
    course_desc: z.string().optional(),
    course_detail: z.string().optional(),
    course_cover_url: z.string().optional(),
    guide_url: z.string(),
    instructor_id: z.number().int().positive(),
    max_student: z.number().int().refine(isPositiveOrMinusOne).optional(),
    curr_student: z.number().int().nonnegative().optional(),
});
