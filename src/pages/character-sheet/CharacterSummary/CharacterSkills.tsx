import { api } from "../../../api"
import { Icon } from "../../../components/Icon"
import { List } from "../../../components/List"
import { useCharacter } from "../../../stores/character"
import { mod } from "../../../utils/string"
import { cn } from "../../../utils/tailwind"

export function CharacterSkills() {
  const abilityChecks = useCharacter((s) => s.abilityChecks)

  return (
    <div className="rounded border border-black p-2">
      <h2 className="mb-1 font-bold">Skills</h2>
      <ul>
        {api._skillIds.map((skillId) => {
          const { modifier, proficient } = abilityChecks[skillId]
          return (
            <List key={skillId} className={cn(proficient && "font-semibold")}>
              <div className="flex gap-3">
                <Icon name={proficient ? "circle-fill" : "circle-outline"} />
                <code>{mod(modifier)}</code>
                <span>{api.skills[skillId].name}</span>
              </div>
            </List>
          )
        })}
      </ul>
    </div>
  )
}
