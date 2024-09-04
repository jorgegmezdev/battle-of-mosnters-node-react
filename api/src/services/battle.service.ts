import { Battle, Monster } from "../models";

type CreateBattleDTO = {
    monsterA: Monster;
    monsterB: Monster;
    winner: Monster;
};

const create = async (data: CreateBattleDTO): Promise<Battle> => {
    const battle = await Battle.query().insert({ ...data });
    return battle;
};

export const BattleService = {
    create,
};
