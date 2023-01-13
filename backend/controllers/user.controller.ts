import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { loginSchema, userSchema } from "../common/UserValidator";
import bcrypt from "bcrypt";
import { CreateUser, SessionDTO } from "../dto/user.dto";
import { Prisma } from "@prisma/client";

export const createStudentUser = async (req: Request, res: Response) => {
    const user: CreateUser = req.body;
    const result = userSchema.safeParse(user);
    console.log(user);
    if (result.success) {
        const hashpassword = await bcrypt.hash(result.data.password, 10);
        try {
            const newUser = await prisma.studentUser.create({
                data: {
                    ...result.data,
                    password: hashpassword,
                },
            });
            res.status(200).json({ message: "sign up successful" });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === "P2002") {
                    res.status(400).json({
                        message:
                            "There is a unique constraint violation, a new user cannot be created with this email",
                    });
                }
            }
            // throw e;
        }
    } else {
        res.status(400).json(result.error);
    }
};

export const createInstructorUser = async (req: Request, res: Response) => {
    const user: CreateUser = req.body;
    const result = userSchema.safeParse(user);
    console.log(user);
    if (result.success) {
        const hashpassword = await bcrypt.hash(result.data.password, 10);
        try {
            const newUser = await prisma.instructorUser.create({
                data: {
                    ...result.data,
                    password: hashpassword,
                },
            });
            res.status(200).json({ message: "sign up successful" });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === "P2002") {
                    res.status(400).json({
                        message:
                            "There is a unique constraint violation, a new user cannot be created with this email",
                    });
                }
            }
            // throw e;
        }
    } else {
        res.status(400).json(result.error);
    }
};

export const studentLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);
    if (result.success) {
        const username = result.data.username;
        const user = await prisma.studentUser.findUnique({
            where: { username },
        });
        if (user == null) {
            res.status(400).json({
                message: "Account With this Username doesn't exist",
            });
            return;
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Your username or password might be wrong!!",
            });
            return;
        }
        req.session.userID = user.id;
        req.session.username = username;
        req.session.role = "student";
        res.status(200).json({ message: "login successful" });
    } else {
        res.status(400).json(result.error);
    }
};

export const instructorLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);
    if (result.success) {
        const username = result.data.username;
        const user = await prisma.studentUser.findUnique({
            where: { username },
        });
        if (user == null) {
            res.status(400).json({
                message: "Account With this Username doesn't exist",
            });
            return;
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Your username or password might be wrong!!",
            });
            return;
        }
        req.session.userID = user.id;
        req.session.username = username;
        req.session.role = "instructor";
        res.status(200).json({ message: "login successful" });
    } else {
        res.status(400).json(result.error);
    }
};

export const logout = async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.status(200).json({ message: "logout successful" });
    });
};

export const getProfile = async (req: Request, res: Response) => {
    const session = req.session;
    if (session.userID == undefined || session.username == undefined || session.role == undefined) {
        req.session.userID = -1;
        req.session.username = "";
        req.session.role = "";
        console.log("create session successfully!");
        res.status(401).json({ message: "user doesn't log in." });
        return;
    } else if (session.username === "") {
        res.status(401).json({ message: "user doesn't log in." });
        return;

    } 
    else {
        const userSession : SessionDTO = {
            userID : session.userID,
            username : session.username,
            role : session.role
        }
        res.status(200).json(userSession);
    }
};

export const enrollCourse = async (req: Request, res: Response) => {
    const courseid = parseInt(req.params.id as string);
    if (Number.isNaN(courseid)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
    }
    try {
        const session = req.session;
        if (session == null || session == undefined) {
            res.status(401).json({ message: "session error" });
            return;
        }
        const course = await prisma.course.findUnique({
            where: { id: courseid },
            include: { studentUser: true },
        });
        if (course == null) {
            res.status(400).json({ message: "course not found" });
            return;
        }
        if (
            course.studentUser.find((v) => v.username == session.username) !==
            undefined
        ) {
            res.status(400).json({ message: "user already in course" });
            return;
        }
        if (
            course.max_student != -1 &&
            course.curr_student >= course.max_student
        ) {
            res.status(400).json({ message: "this course is already full" });
            return;
        }
        const updatecourse = await prisma.course.update({
            where: { id: courseid },
            data: {
                curr_student: { increment: 1 },
                studentUser: { connect: { username: session.username } },
            },
        });
        res.status(200).json({ message: "join course successful" });
    } catch (error) {
        // res.status(400).json({ message: "something went wrong" });
        res.status(400).send(error);
    }
};
