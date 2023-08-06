import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { races } from "../utils/races"

export function Character() {
  return (
    <main className="flex justify-between p-4">
      <div className="flex flex-col gap-4">
        <CharacterNameForm />
        <CharacterRaceForm />
      </div>
      <CharacterData />
    </main>
  )
}

type CharacterRaceFormValues = {
  race: keyof typeof races
}

export function CharacterRaceForm() {
  const race = useCharacterStore((state) => state.race)
  const setRace = useCharacterStore((state) => state.setRace)
  const { handleSubmit, register } = useForm<CharacterRaceFormValues>({
    mode: "onSubmit",
    defaultValues: {
      race,
    },
  })

  function onSubmit(data: CharacterRaceFormValues) {
    setRace(data.race)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="race" className="mb-1 inline-block font-medium">
          Race
        </label>
        {Object.entries(races).map(([race, name]) => (
          <div key={race}>
            <input id={race} type="radio" value={race} {...register("race")} />{" "}
            <label htmlFor={race}>{name}</label>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 rounded border border-black bg-gray-200 px-1"
        >
          Save
        </button>
      </div>
    </form>
  )
}

type CharacterNameFormValues = {
  name: string
}

export function CharacterNameForm() {
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
  const race = useCharacterStore((state) => state.race)

  return (
    <div className="flex flex-col gap-2">
      <div>
        <span>Name</span>
        <h2 className="text-2xl font-medium">{name}</h2>
      </div>
      {race && (
        <div>
          <span>Race</span>
          <h2 className="text-2xl font-medium">{races[race]}</h2>
        </div>
      )}
    </div>
  )
}
