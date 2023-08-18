import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { Button, LinkButton } from "../../components/Button"
import { Checklist, RadioGroup } from "../../components/Input"
import { useEffect } from "react"
import {
  CharacterRaceSchema,
  characterRaceSchema,
} from "../../lib/characterRaceSchema"
import { api } from "../../api"
import { List } from "../../components/List"
import { mod, titleCase } from "../../utils/string"
import { Divider } from "../../components/Divider"

interface CharacterRaceFormProps {
  onCancel: () => void
}

export function CharacterRaceForm({ onCancel }: CharacterRaceFormProps) {
  const raceId = useCharacter((s) => s.raceId)
  const abilityChoices = useCharacter((s) => s.raceAbilityScoreIncreaseChoices)
  const setRace = useCharacter((s) => s.setRace)

  const methods = useForm<CharacterRaceSchema>({
    mode: "onSubmit",
    defaultValues: {
      raceId,
      abilityScoreIncreaseChoices: abilityChoices,
      hasChoice: !!abilityChoices?.length,
    },
    resolver: zodResolver(characterRaceSchema),
  })

  function onSubmit(data: CharacterRaceSchema) {
    setRace(data.raceId, data.abilityScoreIncreaseChoices)
    onCancel()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start gap-6">
          <RadioGroup
            label="Race"
            options={api._raceIds.map((raceId) => ({
              label: api.races[raceId].name,
              value: raceId,
            }))}
            error={methods.formState.errors.raceId?.message}
            required
            {...methods.register("raceId")}
          />
          <RaceDetails />
          <AbilityScoreIncrease />
          <AbilityScoreIncreaseChoice />
          <Subrace />
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <LinkButton onClick={onCancel}>Cancel</LinkButton>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

function RaceDetails() {
  const { watch } = useFormContext<CharacterRaceSchema>()
  const raceId = watch("raceId")
  if (!raceId) return null

  return (
    <section>
      <div>
        <strong>Speed:</strong> {api.races[raceId].details.speed} feet
      </div>
    </section>
  )
}

function AbilityScoreIncrease() {
  const { watch } = useFormContext<CharacterRaceSchema>()

  const raceId = watch("raceId")

  if (!raceId) return null

  return (
    <section>
      <h3 className="mb-1 font-bold">Ability Score Increase</h3>
      <ul>
        {api.races[raceId].abilityScoreIncreases.map(
          ({ abilityId, increase }) => {
            if (!abilityId) return null
            return (
              <List
                key={`race-ability-score-${abilityId}-increase`}
                style="disc"
              >
                {api.abilities[abilityId]} {mod(increase)}
              </List>
            )
          },
        )}
      </ul>
    </section>
  )
}

function AbilityScoreIncreaseChoice() {
  const abilityChoices = useCharacter((s) => s.raceAbilityScoreIncreaseChoices)

  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = useFormContext<CharacterRaceSchema>()

  const raceId = watch("raceId")

  // Clear choices when changing race
  useEffect(() => {
    if (raceId) {
      const hasChoices =
        api.races[raceId].abilityScoreIncreases.filter((x) => !x.abilityId)
          .length > 0

      setValue("hasChoice", hasChoices)
      setValue("abilityScoreIncreaseChoices", !hasChoices ? [] : abilityChoices)
    }
  }, [abilityChoices, raceId, setValue])

  if (!raceId) return null

  const selectedAbilities = watch("abilityScoreIncreaseChoices")

  const abilityIncreases = api.races[raceId].abilityScoreIncreases.filter(
    (x) => !!x.abilityId,
  )
  const abilityIncreaseChoices = api.races[raceId].abilityScoreIncreases.filter(
    (x) => !x.abilityId,
  )

  if (abilityIncreaseChoices.length < 1) return null

  return (
    <Checklist
      required
      label="Ability Score Increase Choice"
      select={abilityIncreaseChoices.length}
      selectCount={selectedAbilities?.length}
      options={api._abilityIds
        .filter(
          (abilityId) =>
            !abilityIncreases.some((x) => x.abilityId === abilityId),
        )
        .map((abilityId) => {
          const selectedMax =
            selectedAbilities &&
            selectedAbilities.length >= 2 &&
            !selectedAbilities.includes(abilityId)

          return {
            value: abilityId,
            label: `${api.abilities[abilityId]} +1`,
            disabled: selectedMax,
          }
        })}
      error={errors.abilityScoreIncreaseChoices?.message}
      {...register("abilityScoreIncreaseChoices")}
    />
  )
}

function Subrace() {
  const { watch } = useFormContext<CharacterRaceSchema>()
  const raceId = watch("raceId")
  if (!raceId) return null

  const subrace = api.races[raceId].subrace
  if (!subrace) return null

  return (
    <section className="flex flex-col gap-6">
      <Divider />
      <div>
        <label className="mb-1 block font-bold">Subrace</label>
        <input type="radio" defaultChecked /> {subrace.name}
      </div>
      <div>
        <h3 className="font-bold">Ability Score Increase</h3>
        <ul>
          <List style="disc">{titleCase(subrace.abilityScoreIncrease)} +1</List>
        </ul>
      </div>
    </section>
  )
}
