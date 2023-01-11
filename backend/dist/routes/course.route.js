"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const courseHome_controller_1 = require("../controllers/courseHome.controller");
const courseEnroll_controller_1 = require("../controllers/courseEnroll.controller");
const courseStudentInfo_controller_1 = require("../controllers/courseStudentInfo.controller");
exports.courseRouter = (0, express_1.Router)();
exports.courseRouter.get("/getOne/:id", courseHome_controller_1.getOneCourse);
exports.courseRouter.get("/category/:cat", courseHome_controller_1.getCategoryCourse);
exports.courseRouter.get("/getMany/:pages", courseHome_controller_1.getManyCourse);
exports.courseRouter.get("/enroll/:id", courseEnroll_controller_1.getCourse);
exports.courseRouter.get("/studentInfo/:id", courseStudentInfo_controller_1.getDetailedCourse);
exports.courseRouter.post("/createCourse", courseHome_controller_1.createCourse);
exports.courseRouter.patch("/:id", courseHome_controller_1.updateCourse);
exports.courseRouter.delete("/:id", courseHome_controller_1.deleteCourse);
