import { z } from "zod";

const isPositiveOrMinusOne = (n: number) => n >= 0 || n == -1;

export const courseSchema = z.object({
    name: z.string(),
    category: z.string(),
    course_desc: z.string().optional(),
    course_detail: z.string().optional(),
    course_cover_url: z.string().optional(),
    guide_url: z.string(),
    course_material: z.string().array().optional(),
    instructor_id: z.number().int().positive(),
    max_student: z.number().int().refine(isPositiveOrMinusOne).optional(),
    curr_student: z.number().int().nonnegative().optional(),
});

export const createCourseVideoSchema = z.object({
    name: z.string(),
    video_url: z.string(),
});

export const updateCourseVideoSchema = z.object({
    name: z.string(),
    video_url: z.string(),
});

export const createAssignmentSchema = z.object({
    name: z.string(),
    description: z.string(),
    aj_file_url: z.string(),
    max_score: z.number().int().nonnegative(),
});

export const updateAssignmentSchema = z.object({
    name: z.string(),
    description: z.string(),
    aj_file_url: z.string(),
    max_score: z.number().int().nonnegative(),
});

export const updateDescCourseSchema = z.object({
    course_desc: z.string().optional(),
    course_detail: z.string().optional(),
});

export const courseMaterialSchema = z.object({
    name: z.string(),
});

export const updateStudentAssignmentSchema = z.object({
    homeworkFile: z.string(),
});

export const UpdateScoreCheckHomeworkSchema = z.object({
    get_score: z.number().int().nonnegative(),
});
