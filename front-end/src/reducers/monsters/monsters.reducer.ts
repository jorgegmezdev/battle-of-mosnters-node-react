import { createReducer } from '@reduxjs/toolkit';
import { Battle, Monster } from '../../models/interfaces/monster.interface';
import { fetchMonstersData, setSelectedMonster, setBattle, setSelectCPUMonster, fetchMonstersBattle } from './monsters.actions';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  selectedCPUMonster: Monster | null;
  battle: Battle | null;
}

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  selectedCPUMonster: null,
  battle: null
};

export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  // Battle
  builder.addCase(fetchMonstersBattle.pending, (state) => ({
    ...state,
    battle: null,
  }));

  builder.addCase(fetchMonstersBattle.rejected, (state) => ({
    ...state,
    battle: null,
  }));

  builder.addCase(fetchMonstersBattle.fulfilled, (state, action) => ({
    ...state,
    battle: action.payload,
  }));

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload,
  }));

  builder.addCase(setSelectCPUMonster, (state, action) => ({
    ...state,
    selectedCPUMonster: action.payload,
  }));

  builder.addCase(setBattle, (state, action) => ({
    ...state,
    battle: action.payload,
  }));
});
