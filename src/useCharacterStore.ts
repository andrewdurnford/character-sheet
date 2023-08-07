import { create } from "zustand"
import {
  raceAbilityScoreIncreases,
  races,
  subraceAbilityScoreIncreases,
  subraces,
} from "./utils/races"
import { classes } from "./utils/classes"
import { abilities, skills } from "./utils/abilities"

interface CharacterState {
  name: string
  raceId?: keyof typeof races
  classId?: keyof typeof classes
  level: number
  setName: (name: string) => void
  setRace: (raceId: keyof typeof races) => void
  setClass: (classId: keyof typeof classes, level: number) => void
  abilityScores: () => Record<
    keyof typeof abilities,
    { score: number; modifier: number }
  >
  abilityChecks: () => Record<
    keyof typeof skills,
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
        // TODO: move to class
        const proficiencyBonus = 2
        // TODO: calculate from class proficiencies
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
}))
