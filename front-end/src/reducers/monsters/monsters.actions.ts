import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Monster, Battle } from '../../models/interfaces/monster.interface';
import { MonsterService } from './monsters.service';

export const fetchMonstersData = createAsyncThunk<Monster[]>(
  'monsters/fetchMonstersData',
  MonsterService.getAll,
);

export const fetchMonstersBattle = createAsyncThunk<
Battle,
{ monsterAId: string; monsterBId: string; }
>(
  'monsters/fetchMonstersBattle', ({ monsterAId, monsterBId }) =>
    MonsterService.battle(monsterAId, monsterBId)
);

export const setSelectedMonster = createAction<Monster | null>(
  'monsters/setSelectedMonster',
);


export const setSelectCPUMonster = createAction<Monster | null>(
  'monsters/setSelectCPUMonster',
);

export const setBattle = createAction<Battle | null>(
  'monsters/setBattle',
);