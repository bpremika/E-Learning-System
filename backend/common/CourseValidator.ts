import { z } from "zod";

export const courseSchema = z.object({
    name: z.string(),
    category: z.string(),
    course_desc: z.string(),
    course_detail: z.string(),
    course_cover_url: z.string(),
    guide_url: z.string(),
    instructor_id: z.number().int().positive(),
});
