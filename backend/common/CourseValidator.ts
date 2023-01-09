import { z } from "zod";

export const courseSchema = z.object({
    name: z.string(),
    category: z.string(),
    course_desc: z.string(),
    instructor_id: z.number().int().positive(),
});
