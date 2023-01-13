"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyCourse = void 0;
const prisma_1 = require("../common/prisma");
const getMyCourse = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield prisma_1.prisma.course.findMany();
        if (courses === null) {
            res.status(404).send({ message: "not found" });
            return;
        }
        const myCourseDto = {
            courses: courses.map((course) => ({
                id: course.id,
                name: course.name,
                course_desc: course.course_desc,
                course_cover_url: course.course_cover_url,
            })),
        };
        res.status(200).json(myCourseDto);
    });
exports.getMyCourse = getMyCourse;
