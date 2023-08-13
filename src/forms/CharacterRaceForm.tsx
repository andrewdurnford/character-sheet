import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../stores/character"
import { Button, LinkButton } from "../components/Button"
import { Checkbox, Error, RadioGroup } from "../components/Input"
import React, { useEffect } from "react"
import {
  CharacterRaceSchema,
  characterRaceSchema,
} from "../lib/characterRaceSchema"
import { Ability, Subrace, api } from "../api"

interface CharacterRaceFormProps {
  onCancel: () => void
}

export function CharacterRaceForm({ onCancel }: CharacterRaceFormProps) {
  const raceId = useCharacter((state) => state.raceId)
  const abilityScoreIncreaseChoices = useCharacter(
    (state) => state.raceAbilityScoreIncreaseChoices,
  )
  const setRace = useCharacter((state) => state.setRace)

  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CharacterRaceSchema>({
    mode: "onSubmit",
    defaultValues: {
      raceId,
      abilityScoreIncreaseChoices,
      // hasChoice: raceAbilityScoreIncreaseChoices,
    },
    resolver: zodResolver(characterRaceSchema),
  })
  const selectedId = watch("raceId")
  const selectedAbilities = watch("abilityScoreIncreaseChoices")
  const subraceId = Object.entries(api.subraces).find(
    (x) => x[1].raceId === selectedId,
  )?.[0] as Subrace

  const abilityIncreases = api.raceAbilityScoreIncreases.filter(
    (x) => x.raceId === selectedId && !!x.abilityId,
  )
  const abilityIncreaseChoices = api.raceAbilityScoreIncreases.filter(
    (x) => x.raceId === selectedId && !x.abilityId,
  )

  useEffect(() => {
    // increases contains a null value
    const hasChoices =
      api.raceAbilityScoreIncreases.filter(
        (x) => x.raceId === selectedId && !x.abilityId,
      ).length > 0
    console.log(hasChoices)

    setValue("hasChoice", hasChoices)
  }, [selectedId, setValue])

  function onSubmit(data: CharacterRaceSchema) {
    setRace(data.raceId, data.abilityScoreIncreaseChoices)
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
          }))}
          error={errors.raceId?.message}
          required
          {...register("raceId")}
        />
        {selectedId && (
          <React.Fragment>
            <section>
              <div>Speed: {api.races[selectedId].speed} feet</div>
            </section>
            <section>
              <h3>Ability Score Increase</h3>
              <ul>
                {abilityIncreases.map(({ abilityId, increase }) => {
                  if (!abilityId) return null
                  return (
                    <li
                      key={`race-ability-score-${abilityId}-increase`}
                      className="ml-4 list-disc"
                    >
                      {api.abilities[abilityId]} {increase > 0 && "+"}
                      {increase}
                    </li>
                  )
                })}
                {abilityIncreaseChoices.length > 0 && (
                  <section>
                    <ul>
                      {Object.entries(api.abilities)
                        .filter(
                          ([id]) =>
                            !abilityIncreases.some((x) => x.abilityId === id),
                        )
                        .map(([abilityId, name]) => {
                          const selectedMax =
                            selectedAbilities &&
                            selectedAbilities.length >= 2 &&
                            !selectedAbilities.includes(abilityId as Ability)

                          return (
                            <li key={`race-ability-score-choice-${abilityId}`}>
                              <Checkbox
                                value={abilityId}
                                label={`${name} +1`}
                                disabled={selectedMax}
                                {...register("abilityScoreIncreaseChoices")}
                              />
                            </li>
                          )
                        })}
                    </ul>
                    <div className="mb-1 mt-2 flex items-center gap-1">
                      <span className="text-sm">
                        (Choose {abilityIncreaseChoices.length})*
                      </span>
                    </div>
                    <Error
                      error={errors.abilityScoreIncreaseChoices?.message}
                      className="mb-1"
                    />
                  </section>
                )}
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
