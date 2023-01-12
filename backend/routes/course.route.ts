import { Router } from "express";
import {
    createCourse,
    deleteCourse,
    getHomeCourse,
    getOneCourse,
    searchCourse,
    getCategoryCourse,
    updateCourse,
} from "../controllers/courseHome.controller";
import { getCourse } from "../controllers/courseEnroll.controller";
import { getDetailedCourse } from "../controllers/courseStudentInfo.controller";
import { getInstructorUser } from "../controllers/InstructorDashboard.controller";
import {
    getDetailedDashboard,
    updateDescCourse,
    updateCourseVideo,
    updateAssignment,
} from "../controllers/instructorDetailedDashboardDto.controller";

export const courseRouter = Router();
courseRouter.get("/getOne/:id", getOneCourse);
courseRouter.get("/search/:pages", searchCourse);
courseRouter.get("/category/:cat/:pages", getCategoryCourse);
courseRouter.get("/home/:pages", getHomeCourse);
courseRouter.post("/createCourse/", createCourse);
courseRouter.patch("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);

courseRouter.get("/enroll/:id", getCourse);
courseRouter.get("/studentInfo/:id", getDetailedCourse);
courseRouter.get("/instructorDashboard/:id", getInstructorUser);

courseRouter.get("/instructorDetailedDashboard/:id", getDetailedDashboard);
