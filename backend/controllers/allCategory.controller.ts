import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { AllCategoryDto } from "../dto/common.dto";

const getAllCategory = async (req: Request, res: Response) => {
    const coursesForAllCat = await prisma.course.findMany();

    let all_category: string[] = [];

    for (const element of coursesForAllCat) {
        if (!all_category.includes(element.category)) {
            all_category.push(element.category);
        }
    }
    all_category.sort();

    const allCategoryDto: AllCategoryDto = {
        all_categories: all_category,
    };

    res.status(200).json(allCategoryDto);
};

export { getAllCategory };
