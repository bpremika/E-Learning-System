import { prisma } from "../common/prisma";
import { Request, Response } from "express";
import { ActiveUserDto } from "../dto/common.dto";

const getActiveUserDto = async (req: Request, res: Response) => {
    const session_for_count = await prisma.session.findMany();

    const activeUserDto: ActiveUserDto = {
        all_user_amount: session_for_count.length,
    };

    res.status(200).json(activeUserDto);
};

export { getActiveUserDto };
