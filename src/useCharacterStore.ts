import { create } from "zustand"
import { raceAbilityScoreIncreases, races } from "./utils/races"
import { classes } from "./utils/classes"
import { abilities } from "./utils/abilities"

interface CharacterState {
  name: string
  raceId?: keyof typeof races
  classId?: keyof typeof classes
  setName: (name: string) => void
  setRace: (raceId: keyof typeof races) => void
  setClass: (classId: keyof typeof classes) => void
  abilityScores: () => Record<
    keyof typeof abilities,
    { score: number; modifier: number }
  >
}

export const useCharacterStore = create<CharacterState>()((set, get) => ({
  name: "Untitled",
  raceId: undefined,
  classId: undefined,
  setName: (name) => set(() => ({ name })),
  setRace: (raceId) => set(() => ({ raceId })),
  setClass: (classId) => set(() => ({ classId })),
  abilityScores: () =>
    Object.keys(abilities).reduce(
      (acc, cur) => {
        const raceId = get().raceId
        const score =
          10 +
          (raceId
            ? raceAbilityScoreIncreases.find(
                (x) => x.raceId === raceId && x.abilityId === cur,
              )?.increase ?? 0
            : 0)
        const modifier = Math.floor((score - 10) / 2)

        acc[cur as keyof typeof abilities] = { score, modifier }
        return acc
      },
      {} as Record<keyof typeof abilities, { score: number; modifier: number }>,
    ),
}))
