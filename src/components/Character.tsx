import { useForm } from "react-hook-form"

type CharacterFormValues = {
  name: string
}

export function Character() {
  const { register, getValues, watch } = useForm<CharacterFormValues>({
    defaultValues: {
      name: "Untitled",
    },
  })

  const name = watch("name") ?? getValues("name")

  return (
    <main className="flex gap-4 p-4">
      <div className="flex flex-col gap-4">
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
      </div>
      <CharacterData name={name} />
    </main>
  )
}

interface CharacterDataProps {
  name: string
}

function CharacterData({ name }: CharacterDataProps) {
  return (
    <div>
      <span>Name</span>
      <h2 className="text-2xl font-medium">{name}</h2>
    </div>
  )
}
