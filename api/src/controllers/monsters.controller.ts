import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MonsterService } from "../services/monster.service";

const findAll = async (req: Request, res: Response): Promise<Response> => {
    const monsters = await MonsterService.findAll();
    return res.status(StatusCodes.OK).json(monsters);
}

export const MonsterController = {
    findAll
};
