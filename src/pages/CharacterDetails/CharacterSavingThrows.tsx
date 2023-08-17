import { Ability, api } from "../../api"
import { List } from "../../components/List"
import { useCharacter } from "../../stores/character"
import { cn } from "../../utils/tailwind"

export function CharacterSavingThrows() {
  const savingThrows = useCharacter((s) => s.savingThrows)

  return (
    <div>
      <h2 className="font-medium">Saving Throws</h2>
      <ul>
        {Object.entries(savingThrows()).map(
          ([abilityId, { modifier, proficient }]) => (
            <List
              key={abilityId}
              className={cn(proficient && "font-semibold")}
              style={proficient ? "disc" : "circle"}
            >
              <div className="flex justify-between gap-4">
                {api.abilities[abilityId as Ability]}
                <span>
                  ({modifier >= 0 && "+"}
                  {modifier})
                </span>
              </div>
            </List>
          ),
        )}
      </ul>
    </div>
  )
}
