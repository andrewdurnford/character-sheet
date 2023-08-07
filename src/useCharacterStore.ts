import { create } from "zustand"
import {
  raceAbilityScoreIncreases,
  races,
  subraceAbilityScoreIncreases,
  subraces,
} from "./utils/races"
import { classSavingThrowProficiencies, classes } from "./utils/classes"
import { abilities, skills } from "./utils/abilities"

interface CharacterState {
  name: string
  raceId?: keyof typeof races
  classId?: keyof typeof classes
  level: number
  setName: (name: string) => void
  setRace: (raceId: keyof typeof races) => void
  setClass: (classId: keyof typeof classes, level: number) => void
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

export const useCharacterStore = create<CharacterState>()((set, get) => ({
  name: "Untitled",
  raceId: undefined,
  classId: undefined,
  level: 1,
  setName: (name) => set(() => ({ name })),
  setRace: (raceId) => set(() => ({ raceId })),
  setClass: (classId, level) => set(() => ({ classId, level })),
  proficiencyBonus: () => {
    const level = get().level
    if (level % 4 === 0) {
      return Math.floor(level / 4) + 1
    }
    return Math.floor(level / 4) + 2
  },
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

        const score = 10 + increase
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
        // TODO: calculate from class proficiency choices
        const proficient = false
        const abilityModifier = get().abilityScores()[abilityId].modifier
        const modifier = abilityModifier + (proficient ? proficiencyBonus : 0)

        acc[skillId] = { modifier, proficient }
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
