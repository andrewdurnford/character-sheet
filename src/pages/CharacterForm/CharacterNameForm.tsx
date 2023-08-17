import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { Input } from "../../components/Input"
import { Button, LinkButton } from "../../components/Button"
import {
  CharacterNameSchema,
  characterNameSchema,
} from "../../lib/characterNameSchema"

interface CharacterNameFormProps {
  onCancel: () => void
}

export function CharacterNameForm({ onCancel }: CharacterNameFormProps) {
  const name = useCharacter((s) => s.name)
  const setName = useCharacter((s) => s.setName)

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
          placeholder="Untitled"
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
