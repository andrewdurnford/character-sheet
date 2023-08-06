import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"

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
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="mb-4 block hover:underline"
        >
          Back
        </button>
        <label htmlFor="name" className="mb-1 inline-block font-medium">
          Name
        </label>
        <input
          id="name"
          className="block w-full rounded border border-black bg-white px-1 "
          {...register("name")}
        />
        <button
          type="submit"
          className="mt-6 rounded border border-black bg-gray-200 px-1"
        >
          Save
        </button>
      </div>
    </form>
  )
}
