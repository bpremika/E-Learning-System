"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const courseHome_controller_1 = require("../controllers/courseHome.controller");
const courseEnroll_controller_1 = require("../controllers/courseEnroll.controller");
const myCourse_controller_1 = require("../controllers/myCourse.controller");
const courseStudentInfo_controller_1 = require("../controllers/courseStudentInfo.controller");
const allCategory_controller_1 = require("../controllers/allCategory.controller");
const courseStudentAssignment_controller_1 = require("../controllers/courseStudentAssignment.controller");
const InstructorDashboard_controller_1 = require("../controllers/InstructorDashboard.controller");
const instructorDetailedDashboard_controller_1 = require("../controllers/instructorDetailedDashboard.controller");
const studentDetailedDashboard_controller_1 = require("../controllers/studentDetailedDashboard.controller");
const activeUser_controller_1 = require("../controllers/activeUser.controller");
exports.courseRouter = (0, express_1.Router)();
// courseRouter.get("/getOne/:id", getOneCourse);
// courseRouter.get("/search/:pages", searchCourse);
exports.courseRouter.get("/home/:pages", courseHome_controller_1.getHomeCourse);
exports.courseRouter.get("/category/:cat/:pages", courseHome_controller_1.getCategoryCourse);
exports.courseRouter.post("/createCourse/", courseHome_controller_1.createCourse);
exports.courseRouter.patch("/updateCourse/:id", courseHome_controller_1.updateCourse);
exports.courseRouter.delete("/deleteCourse/:id", courseHome_controller_1.deleteCourse);
exports.courseRouter.get("/getMyCourse", myCourse_controller_1.getMyCourse);
exports.courseRouter.get("/getAllCategory", allCategory_controller_1.getAllCategory);
exports.courseRouter.get("/getCourseStudentAssignment/:id", courseStudentAssignment_controller_1.getCourseStudentAssignment);
exports.courseRouter.get("/enroll/:id", courseEnroll_controller_1.getCourse);
exports.courseRouter.get("/studentInfo/:id", courseStudentInfo_controller_1.getDetailedCourse);
exports.courseRouter.get("/instructorDashboard/:id", InstructorDashboard_controller_1.getInstructorUser);
exports.courseRouter.get("/getCourseVideo/:id", courseStudentInfo_controller_1.getCourseVideo);
exports.courseRouter.get("/instructorDetailedDashboard/:id", instructorDetailedDashboard_controller_1.getDetailedDashboard);
exports.courseRouter.get("/checkHomework/:id", instructorDetailedDashboard_controller_1.checkHomework);
exports.courseRouter.patch("/updateDescCourse/:id", instructorDetailedDashboard_controller_1.updateDescCourse);
exports.courseRouter.patch("/updateCourseVideo/:id", instructorDetailedDashboard_controller_1.updateCourseVideo);
exports.courseRouter.patch("/updateAssignment/:id", instructorDetailedDashboard_controller_1.updateAssignment);
exports.courseRouter.patch("/updateScoreCheckHomework/:id", instructorDetailedDashboard_controller_1.updateScoreCheckHomework);
exports.courseRouter.post("/createAssignment/:id", instructorDetailedDashboard_controller_1.createAssignment);
exports.courseRouter.post("/createCourseVideo/:id", instructorDetailedDashboard_controller_1.createCourseVideo);
exports.courseRouter.post("/createCourseMaterial/:id", instructorDetailedDashboard_controller_1.createCourseMaterial);
exports.courseRouter.get("/instructorDetailedDashboard2/:id", studentDetailedDashboard_controller_1.getDetailedDashboard2);
exports.courseRouter.get("/checkHomework2/:id", studentDetailedDashboard_controller_1.checkHomework2);
exports.courseRouter.patch("/updateDescCourse2/:id", studentDetailedDashboard_controller_1.updateDescCourse2);
exports.courseRouter.patch("/updateCourseVideo2/:id", studentDetailedDashboard_controller_1.updateCourseVideo2);
exports.courseRouter.patch("/updateAssignment2/:id", studentDetailedDashboard_controller_1.updateAssignment2);
exports.courseRouter.patch("/updateScoreCheckHomework2/:id", studentDetailedDashboard_controller_1.updateScoreCheckHomework2);
exports.courseRouter.post("/createAssignment2/:id", studentDetailedDashboard_controller_1.createAssignment2);
exports.courseRouter.post("/createCourseVideo2/:id", studentDetailedDashboard_controller_1.createCourseVideo2);
exports.courseRouter.post("/createCourseMaterial2/:id", studentDetailedDashboard_controller_1.createCourseMaterial2);
exports.courseRouter.get("/getActiveUserDto/", activeUser_controller_1.getActiveUserDto);
