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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourse = void 0;
const prisma_1 = require("../common/prisma");
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const course = yield prisma_1.prisma.course.findUnique({
        where: { id },
        include: {
            instructor: true,
        },
    });
    if (course === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const instructor = course.instructor;

    const courseDto = {
        id: course.id,
        name: course.name,
        course_desc: course.course_desc,
        first_name: instructor.first_name,
        last_name: instructor.last_name,
        guide_url: course.guide_url,
    };
    res.status(200).json(courseDto);
});
exports.getCourse = getCourse;
