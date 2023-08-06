import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { raceAbilityScoreIncreases, races } from "../utils/races"
import { abilities } from "../utils/abilities"

type CharacterRaceFormValues = {
  raceId: keyof typeof races
}

interface CharacterRaceFormProps {
  onCancel: () => void
}

export function CharacterRaceForm({ onCancel }: CharacterRaceFormProps) {
  const raceId = useCharacterStore((state) => state.raceId)
  const setRace = useCharacterStore((state) => state.setRace)
  const { watch, handleSubmit, register } = useForm<CharacterRaceFormValues>({
    mode: "onSubmit",
    defaultValues: {
      raceId,
    },
  })

  const selectedId = watch("raceId")

  function onSubmit(data: CharacterRaceFormValues) {
    setRace(data.raceId)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="mb-4 block hover:underline"
        >
          Back
        </button>
        <label htmlFor="raceId" className="mb-1 inline-block font-medium">
          Race
        </label>
        {Object.entries(races).map(([raceId, { name }]) => (
          <div key={raceId}>
            <input
              id={raceId}
              type="radio"
              value={raceId}
              disabled={raceId === "half-elf"}
              {...register("raceId")}
            />{" "}
            <label htmlFor={raceId}>{name}</label>
          </div>
        ))}
        {selectedId && (
          <div className="mt-4">
            <h3>Ability Score Increases</h3>
            <ul>
              {raceAbilityScoreIncreases
                .filter((x) => x.raceId === selectedId)
                .map(({ abilityId, increase }) => (
                  <li
                    key={`race-ability-score-${abilityId}-increase`}
                    className="ml-4 list-disc"
                  >
                    {abilities[abilityId]} {increase > 0 && "+"}
                    {increase}
                  </li>
                ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="mt-6 rounded border border-black bg-gray-200 px-1"
        >
          Save
        </button>
      </div>
    </form>
  )
}
