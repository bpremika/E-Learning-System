import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { CourseStudentAssignmentDto } from "../dto/common.dto";
import { updateStudentAssignmentSchema } from "../common/CourseValidator";
import { UpdateStudentAssignment } from "../dto/course.dto";

const getCourseStudentAssignment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id) && id != req.session.userID) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }

    if (req.session.role == "instructor") {
        res.status(404).send({ message: "invalid Role" });
        return;
    }

    const studentUser = await prisma.studentUser.findUnique({
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

    if (studentUser.id != req.session.userID) {
        res.status(404).send({ message: "invalid ID" });
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

    const myCourseDto: CourseStudentAssignmentDto = {
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
};

const updateStudentAssignment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); //id of assignment_student
    const newStudentAssignment: UpdateStudentAssignment = req.body;
    const check = updateStudentAssignmentSchema.safeParse(newStudentAssignment);

    if (check.success) {
        const assignment_Student = await prisma.assignment_Student.update({
            where: { id },
            data: {
                file_url: newStudentAssignment.file_url,
            },
        });
        res.status(200).json(assignment_Student);
    } else {
        res.status(400).json({ message: "something went wrong" });
    }
};

export { getCourseStudentAssignment, updateStudentAssignment };
