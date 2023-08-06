import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { classes } from "../utils/classes"
import { Button, LinkButton } from "../components/Button"
import { RadioGroup } from "../components/Input"

type CharacterClassFormValues = {
  classId: keyof typeof classes
}

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacterStore((state) => state.classId)
  const setClass = useCharacterStore((state) => state.setClass)
  const { handleSubmit, register } = useForm<CharacterClassFormValues>({
    mode: "onSubmit",
    defaultValues: {
      classId,
    },
  })

  function onSubmit(data: CharacterClassFormValues) {
    setClass(data.classId)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <LinkButton onClick={onCancel}>Back</LinkButton>
        <RadioGroup
          label="Class"
          options={Object.entries(classes).map(([classId, name]) => ({
            label: name,
            value: classId,
          }))}
          {...register("classId")}
        />
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
