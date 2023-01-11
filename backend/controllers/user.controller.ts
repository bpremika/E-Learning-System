import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { loginSchema, userSchema } from "../common/UserValidator";
import bcrypt from "bcrypt";
import { CreateUser } from "../dto/user.dto";
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
            throw e;
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
        req.session.username = username;
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
        req.session.username = username;
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
