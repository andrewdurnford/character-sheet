import { api } from "../../api"
import { List } from "../../components/List"
import { useCharacter } from "../../stores/character"
import { cn } from "../../utils/tailwind"

export function CharacterSkills() {
  const abilityChecks = useCharacter((s) => s.abilityChecks)

  return (
    <div>
      <h2 className="font-bold">Skills</h2>
      <ul>
        {api._skillIds.map((skillId) => {
          const { modifier, proficient } = abilityChecks[skillId]
          return (
            <List
              key={skillId}
              className={cn(proficient && "font-semibold")}
              style={proficient ? "disc" : "circle"}
            >
              <div className="flex justify-between gap-4">
                <span>{api.skills[skillId].name}</span>
                <span>
                  {modifier >= 0 && "+"}
                  {modifier}
                </span>
              </div>
            </List>
          )
        })}
      </ul>
    </div>
  )
}
