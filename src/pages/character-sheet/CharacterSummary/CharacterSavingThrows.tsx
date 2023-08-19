import { api } from "../../../api"
import { List } from "../../../components/List"
import { useCharacter } from "../../../stores/character"
import { mod } from "../../../utils/string"
import { cn } from "../../../utils/tailwind"

export function CharacterSavingThrows() {
  const savingThrows = useCharacter((s) => s.savingThrows)

  return (
    <div>
      <h2 className="mb-1 font-bold">Saving Throws</h2>
      <ul>
        {api._abilityIds.map((abilityId) => {
          const { modifier, proficient } = savingThrows[abilityId]
          return (
            <List
              key={abilityId}
              className={cn(proficient && "font-semibold")}
              style={proficient ? "disc" : "circle"}
            >
              <div className="flex justify-between gap-4">
                {api.abilities[abilityId]}
                <span>
                  <code>{mod(modifier)}</code>
                </span>
              </div>
            </List>
          )
        })}
      </ul>
    </div>
  )
}
