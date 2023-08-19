import { api } from "../../api"
import { useCharacter } from "../../stores/character"
import { mod } from "../../utils/string"

export function CharacterAbilities() {
  const abilityScores = useCharacter((s) => s.abilityScores)

  return (
    <section className="flex flex-col gap-2">
      {api._abilityIds.map((abilityId) => {
        const { score, modifier } = abilityScores[abilityId]
        return (
          <div
            key={abilityId}
            className="flex flex-1 flex-col items-center justify-between gap-2 rounded border border-black px-1 py-2"
          >
            <span className="text-xs uppercase">
              {api.abilities[abilityId]}
            </span>
            <code>{mod(modifier)}</code>
            <code className="text-sm">{score}</code>
          </div>
        )
      })}
    </section>
  )
}
