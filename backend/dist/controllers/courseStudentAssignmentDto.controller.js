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
exports.getCourseStudentAssignment = void 0;
const prisma_1 = require("../common/prisma");
const getCourseStudentAssignment = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(404).send({ message: "invalid ID" });
            return;
        }
        const studentUser = yield prisma_1.prisma.studentUser.findUnique({
            where: { id },
            include: {
                assignment_student: {
                    include: {
                        Assignment: true,
                    },
                },
            },
        });
        if (studentUser === null) {
            res.status(404).send({ message: "not found" });
            return;
        }
        let to_do_assignments = [];
        let finished_assignments = [];
        for (const element of studentUser.assignment_student) {
            if (element.isSubmitted) {
                finished_assignments.push(element);
            } else {
                to_do_assignments.push(element);
            }
        }
        const myCourseDto = {
            to_do_assignments: to_do_assignments.map((to_do_assignment) => ({
                id: to_do_assignment.id,
                name: to_do_assignment.Assignment.name,
                isSubmitted: to_do_assignment.isSubmitted,
                max_score: to_do_assignment.Assignment.max_score,
                modified_at: to_do_assignment.modified_at,
            })),
            finished_assignments: finished_assignments.map(
                (finished_assignment) => ({
                    id: finished_assignment.id,
                    name: finished_assignment.Assignment.name,
                    isScored: finished_assignment.isScored,
                    getScored: finished_assignment.get_score,
                    max_score: finished_assignment.Assignment.max_score,
                })
            ),
        };
        res.status(200).json(myCourseDto);
    });
exports.getCourseStudentAssignment = getCourseStudentAssignment;
