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
exports.getProfile = exports.logout = exports.instructorLogin = exports.studentLogin = exports.createInstructorUser = exports.createStudentUser = exports.createSession = void 0;
const prisma_1 = require("../common/prisma");
const UserValidator_1 = require("../common/UserValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session === null) {
        req.session.username = "";
        req;
    }
});
exports.createSession = createSession;
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
            throw e;
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
    if (req.session.username === "") {
        res.status(403).json({ message: "user doesn't log in." });
    }
    else {
        res.status(200).json(req.session.username);
    }
});
exports.getProfile = getProfile;
