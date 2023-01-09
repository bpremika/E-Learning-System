import { Router } from "express";
import {
    createStudentUser,
    createInstructorUser,
    studentLogin,
    instructorLogin,
    logout,
} from "../controller/user.controller";

export const userRouter = Router();
userRouter.post("/studentRegister", createStudentUser);
userRouter.post("/instructorRegister", createInstructorUser);

userRouter.post("/studentLogin", studentLogin);
userRouter.post("/instructorLogin", instructorLogin);

userRouter.get("/logout", logout);
