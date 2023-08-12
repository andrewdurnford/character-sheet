import { create } from "zustand"
import {
  raceAbilityScoreIncreases,
  races,
  subraceAbilityScoreIncreases,
  subraces,
} from "../api/races"
import { classSavingThrowProficiencies, classes } from "../api/classes"
import { abilities, skills } from "../api/abilities"

export function proficiencyBonus(level: number) {
  if (level % 4 === 0) {
    return Math.floor(level / 4) + 1
  }
  return Math.floor(level / 4) + 2
}

interface CharacterState {
  name: string
  raceId?: keyof typeof races
  classId?: keyof typeof classes
  level: number
  // point buy
  abilityScoreChoices?: Record<keyof typeof abilities, number>
  // TODO: rename to classSkillProficiencyChoices
  skillProficiencyChoices?: Array<keyof typeof skills>
  background?: string
  backgroundSkillProficiencyChoices?: Array<keyof typeof skills>
  setName: (name: string) => void
  setRace: (raceId: keyof typeof races) => void
  setClass: (
    classId: keyof typeof classes,
    level: number,
    skillProficiencyChoices?: Array<keyof typeof skills>,
  ) => void
  setBackground: (
    background: string,
    backgroundSkillProficiencyChoices?: Array<keyof typeof skills>,
  ) => void
  setAbilityScoreChoices: (
    abilityScoreChoices?: Record<keyof typeof abilities, number>,
  ) => void
  proficiencyBonus: () => number
  abilityScores: () => Record<
    keyof typeof abilities,
    { score: number; modifier: number }
  >
  abilityChecks: () => Record<
    keyof typeof skills,
    { modifier: number; proficient: boolean }
  >
  savingThrows: () => Record<
    keyof typeof abilities,
    { modifier: number; proficient: boolean }
  >
}

export const useCharacter = create<CharacterState>()((set, get) => ({
  name: "Untitled",
  raceId: undefined,
  classId: undefined,
  level: 1,
  background: "Acolyte",
  setName: (name) => set(() => ({ name })),
  setRace: (raceId) => set(() => ({ raceId })),
  setClass: (classId, level, skillProficiencyChoices) =>
    set(() => ({ classId, level, skillProficiencyChoices })),
  setBackground: (background, backgroundSkillProficiencyChoices) =>
    set(() => ({ background, backgroundSkillProficiencyChoices })),
  setAbilityScoreChoices: (abilityScoreChoices) =>
    set(() => ({ abilityScoreChoices })),
  proficiencyBonus: () => proficiencyBonus(get().level),
  abilityScores: () =>
    Object.keys(abilities).reduce(
      (acc, abilityId) => {
        const increase =
          // calculate race ability score increase
          (raceAbilityScoreIncreases.find(
            (x) => x.raceId === get().raceId && x.abilityId === abilityId,
          )?.increase ?? 0) +
          // calculate subrace ability score increase
          (subraceAbilityScoreIncreases.find(
            (x) =>
              x.subraceId ===
                Object.entries(subraces).find(
                  (x) => x[1].raceId === get().raceId,
                )?.[0] && x.abilityId === abilityId,
          )?.increase ?? 0)

        const abilityScore =
          get().abilityScoreChoices?.[abilityId as keyof typeof abilities] ?? 10

        const score = abilityScore + increase
        const modifier = Math.floor((score - 10) / 2)

        acc[abilityId as keyof typeof abilities] = { score, modifier }
        return acc
      },
      {} as Record<keyof typeof abilities, { score: number; modifier: number }>,
    ),
  abilityChecks: () =>
    Object.entries(skills).reduce(
      (acc, [skillId, { abilityId }]) => {
        const proficiencyBonus = get().proficiencyBonus()
        const proficient =
          !!get().skillProficiencyChoices?.some((x) => x === skillId) ||
          !!get().backgroundSkillProficiencyChoices?.some((x) => x === skillId)
        const abilityModifier = get().abilityScores()[abilityId].modifier
        const modifier = abilityModifier + (proficient ? proficiencyBonus : 0)

        acc[skillId as keyof typeof skills] = { modifier, proficient }
        return acc
      },
      {} as Record<
        keyof typeof skills,
        { modifier: number; proficient: boolean }
      >,
    ),
  savingThrows: () =>
    Object.keys(get().abilityScores()).reduce(
      (acc, abilityId) => {
        const proficiencyBonus = get().proficiencyBonus()
        const proficient = classSavingThrowProficiencies.some(
          (x) => x.classId === get().classId && x.abilityId === abilityId,
        )
        const abilityModifier =
          get().abilityScores()[abilityId as keyof typeof abilities].modifier

        const modifier = abilityModifier + (proficient ? proficiencyBonus : 0)

        acc[abilityId as keyof typeof abilities] = { modifier, proficient }
        return acc
      },
      {} as Record<
        keyof typeof abilities,
        { modifier: number; proficient: boolean }
      >,
    ),
}))
