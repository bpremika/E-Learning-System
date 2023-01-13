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
exports.getAllCategory = void 0;
const prisma_1 = require("../common/prisma");
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coursesForAllCat = yield prisma_1.prisma.course.findMany();
    let all_category = [];
    for (const element of coursesForAllCat) {
        if (!all_category.includes(element.category)) {
            all_category.push(element.category);
        }
    }
    all_category.sort();
    const allCategoryDto = {
        all_categories: all_category,
    };
    res.status(200).json(allCategoryDto);
});
exports.getAllCategory = getAllCategory;
