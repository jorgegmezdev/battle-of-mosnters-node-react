import { RootState } from '../../app/store';

export const selectMonsters = (state: RootState) => state.monsters.monsters;

export const selectSelectedMonster = (state: RootState) =>
  state.monsters.selectedMonster;

export const selectSelectedCPUMonster = (state: RootState) =>
  state.monsters.selectedCPUMonster;

export const selectBattle = (state: RootState) =>
  state.monsters.battle;
