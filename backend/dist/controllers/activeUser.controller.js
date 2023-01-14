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
exports.getActiveUserDto = void 0;
const prisma_1 = require("../common/prisma");
const getActiveUserDto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session_for_count = yield prisma_1.prisma.session.findMany();
    const activeUserDto = {
        all_user_amount: session_for_count.length,
    };
    res.status(200).json(activeUserDto);
});
exports.getActiveUserDto = getActiveUserDto;
