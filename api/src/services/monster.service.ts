import { Monster } from "../models";

// Find all monster
const findAll = async (): Promise<Monster[]> => {
    const monsters = await Monster.query();
    return monsters;
};

// Find monters by Id
const findById = async (id: number): Promise<Monster | undefined | null> => {
    const monster = await Monster.query().findById(id);
    return monster;
};

export const MonsterService = {
    findAll,
    findById
};
