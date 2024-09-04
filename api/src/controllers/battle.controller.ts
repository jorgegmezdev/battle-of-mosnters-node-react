import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle } from '../models';
import { MonsterService } from '../services/monster.service';
import { error } from 'winston';
import { BattleService } from '../services/battle.service';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { monsterAId, monsterBId } = req.body;

  // Validate id type
  if (isNaN(Number(monsterAId)) || isNaN(Number(monsterBId))) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Ids must be valid numbers' });
  }

  const monsterA = await MonsterService.findById(Number(monsterAId));
  const monsterB = await MonsterService.findById(Number(monsterBId));

  if (!monsterA || !monsterB) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'One or both monsters are undefined' });
  }

  let attacker = monsterA.speed > monsterB.speed || (monsterA.speed === monsterB.speed && monsterA.attack > monsterB.attack) ? monsterA : monsterB;
  let defender = attacker === monsterA ? monsterB : monsterA;

  // Fight
  while (monsterA.hp > 0 && monsterB.hp > 0) {
    const damage = Math.max(attacker.attack - defender.defense, 1);
    defender.hp -= damage;
    //Swap turns
    [attacker, defender] = [defender, attacker];
  }

  // define winner
  const winner = monsterA.hp > 0 ? monsterA : monsterB;

  const result = await BattleService.create({monsterA, monsterB, winner});
  return res.status(StatusCodes.OK).json(result);
};

export const BattleController = {
  list,
  create,
};
