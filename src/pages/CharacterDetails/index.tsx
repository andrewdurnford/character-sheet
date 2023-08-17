import { CharacterAbilities } from "./CharacterAbilities"
import { CharacterCombat } from "./CharacterCombat"
import { CharacterSavingThrows } from "./CharacterSavingThrows"
import { CharacterSkills } from "./CharacterSkills"

// TODO: update into separate tabs/screen
// - summary/scores
// - combat
// - equipment
// - details
export function CharacterDetails() {
  return (
    <div className="flex flex-col gap-4">
      <CharacterAbilities />
      <CharacterSavingThrows />
      <CharacterSkills />
      <CharacterCombat />
    </div>
  )
}
