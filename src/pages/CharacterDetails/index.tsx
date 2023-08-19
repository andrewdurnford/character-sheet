import { useCharacter } from "../../stores/character"
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
  const proficiencyBonus = useCharacter((s) => s.proficiencyBonus)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <CharacterAbilities />
        <div className="flex flex-1 flex-col gap-6">
          <div>
            <span className="font-bold">Proficiency Bonus:</span>{" "}
            <code>+{proficiencyBonus}</code>
          </div>
          <CharacterSavingThrows />
          <CharacterSkills />
        </div>
      </div>
      <CharacterCombat />
    </div>
  )
}
