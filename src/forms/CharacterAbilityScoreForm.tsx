import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { Input } from "../components/Input"
import { Button, LinkButton } from "../components/Button"
import { abilities } from "../utils/abilities"

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
          <div>Points: {points}</div>
          {Object.keys(abilities).map((abilityId) => (
            <AbilityScoreInput
              key={abilityId}
              abilityId={abilityId as keyof typeof abilities}
            />
          ))}
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

  const points = watch("points")
  const total = watch(`abilities.${abilityId}`)

  const increment = () => {
    setValue(`abilities.${abilityId}`, total + 1)
    setValue("points", points - 1)
  }
  const decrement = () => {
    setValue(`abilities.${abilityId}`, total - 1)
    setValue("points", points + 1)
  }

  return (
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
        disabled={points === 0 || total === 15}
      >
        +
      </Button>
      <Button type="button" onClick={decrement} disabled={total === 8}>
        -
      </Button>
    </div>
  )
}
