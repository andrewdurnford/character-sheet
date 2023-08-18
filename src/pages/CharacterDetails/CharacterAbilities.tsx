import { api } from "../../api"
import { List } from "../../components/List"
import { useCharacter } from "../../stores/character"

export function CharacterAbilities() {
  const abilityScores = useCharacter((s) => s.abilityScores)

  return (
    <div>
      <h2 className="font-bold">Abilities</h2>
      <ul>
        {api._abilityIds.map((abilityId) => {
          const { score, modifier } = abilityScores[abilityId]
          return (
            <List key={abilityId}>
              <div className="flex justify-between gap-4">
                <span>{api.abilities[abilityId]}</span>
                <div className="flex gap-2">
                  {score} ({modifier >= 0 && "+"}
                  {modifier})
                </div>
              </div>
            </List>
          )
        })}
      </ul>
    </div>
  )
}
