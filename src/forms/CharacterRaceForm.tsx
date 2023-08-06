import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { races } from "../utils/races"

type CharacterRaceFormValues = {
  raceId: keyof typeof races
}

interface CharacterRaceFormProps {
  onCancel: () => void
}

export function CharacterRaceForm({ onCancel }: CharacterRaceFormProps) {
  const raceId = useCharacterStore((state) => state.raceId)
  const setRace = useCharacterStore((state) => state.setRace)
  const { handleSubmit, register } = useForm<CharacterRaceFormValues>({
    mode: "onSubmit",
    defaultValues: {
      raceId,
    },
  })

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
        {Object.entries(races).map(([raceId, name]) => (
          <div key={raceId}>
            <input
              id={raceId}
              type="radio"
              value={raceId}
              {...register("raceId")}
            />{" "}
            <label htmlFor={raceId}>{name}</label>
          </div>
        ))}
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
