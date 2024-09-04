import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { fetchMonstersData, fetchMonstersBattle } from "../../reducers/monsters/monsters.actions"
import { selectMonsters, selectSelectedMonster, selectBattle, selectSelectedCPUMonster } from "../../reducers/monsters/monsters.selectors"
import { BattleSection, PageContainer, StartBattleButton } from "./BattleOfMonsters.styled"
import { WinnerDisplay } from "../../components/winner-display/WinnerDisplay"

const BattleOfMonsters = () => {
    const dispatch = useAppDispatch()

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)
    const selectedCPUMonster = useSelector(selectSelectedCPUMonster)
    const battle = useSelector(selectBattle)

    useEffect(() => {
        dispatch(fetchMonstersData())
    }, [dispatch]);

    const handleStartBattleClick = () => {
        if (!selectedMonster || !selectedCPUMonster) return;
        dispatch(fetchMonstersBattle({
            monsterAId: selectedMonster.id,
            monsterBId: selectedCPUMonster.id
        }));
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList monsters={monsters} />
            { battle && <WinnerDisplay text={battle.winner.name} /> }

            <BattleSection>
                <MonsterBattleCard title={selectedMonster?.name || "Player"} monster={selectedMonster}></MonsterBattleCard>
                <StartBattleButton data-testid="start-battle-button"  disabled={selectedMonster === null} onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                <MonsterBattleCard title="Computer" monster={selectedCPUMonster}></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }