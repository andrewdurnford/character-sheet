import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../stores/character"
import { Button, LinkButton } from "../components/Button"
import { RadioGroup } from "../components/Input"
import React from "react"
import {
  CharacterRaceSchema,
  characterRaceSchema,
} from "../lib/characterRaceSchema"
import { Subrace, api } from "../api"

interface CharacterRaceFormProps {
  onCancel: () => void
}

export function CharacterRaceForm({ onCancel }: CharacterRaceFormProps) {
  const raceId = useCharacter((state) => state.raceId)
  const setRace = useCharacter((state) => state.setRace)

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CharacterRaceSchema>({
    mode: "onSubmit",
    defaultValues: {
      raceId,
    },
    resolver: zodResolver(characterRaceSchema),
  })
  const selectedId = watch("raceId")
  const subraceId = Object.entries(api.subraces).find(
    (x) => x[1].raceId === selectedId,
  )?.[0] as Subrace

  function onSubmit(data: CharacterRaceSchema) {
    setRace(data.raceId)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <RadioGroup
          label="Race"
          options={Object.entries(api.races).map(([raceId, { name }]) => ({
            label: name,
            value: raceId,
            disabled: raceId === "half-elf",
          }))}
          error={errors.raceId?.message}
          required
          {...register("raceId")}
        />
        {selectedId && (
          <React.Fragment>
            <section>
              <h3>Ability Score Increase</h3>
              <ul>
                {api.raceAbilityScoreIncreases
                  .filter((x) => x.raceId === selectedId)
                  .map(({ abilityId, increase }) => (
                    <li
                      key={`race-ability-score-${abilityId}-increase`}
                      className="ml-4 list-disc"
                    >
                      {api.abilities[abilityId]} {increase > 0 && "+"}
                      {increase}
                    </li>
                  ))}
              </ul>
            </section>
            {subraceId && (
              <section>
                <h2 className="mb-2 font-medium">Subrace</h2>
                <h3 className="mb-2">{api.subraces[subraceId].name}</h3>
                <div>
                  <h4>Ability Score Increase</h4>
                  <ul>
                    {api.subraceAbilityScoreIncreases
                      .filter((x) => x.subraceId === subraceId)
                      .map(({ abilityId, increase }) => (
                        <li
                          key={`subrace-ability-score-${abilityId}-increase`}
                          className="ml-4 list-disc"
                        >
                          {api.abilities[abilityId]} {increase > 0 && "+"}
                          {increase}
                        </li>
                      ))}
                  </ul>
                </div>
              </section>
            )}
          </React.Fragment>
        )}
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <LinkButton onClick={onCancel}>Cancel</LinkButton>
        </div>
      </div>
    </form>
  )
}
