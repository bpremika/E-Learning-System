import { Router } from "express";
import {
    createCourse,
    deleteCourse,
    getManyCourse,
    getOneCourse,
    updateCourse,
} from "../controllers/course.controller";

export const courseRouter = Router();
courseRouter.get("/", getManyCourse);
courseRouter.get("/:id", getOneCourse);
courseRouter.post("/", createCourse);
courseRouter.patch("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);
