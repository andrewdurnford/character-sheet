import { Skill, api } from "../../api"
import { List } from "../../components/List"
import { useCharacter } from "../../stores/character"
import { cn } from "../../utils/tailwind"

export function CharacterSkills() {
  const abilityChecks = useCharacter((s) => s.abilityChecks)

  return (
    <div>
      <h2 className="font-bold">Skills</h2>
      <ul>
        {Object.entries(abilityChecks()).map(
          ([skillId, { modifier, proficient }]) => (
            <List
              key={skillId}
              className={cn(proficient && "font-semibold")}
              style={proficient ? "disc" : "circle"}
            >
              <div className="flex justify-between gap-4">
                <span>{api.skills[skillId as Skill].name}</span>
                <span>
                  {modifier >= 0 && "+"}
                  {modifier}
                </span>
              </div>
            </List>
          ),
        )}
      </ul>
    </div>
  )
}
