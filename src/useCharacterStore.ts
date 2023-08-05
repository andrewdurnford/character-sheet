import { create } from "zustand"

interface CharacterState {
  name: string
  setName: (name: string) => void
}

export const useCharacterStore = create<CharacterState>()((set) => ({
  name: "Untitled",
  setName: (name) => set(() => ({ name })),
}))
