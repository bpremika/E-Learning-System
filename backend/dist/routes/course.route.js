"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const courseHome_controller_1 = require("../controllers/courseHome.controller");
const courseEnroll_controller_1 = require("../controllers/courseEnroll.controller");
const myCourse_controller_1 = require("../controllers/myCourse.controller");
const courseStudentAssignmentDto_controller_1 = require("../controllers/courseStudentAssignmentDto.controller");
const courseStudentInfo_controller_1 = require("../controllers/courseStudentInfo.controller");
const InstructorDashboard_controller_1 = require("../controllers/InstructorDashboard.controller");
const instructorDetailedDashboardDto_controller_1 = require("../controllers/instructorDetailedDashboardDto.controller");
exports.courseRouter = (0, express_1.Router)();
// courseRouter.get("/getOne/:id", getOneCourse);
// courseRouter.get("/search/:pages", searchCourse);
exports.courseRouter.get("/home/:pages", courseHome_controller_1.getHomeCourse);
exports.courseRouter.get(
    "/category/:cat/:pages",
    courseHome_controller_1.getCategoryCourse
);
exports.courseRouter.post(
    "/createCourse/",
    courseHome_controller_1.createCourse
);
exports.courseRouter.patch(
    "/updateCourse/:id",
    courseHome_controller_1.updateCourse
);
exports.courseRouter.delete(
    "/deleteCourse/:id",
    courseHome_controller_1.deleteCourse
);
exports.courseRouter.get("/getMyCourse", myCourse_controller_1.getMyCourse);
exports.courseRouter.get(
    "/getCourseStudentAssignment/:id",
    courseStudentAssignmentDto_controller_1.getCourseStudentAssignment
);
exports.courseRouter.get("/enroll/:id", courseEnroll_controller_1.getCourse);
exports.courseRouter.get(
    "/studentInfo/:id",
    courseStudentInfo_controller_1.getDetailedCourse
);
exports.courseRouter.get(
    "/instructorDashboard/:id",
    InstructorDashboard_controller_1.getInstructorUser
);
exports.courseRouter.get(
    "/getCourseVideo/:id",
    courseStudentInfo_controller_1.getCourseVideo
);
exports.courseRouter.get(
    "/instructorDetailedDashboard/:id",
    instructorDetailedDashboardDto_controller_1.getDetailedDashboard
);
exports.courseRouter.patch(
    "/updateDescCourse/:id",
    instructorDetailedDashboardDto_controller_1.updateDescCourse
);
exports.courseRouter.patch(
    "/updateCourseVideo/:id",
    instructorDetailedDashboardDto_controller_1.updateCourseVideo
);
exports.courseRouter.patch(
    "/updateAssignment/:id",
    instructorDetailedDashboardDto_controller_1.updateAssignment
);
exports.courseRouter.post(
    "/createAssignment/",
    instructorDetailedDashboardDto_controller_1.createAssignment
);
exports.courseRouter.post(
    "/createCourseVideo/",
    instructorDetailedDashboardDto_controller_1.createCourseVideo
);
exports.courseRouter.post(
    "/createCourseMaterial/:id",
    instructorDetailedDashboardDto_controller_1.createCourseMaterial
);
