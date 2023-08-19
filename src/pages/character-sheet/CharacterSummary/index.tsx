import { useCharacter } from "../../../stores/character"
import { CharacterAbilities } from "./CharacterAbilities"
import { CharacterSavingThrows } from "./CharacterSavingThrows"
import { CharacterSkills } from "./CharacterSkills"

export function CharacterSummary() {
  const proficiencyBonus = useCharacter((s) => s.proficiencyBonus)

  return (
    <section className="flex gap-4">
      <CharacterAbilities />
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <span className="font-bold">Proficiency Bonus:</span>{" "}
          <code>+{proficiencyBonus}</code>
        </div>
        <CharacterSavingThrows />
        <CharacterSkills />
      </div>
    </section>
  )
}
