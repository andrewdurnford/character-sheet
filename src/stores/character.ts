import { create } from "zustand"
import computed from "zustand-computed"
import { Ability, Class, Race, Skill } from "../api"
import {
  Characteristics,
  abilityChecks,
  abilityScores,
  armorClass,
  maxHitPoints,
  proficiencyBonus,
  savingThrows,
  speed,
} from "../utils/core"

export type CharacterState = {
  name?: string
  raceId?: Race
  classId?: Class
  level: number
  // point buy
  abilityScoreChoices?: Record<Ability, number>
  // TODO: rename to classSkillProficiencyChoices
  skillProficiencyChoices?: Skill[]
  background?: string
  backgroundCharacteristics?: Characteristics
  backgroundSkillProficiencyChoices?: Skill[]
  raceAbilityScoreIncreaseChoices?: Ability[]
  currentHitPoints: number
  setName: (name: string) => void
  setCurrentHitPoints: (currentHitPoints: number) => void
  setRace: (raceId: Race, raceAbilityScoreIncreaseChoices?: Ability[]) => void
  setClass: (
    classId: Class,
    level: number,
    skillProficiencyChoices?: Skill[],
  ) => void
  setBackground: (
    background: string,
    backgroundCharacteristics?: Characteristics,
    backgroundSkillProficiencyChoices?: Skill[],
  ) => void
  setAbilityScoreChoices: (
    abilityScoreChoices?: Record<Ability, number>,
  ) => void
}

type ComputedState = {
  abilityScores: Record<Ability, { score: number; modifier: number }>
  abilityChecks: Record<Skill, { modifier: number; proficient: boolean }>
  savingThrows: Record<Ability, { modifier: number; proficient: boolean }>
  proficiencyBonus: number
  initiative: number
  speed: number
  armorClass: number
  maxHitPoints: number
}

function computedState(state: CharacterState) {
  return {
    abilityScores: abilityScores(state),
    abilityChecks: abilityChecks(state),
    savingThrows: savingThrows(state),
    proficiencyBonus: proficiencyBonus(state),
    initiative: abilityScores(state).dexterity.modifier,
    speed: speed(state),
    armorClass: armorClass(state),
    maxHitPoints: maxHitPoints(state),
  }
}

export const useCharacter = create<CharacterState & ComputedState>()(
  computed<CharacterState, ComputedState>(
    (set) => ({
      level: 1,
      currentHitPoints: 0,
      setName: (name) => set(() => ({ name })),
      setCurrentHitPoints: (currentHitPoints) =>
        set(() => ({ currentHitPoints })),
      setRace: (raceId, raceAbilityScoreIncreaseChoices) =>
        set(() => ({ raceId, raceAbilityScoreIncreaseChoices })),
      setClass: (classId, level, skillProficiencyChoices) =>
        set(() => ({ classId, level, skillProficiencyChoices })),
      setBackground: (
        background,
        backgroundCharacteristics,
        backgroundSkillProficiencyChoices,
      ) =>
        set(() => ({
          background,
          backgroundCharacteristics,
          backgroundSkillProficiencyChoices,
        })),
      setAbilityScoreChoices: (abilityScoreChoices) =>
        set(() => ({ abilityScoreChoices })),
    }),
    computedState,
  ),
)
