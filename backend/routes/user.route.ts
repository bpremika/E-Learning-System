import { Router } from "express";
import {
    createStudentUser,
    createInstructorUser,
    studentLogin,
    instructorLogin,
    logout,
    getProfile,
} from "../controllers/user.controller";

export const userRouter = Router();
userRouter.post("/studentRegister", createStudentUser);
userRouter.post("/instructorRegister", createInstructorUser);

userRouter.post("/studentLogin", studentLogin);
userRouter.post("/instructorLogin", instructorLogin);

userRouter.get("/logout", logout);
userRouter.get("/me", getProfile);
