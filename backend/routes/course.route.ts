import { Router } from "express";
import {
    getHomeCourse,
    getCategoryCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    // getOneCourse,
    // searchCourse,
} from "../controllers/courseHome.controller";
import { getCourse } from "../controllers/courseEnroll.controller";
import { getMyCourse } from "../controllers/myCourse.controller";
import { getCourseStudentAssignment } from "../controllers/courseStudentAssignmentDto.controller";
import {
    getCourseVideo,
    getDetailedCourse,
} from "../controllers/courseStudentInfo.controller";
import { getAllCategory } from "../controllers/allCategory.controller";
import { getCourseStudentAssignment } from "../controllers/courseStudentAssignment.controller";
import { getDetailedCourse } from "../controllers/courseStudentInfo.controller";
import { getInstructorUser } from "../controllers/InstructorDashboard.controller";
import {
    getDetailedDashboard,
    updateDescCourse,
    updateCourseVideo,
    updateAssignment,
    createAssignment,
    createCourseVideo,
    createCourseMaterial,
} from "../controllers/instructorDetailedDashboardDto.controller";

export const courseRouter = Router();
// courseRouter.get("/getOne/:id", getOneCourse);
// courseRouter.get("/search/:pages", searchCourse);
courseRouter.get("/home/:pages", getHomeCourse);
courseRouter.get("/category/:cat/:pages", getCategoryCourse);
courseRouter.post("/createCourse/", createCourse);
courseRouter.patch("/updateCourse/:id", updateCourse);
courseRouter.delete("/deleteCourse/:id", deleteCourse);

courseRouter.get("/getMyCourse", getMyCourse);
courseRouter.get("/getAllCategory", getAllCategory);
courseRouter.get("/getCourseStudentAssignment/:id", getCourseStudentAssignment);

courseRouter.get("/enroll/:id", getCourse);
courseRouter.get("/studentInfo/:id", getDetailedCourse);
courseRouter.get("/instructorDashboard/:id", getInstructorUser);
courseRouter.get("/getCourseVideo/:id", getCourseVideo);

courseRouter.get("/instructorDetailedDashboard/:id", getDetailedDashboard);
courseRouter.patch("/updateDescCourse/:id", updateDescCourse);
courseRouter.patch("/updateCourseVideo/:id", updateCourseVideo);
courseRouter.patch("/updateAssignment/:id", updateAssignment);
courseRouter.post("/createAssignment/", createAssignment);
courseRouter.post("/createCourseVideo/", createCourseVideo);
courseRouter.post("/createCourseMaterial/:id", createCourseMaterial);
