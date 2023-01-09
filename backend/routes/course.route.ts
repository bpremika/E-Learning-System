import { Router } from "express";
import {
    createCourse,
    deleteCourse,
    getManyCourse,
    getOneCourse,
    getCategoryCourse,
    updateCourse,
} from "../controllers/courseHome.controller";

export const courseRouter = Router();
courseRouter.get("/:id", getOneCourse);
courseRouter.get("/:cat/category", getCategoryCourse);
courseRouter.get("/", getManyCourse);
courseRouter.post("/", createCourse);
courseRouter.patch("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);
