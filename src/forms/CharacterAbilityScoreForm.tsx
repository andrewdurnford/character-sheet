import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { Input } from "../components/Input"
import { Button, LinkButton } from "../components/Button"
import { abilities } from "../api/abilities"
import {
  raceAbilityScoreIncreases,
  races,
  subraceAbilityScoreIncreases,
  subraces,
} from "../api/races"

type CharacterAbilityScoreFormValues = {
  abilities: Record<keyof typeof abilities, number>
  points: number
}

interface CharacterAbilityScoreFormProps {
  onCancel: () => void
}

export function CharacterAbilityScoreForm({
  onCancel,
}: CharacterAbilityScoreFormProps) {
  const abilityScores = useCharacterStore((state) => state.abilityScoreChoices)
  const setAbilityScoreChoices = useCharacterStore(
    (state) => state.setAbilityScoreChoices,
  )

  const defaultValues = abilityScores
    ? {
        points: 0,
        abilities: abilityScores,
      }
    : {
        points: 27,
        abilities: {
          strength: 8,
          dexterity: 8,
          constitution: 8,
          intelligence: 8,
          wisdom: 8,
          charisma: 8,
        },
      }

  const methods = useForm<CharacterAbilityScoreFormValues>({
    mode: "onSubmit",
    defaultValues,
  })

  const points = methods.watch("points")

  function onSubmit(data: CharacterAbilityScoreFormValues) {
    setAbilityScoreChoices(data.abilities)
    onCancel()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="mb-2 text-xl font-medium">Point Buy</h2>
        <div className="flex flex-col items-start gap-6">
          <p>Points: {points}</p>
          {Object.keys(abilities).map((abilityId) => (
            <AbilityScoreInput
              key={abilityId}
              abilityId={abilityId as keyof typeof abilities}
            />
          ))}
          <p className="text-sm">*9 - 13 cost 1 point, 14-15 cost 2 points</p>
          <div className="flex gap-2">
            <Button type="submit" disabled={points > 0}>
              Save
            </Button>
            <LinkButton onClick={onCancel}>Cancel</LinkButton>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

interface AbilityScoreInputProps {
  abilityId: keyof typeof abilities
}

function AbilityScoreInput({ abilityId }: AbilityScoreInputProps) {
  const { watch, register, setValue } =
    useFormContext<CharacterAbilityScoreFormValues>()

  const raceId = useCharacterStore((s) => s.raceId)
  const subraceId = Object.entries(subraces).find(
    (x) => x[1].raceId === raceId,
  )?.[0]
  const increaseByRace = raceAbilityScoreIncreases.find(
    (x) => x.raceId === raceId && x.abilityId === abilityId,
  )?.increase
  const increaseBySubrace = subraceAbilityScoreIncreases.find(
    (x) => x.subraceId === subraceId && x.abilityId === abilityId,
  )?.increase

  const points = watch("points")
  const total = watch(`abilities.${abilityId}`)

  const increment = () => {
    setValue(`abilities.${abilityId}`, total + 1)
    // total is currently 13 or higher, requires 2 points per additional
    setValue("points", points - (total >= 13 ? 2 : 1))
  }
  const decrement = () => {
    setValue(`abilities.${abilityId}`, total - 1)
    // total is currently higher than 13, requires 2 points per additional
    setValue("points", points + (total > 13 ? 2 : 1))
  }

  return (
    <div>
      <div className="flex items-end gap-2">
        <Input
          type="number"
          label={abilities[abilityId]}
          readOnly
          {...register(`abilities.${abilityId}`, { valueAsNumber: true })}
        />
        <Button
          type="button"
          onClick={increment}
          disabled={
            points === 0 ||
            total === 15 ||
            (total >= 13 ? points < 2 : points < 1)
          }
        >
          +
        </Button>
        <Button type="button" onClick={decrement} disabled={total === 8}>
          -
        </Button>
      </div>
      {increaseByRace && raceId && (
        <div className="mt-2">
          (+{increaseByRace} {races[raceId].name})
        </div>
      )}
      {increaseBySubrace && subraceId && (
        <div className="mt-2">
          (+{increaseBySubrace}{" "}
          {subraces[subraceId as keyof typeof subraces].name})
        </div>
      )}
    </div>
  )
}
