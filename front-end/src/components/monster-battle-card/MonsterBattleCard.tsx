import { Divider } from "@mui/material"
import { Monster } from "../../models/interfaces/monster.interface"
import { BattleMonsterCard, BattleMonsterTitle, BattleMonsterName, BattleMonsterTextSkill, Image, ProgressBar } from "./MonsterBattleCard.styled"

type MonsterCardProps = {
    monster?: Monster | null
    title?: string
}

const getMonsterSkillSet = (text: string, value: number) => {
    return (
        <>
            <BattleMonsterTextSkill>{text}</BattleMonsterTextSkill>
            <ProgressBar variant="determinate" value={value} />
        </>
    );
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {
    if (!monster) {
        return (
            <BattleMonsterCard centralized>
                <BattleMonsterTitle>{title!}</BattleMonsterTitle>
            </BattleMonsterCard>
        )
    }
    return (
        <BattleMonsterCard>
            <Image src={monster.imageUrl} />
            <BattleMonsterName>{monster.name}</BattleMonsterName>
            <Divider style={{paddingTop: 5}}/>
            {getMonsterSkillSet('HP', monster.hp)}
            {getMonsterSkillSet('Attack', monster.attack)}
            {getMonsterSkillSet('Defense', monster.defense)}
            {getMonsterSkillSet('Speed', monster.speed)}

        </BattleMonsterCard>
    )
}

export { MonsterBattleCard }