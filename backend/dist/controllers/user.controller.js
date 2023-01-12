"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollCourse = exports.getProfile = exports.logout = exports.instructorLogin = exports.studentLogin = exports.createInstructorUser = exports.createStudentUser = void 0;
const prisma_1 = require("../common/prisma");
const UserValidator_1 = require("../common/UserValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const createStudentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = UserValidator_1.userSchema.safeParse(user);
    console.log(user);
    if (result.success) {
        const hashpassword = yield bcrypt_1.default.hash(result.data.password, 10);
        try {
            const newUser = yield prisma_1.prisma.studentUser.create({
                data: Object.assign(Object.assign({}, result.data), { password: hashpassword }),
            });
            res.status(200).json({ message: "sign up successful" });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === "P2002") {
                    res.status(400).json({
                        message: "There is a unique constraint violation, a new user cannot be created with this email",
                    });
                }
            }
            // throw e;
        }
    }
    else {
        res.status(400).json(result.error);
    }
});
exports.createStudentUser = createStudentUser;
const createInstructorUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = UserValidator_1.userSchema.safeParse(user);
    console.log(user);
    if (result.success) {
        const hashpassword = yield bcrypt_1.default.hash(result.data.password, 10);
        try {
            const newUser = yield prisma_1.prisma.instructorUser.create({
                data: Object.assign(Object.assign({}, result.data), { password: hashpassword }),
            });
            res.status(200).json({ message: "sign up successful" });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === "P2002") {
                    res.status(400).json({
                        message: "There is a unique constraint violation, a new user cannot be created with this email",
                    });
                }
            }
            // throw e;
        }
    }
    else {
        res.status(400).json(result.error);
    }
});
exports.createInstructorUser = createInstructorUser;
const studentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = UserValidator_1.loginSchema.safeParse(req.body);
    if (result.success) {
        const username = result.data.username;
        const user = yield prisma_1.prisma.studentUser.findUnique({
            where: { username },
        });
        if (user == null) {
            res.status(400).json({
                message: "Account With this Username doesn't exist",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Your username or password might be wrong!!",
            });
            return;
        }
        req.session.username = username;
        req.session.role = "student";
        res.status(200).json({ message: "login successful" });
    }
    else {
        res.status(400).json(result.error);
    }
});
exports.studentLogin = studentLogin;
const instructorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = UserValidator_1.loginSchema.safeParse(req.body);
    if (result.success) {
        const username = result.data.username;
        const user = yield prisma_1.prisma.studentUser.findUnique({
            where: { username },
        });
        if (user == null) {
            res.status(400).json({
                message: "Account With this Username doesn't exist",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Your username or password might be wrong!!",
            });
            return;
        }
        req.session.username = username;
        req.session.role = "instructor";
        res.status(200).json({ message: "login successful" });
    }
    else {
        res.status(400).json(result.error);
    }
});
exports.instructorLogin = instructorLogin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(() => {
        res.status(200).json({ message: "logout successful" });
    });
});
exports.logout = logout;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = req.session;
    if (session.username == undefined || session.role == undefined) {
        req.session.username = "";
        req.session.role = "";
        console.log("doesn't have session.");
        res.status(401).json({ message: "user doesn't log in." });
        return;
    }
    else if (session.username === "") {
        res.status(401).json({ message: "user doesn't log in." });
        return;
    }
    else {
        const userSession = {
            username: session.username,
            role: session.role,
        };
        res.status(200).json(userSession);
    }
});
exports.getProfile = getProfile;
const enrollCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseid = parseInt(req.params.id);
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
        const course = yield prisma_1.prisma.course.findUnique({
            where: { id: courseid },
            include: { studentUser: true },
        });
        if (course == null) {
            res.status(400).json({ message: "course not found" });
            return;
        }
        if (course.studentUser.find((v) => v.username == session.username) !==
            undefined) {
            res.status(400).json({ message: "user already in course" });
            return;
        }
        if (course.curr_student >= course.max_student) {
            res.status(400).json({ message: "this course is already full" });
            return;
        }
        const updatecourse = yield prisma_1.prisma.course.update({
            where: { id: courseid },
            data: {
                curr_student: { increment: 1 },
                studentUser: { connect: { username: session.username } },
            },
        });
        res.status(200).json({ message: "join course successful" });
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.enrollCourse = enrollCourse;
