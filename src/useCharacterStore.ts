import { create } from "zustand"
import { races } from "./utils/races"
import { classes } from "./utils/classes"

interface CharacterState {
  name: string
  raceId?: keyof typeof races
  classId?: keyof typeof classes
  setName: (name: string) => void
  setRace: (raceId: keyof typeof races) => void
  setClass: (classId: keyof typeof classes) => void
}

export const useCharacterStore = create<CharacterState>()((set) => ({
  name: "Untitled",
  raceId: undefined,
  classId: undefined,
  setName: (name) => set(() => ({ name })),
  setRace: (raceId) => set(() => ({ raceId })),
  setClass: (classId) => set(() => ({ classId })),
}))
