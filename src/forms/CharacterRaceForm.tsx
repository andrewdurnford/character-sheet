import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { raceAbilityScoreIncreases, races } from "../utils/races"
import { abilities } from "../utils/abilities"
import { Button, LinkButton } from "../components/Button"
import { RadioGroup } from "../components/Input"

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
      <div className="flex flex-col items-start gap-6">
        <LinkButton onClick={onCancel}>Back</LinkButton>
        <RadioGroup
          label="Race"
          options={Object.entries(races).map(([raceId, { name }]) => ({
            label: name,
            value: raceId,
            disabled: raceId === "half-elf",
          }))}
          {...register("raceId")}
        />
        {selectedId && (
          <section>
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
          </section>
        )}
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
