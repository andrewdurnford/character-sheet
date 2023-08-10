import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { Input } from "../components/Input"
import { Button, LinkButton } from "../components/Button"
import { CharacterNameSchema, characterNameSchema } from "../lib/types"

interface CharacterNameFormProps {
  onCancel: () => void
}

export function CharacterNameForm({ onCancel }: CharacterNameFormProps) {
  const name = useCharacterStore((state) => state.name)
  const setName = useCharacterStore((state) => state.setName)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CharacterNameSchema>({
    mode: "onSubmit",
    defaultValues: {
      name,
    },
    resolver: zodResolver(characterNameSchema),
  })

  function onSubmit(data: CharacterNameSchema) {
    setName(data.name)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <Input
          label="Name"
          error={errors?.name?.message}
          {...register("name")}
          required
        />
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <LinkButton onClick={onCancel}>Cancel</LinkButton>
        </div>
      </div>
    </form>
  )
}
