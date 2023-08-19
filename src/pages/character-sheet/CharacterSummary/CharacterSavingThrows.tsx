import { api } from "../../../api"
import { Icon } from "../../../components/Icon"
import { List } from "../../../components/List"
import { useCharacter } from "../../../stores/character"
import { mod } from "../../../utils/string"
import { cn } from "../../../utils/tailwind"

export function CharacterSavingThrows() {
  const savingThrows = useCharacter((s) => s.savingThrows)

  return (
    <div className="rounded border border-black p-2">
      <h2 className="mb-1 font-bold">Saving Throws</h2>
      <ul>
        {api._abilityIds.map((abilityId) => {
          const { modifier, proficient } = savingThrows[abilityId]
          return (
            <List key={abilityId} className={cn(proficient && "font-semibold")}>
              <div className="flex gap-3">
                <Icon name={proficient ? "circle-fill" : "circle-outline"} />
                <code>{mod(modifier)}</code>
                <span>{api.abilities[abilityId]}</span>
              </div>
            </List>
          )
        })}
      </ul>
    </div>
  )
}
