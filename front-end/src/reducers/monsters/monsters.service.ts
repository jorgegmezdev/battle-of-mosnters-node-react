import { API_URL } from '../../constants/env';
import { Battle, Monster } from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const battle = async (monsterAId: string, monsterBId: string): Promise<Battle> =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      monsterAId,
      monsterBId
    })
  }).then(res => res.json());

export const MonsterService = {
  getAll,
  battle
};
