import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { Input } from "../components/Input"
import { Button, LinkButton } from "../components/Button"

type CharacterNameFormValues = {
  name: string
}

interface CharacterNameFormProps {
  onCancel: () => void
}

export function CharacterNameForm({ onCancel }: CharacterNameFormProps) {
  const name = useCharacterStore((state) => state.name)
  const setName = useCharacterStore((state) => state.setName)

  const { handleSubmit, register } = useForm<CharacterNameFormValues>({
    mode: "onSubmit",
    defaultValues: {
      name,
    },
  })

  function onSubmit(data: CharacterNameFormValues) {
    setName(data.name)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <LinkButton onClick={onCancel}>Back</LinkButton>
        <Input label="Name" {...register("name")} />
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
