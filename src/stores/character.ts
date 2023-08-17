import { create } from "zustand"
import { computed } from "zustand-middleware-computed-state"
import { Ability, Class, Race, Skill } from "../api"
import {
  abilityChecks,
  abilityScores,
  armorClass,
  maxHitPoints,
  proficiencyBonus,
  savingThrows,
  speed,
} from "./utils"

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
    backgroundSkillProficiencyChoices?: Skill[],
  ) => void
  setAbilityScoreChoices: (
    abilityScoreChoices?: Record<Ability, number>,
  ) => void
}

type ComputedState = {
  abilityScores: () => Record<Ability, { score: number; modifier: number }>
  abilityChecks: () => Record<Skill, { modifier: number; proficient: boolean }>
  savingThrows: () => Record<Ability, { modifier: number; proficient: boolean }>
  proficiencyBonus: () => number
  initiative: () => number
  speed: () => number
  armorClass: () => number
  maxHitPoints: () => number
}

type SetType = (
  partial:
    | CharacterState
    | Partial<CharacterState>
    | ((state: CharacterState) => CharacterState | Partial<CharacterState>),
  replace?: boolean | undefined,
) => void

function computedState(state: CharacterState) {
  return {
    abilityScores: () => abilityScores(state),
    abilityChecks: () => abilityChecks(state),
    savingThrows: () => savingThrows(state),
    proficiencyBonus: () => proficiencyBonus(state),
    initiative: () => abilityScores(state).dexterity.modifier,
    speed: () => speed(state),
    armorClass: () => armorClass(state),
    maxHitPoints: () => maxHitPoints(state),
  }
}

export const useCharacter = create<CharacterState & ComputedState>(
  computed<CharacterState, ComputedState>(
    (set: SetType) => ({
      level: 1,
      currentHitPoints: 0,
      setName: (name) => set(() => ({ name })),
      setCurrentHitPoints: (currentHitPoints) =>
        set(() => ({ currentHitPoints })),
      setRace: (raceId, raceAbilityScoreIncreaseChoices) =>
        set(() => ({ raceId, raceAbilityScoreIncreaseChoices })),
      setClass: (classId, level, skillProficiencyChoices) =>
        set(() => ({ classId, level, skillProficiencyChoices })),
      setBackground: (background, backgroundSkillProficiencyChoices) =>
        set(() => ({ background, backgroundSkillProficiencyChoices })),
      setAbilityScoreChoices: (abilityScoreChoices) =>
        set(() => ({ abilityScoreChoices })),
    }),
    computedState,
  ),
)
