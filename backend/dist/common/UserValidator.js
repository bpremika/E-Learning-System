"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const isPrefix = (s) => s === "MR" || s === "MRS" || s === "MS";
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    prefix: zod_1.z.string().refine(isPrefix),
    phone_number: zod_1.z.string().length(10).optional(),
    image_url: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
