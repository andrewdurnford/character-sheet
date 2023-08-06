import { create } from "zustand"
import { races } from "./utils/races"

interface CharacterState {
  name: string
  race?: keyof typeof races
  setName: (name: string) => void
  setRace: (race: keyof typeof races) => void
}

export const useCharacterStore = create<CharacterState>()((set) => ({
  name: "Untitled",
  race: undefined,
  setName: (name) => set(() => ({ name })),
  setRace: (race) => set(() => ({ race })),
}))
