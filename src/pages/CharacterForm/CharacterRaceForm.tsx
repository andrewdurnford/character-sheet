import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { Button, LinkButton } from "../../components/Button"
import { Checkbox, Error, RadioGroup } from "../../components/Input"
import React, { useEffect } from "react"
import {
  CharacterRaceSchema,
  characterRaceSchema,
} from "../../lib/characterRaceSchema"
import { Ability, api } from "../../api"
import { List } from "../../components/List"

interface CharacterRaceFormProps {
  onCancel: () => void
}

export function CharacterRaceForm({ onCancel }: CharacterRaceFormProps) {
  const raceId = useCharacter((s) => s.raceId)
  const abilityScoreIncreaseChoices = useCharacter(
    (s) => s.raceAbilityScoreIncreaseChoices,
  )
  const setRace = useCharacter((s) => s.setRace)

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

  const abilityIncreases = selectedId
    ? api.races[selectedId].abilityScoreIncreases.filter((x) => !!x.abilityId)
    : []
  const abilityIncreaseChoices = selectedId
    ? api.races[selectedId].abilityScoreIncreases.filter((x) => !x.abilityId)
    : []

  useEffect(() => {
    // increases contains a null value
    if (selectedId) {
      const hasChoices =
        api.races[selectedId].abilityScoreIncreases.filter((x) => !x.abilityId)
          .length > 0
      setValue("hasChoice", hasChoices)
    }
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
          options={api._raceIds.map((raceId) => ({
            label: api.races[raceId].name,
            value: raceId,
          }))}
          error={errors.raceId?.message}
          required
          {...register("raceId")}
        />
        {selectedId && (
          <React.Fragment>
            <section>
              <div>Speed: {api.races[selectedId].details.speed} feet</div>
            </section>
            <section>
              <h3>Ability Score Increase</h3>
              <ul>
                {abilityIncreases.map(({ abilityId, increase }) => {
                  if (!abilityId) return null
                  return (
                    <List
                      key={`race-ability-score-${abilityId}-increase`}
                      style="disc"
                    >
                      {api.abilities[abilityId]} {increase > 0 && "+"}
                      {increase}
                    </List>
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
                            <List
                              key={`race-ability-score-choice-${abilityId}`}
                            >
                              <Checkbox
                                value={abilityId}
                                label={`${name} +1`}
                                disabled={selectedMax}
                                {...register("abilityScoreIncreaseChoices")}
                              />
                            </List>
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
            {api.races[selectedId].subrace && (
              <section>
                <h2 className="mb-2 font-medium">Subrace</h2>
                <h3 className="mb-2">{api.races[selectedId].subrace?.name}</h3>
                <div>
                  <h4>Ability Score Increase</h4>
                  <ul>
                    <List style="disc">
                      {api.races[selectedId].subrace?.abilityScoreIncrease} +1
                    </List>
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
