import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { classes } from "../utils/classes"
import { Button, LinkButton } from "../components/Button"
import { Input, RadioGroup } from "../components/Input"

type CharacterClassFormValues = {
  classId: keyof typeof classes
  level: number
}

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacterStore((state) => state.classId)
  const level = useCharacterStore((state) => state.level)
  const setClass = useCharacterStore((state) => state.setClass)
  const { handleSubmit, register } = useForm<CharacterClassFormValues>({
    mode: "onSubmit",
    defaultValues: {
      classId,
      level,
    },
  })

  function onSubmit(data: CharacterClassFormValues) {
    setClass(data.classId, data.level)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <LinkButton onClick={onCancel}>Back</LinkButton>
        <Input type="number" label="Level" {...register("level")} />
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
