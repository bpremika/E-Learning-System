import { Router } from 'express'
import { createCourse, deleteCourse, getManyCourse, getOneCourse } from '../controllers/course.controller';

export const courseRouter = Router()
courseRouter.get('/', getManyCourse);
courseRouter.get('/:id', getOneCourse);
courseRouter.post('/', createCourse);
courseRouter.delete('/:id', deleteCourse);

