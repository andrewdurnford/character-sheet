import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { Input } from "../../components/Input"
import { Button, LinkButton } from "../../components/Button"
import { Ability, api } from "../../api"

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
  const abilityScores = useCharacter((s) => s.abilityScoreChoices)
  const setAbilityScoreChoices = useCharacter((s) => s.setAbilityScoreChoices)

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
      <div className="flex flex-col gap-2">
        <IncreaseByRaceChoice abilityId={abilityId} />
        <IncreaseByRace abilityId={abilityId} />
        <IncreaseBySubrace abilityId={abilityId} />
      </div>
    </div>
  )
}

function IncreaseByRaceChoice({ abilityId }: AbilityScoreInputProps) {
  const raceId = useCharacter((s) => s.raceId)
  const choices = useCharacter((s) => s.raceAbilityScoreIncreaseChoices)

  if (!raceId || !choices?.includes(abilityId)) return null

  return <div>(+1 {api.races[raceId].name})</div>
}

function IncreaseByRace({ abilityId }: AbilityScoreInputProps) {
  const raceId = useCharacter((s) => s.raceId)

  if (!raceId) return null

  const { increase } =
    api.races[raceId].abilityScoreIncreases.find(
      (x) => x.abilityId === abilityId,
    ) || {}

  if (!increase) return null

  return (
    <div>
      (+{increase} {api.races[raceId].name})
    </div>
  )
}

function IncreaseBySubrace({ abilityId }: AbilityScoreInputProps) {
  const raceId = useCharacter((s) => s.raceId)

  if (!raceId) return null

  if (api.races[raceId].subrace?.abilityScoreIncrease !== abilityId) return null

  return <div>+1 {api.races[raceId].subrace?.name}</div>
}
