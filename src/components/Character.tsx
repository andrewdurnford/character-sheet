import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"

export function Character() {
  return (
    <main className="flex justify-between p-4">
      <CharacterForm />
      <CharacterData />
    </main>
  )
}

type CharacterFormValues = {
  name: string
}

export function CharacterForm() {
  const name = useCharacterStore((state) => state.name)
  const setName = useCharacterStore((state) => state.setName)
  const { handleSubmit, register } = useForm<CharacterFormValues>({
    mode: "onSubmit",
    defaultValues: {
      name,
    },
  })

  function onSubmit(data: CharacterFormValues) {
    setName(data.name)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-1">
          <div>
            <label htmlFor="name" className="mb-1 inline-block font-medium">
              Name
            </label>
            <input
              id="name"
              className="block w-full rounded-lg border border-gray-400 bg-white px-3.5 py-2"
              {...register("name")}
            />
          </div>
          <button
            type="submit"
            className="rounded-lg border border-blue-700 bg-blue-400 px-3.5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

function CharacterData() {
  const name = useCharacterStore((state) => state.name)

  return (
    <div>
      <span>Name</span>
      <h2 className="text-2xl font-medium">{name}</h2>
    </div>
  )
}
