import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useCharacter } from "../stores/character"
import { Input } from "../components/Input"
import { Button, LinkButton } from "../components/Button"
import { Ability, Subrace, api } from "../api"

type CharacterAbilityScoreFormValues = {
  abilities: Record<Ability, number>
  points: number
}

interface CharacterAbilityScoreFormProps {
  onCancel: () => void
}

export function CharacterAbilityScoreForm({
  onCancel,
}: CharacterAbilityScoreFormProps) {
  const abilityScores = useCharacter((state) => state.abilityScoreChoices)
  const setAbilityScoreChoices = useCharacter(
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
          {Object.keys(api.abilities).map((abilityId) => (
            <AbilityScoreInput
              key={abilityId}
              abilityId={abilityId as Ability}
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
  abilityId: keyof typeof api.abilities
}

function AbilityScoreInput({ abilityId }: AbilityScoreInputProps) {
  const { watch, register, setValue } =
    useFormContext<CharacterAbilityScoreFormValues>()

  const raceId = useCharacter((s) => s.raceId)
  const choices = useCharacter((s) => s.raceAbilityScoreIncreaseChoices)
  const subraceId = Object.entries(api.subraces).find(
    (x) => x[1].raceId === raceId,
  )?.[0]
  const increaseByRaceChoice = choices?.some((x) => x === abilityId)
  const increaseByRace = api.raceAbilityScoreIncreases.find(
    (x) => x.raceId === raceId && x.abilityId === abilityId,
  )?.increase
  const increaseBySubrace = api.subraceAbilityScoreIncreases.find(
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
          label={api.abilities[abilityId]}
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
      {increaseByRaceChoice && raceId && (
        <div className="mt-2">(+1 {api.races[raceId].name})</div>
      )}
      {increaseByRace && raceId && (
        <div className="mt-2">
          (+{increaseByRace} {api.races[raceId].name})
        </div>
      )}
      {increaseBySubrace && subraceId && (
        <div className="mt-2">
          (+{increaseBySubrace} {api.subraces[subraceId as Subrace].name})
        </div>
      )}
    </div>
  )
}