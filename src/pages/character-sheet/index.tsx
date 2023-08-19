import { Divider } from "../../components/Divider"
import { CharacterCombat } from "./CharacterCombat"
import { CharacterSummary } from "./CharacterSummary"

export function CharacterSheet() {
  return (
    <div className="flex flex-col gap-6">
      <CharacterSummary />
      <Divider />
      <CharacterCombat />
    </div>
  )
}
