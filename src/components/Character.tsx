import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import { races } from "../utils/races"
import { classes } from "../utils/classes"

export function Character() {
  return (
    <main className="flex justify-between p-4">
      <div className="flex flex-col gap-4">
        <CharacterNameForm />
        <CharacterRaceForm />
        <CharacterClassForm />
      </div>
      <CharacterData />
    </main>
  )
}

type CharacterClassFormValues = {
  classId: keyof typeof classes
}

export function CharacterClassForm() {
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="classId" className="mb-1 inline-block font-medium">
          Class
        </label>
        {Object.entries(classes).map(([classId, name]) => (
          <div key={classId}>
            <input
              id={classId}
              type="radio"
              value={classId}
              {...register("classId")}
            />{" "}
            <label htmlFor={classId}>{name}</label>
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

type CharacterRaceFormValues = {
  raceId: keyof typeof races
}

export function CharacterRaceForm() {
  const raceId = useCharacterStore((state) => state.raceId)
  const setRace = useCharacterStore((state) => state.setRace)
  const { handleSubmit, register } = useForm<CharacterRaceFormValues>({
    mode: "onSubmit",
    defaultValues: {
      raceId,
    },
  })

  function onSubmit(data: CharacterRaceFormValues) {
    setRace(data.raceId)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="raceId" className="mb-1 inline-block font-medium">
          Race
        </label>
        {Object.entries(races).map(([raceId, name]) => (
          <div key={raceId}>
            <input
              id={raceId}
              type="radio"
              value={raceId}
              {...register("raceId")}
            />{" "}
            <label htmlFor={raceId}>{name}</label>
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
  const raceId = useCharacterStore((state) => state.raceId)
  const classId = useCharacterStore((state) => state.classId)

  return (
    <div className="flex flex-col gap-2">
      <div>
        <span>Name</span>
        <h2 className="text-2xl font-medium">{name}</h2>
      </div>
      {raceId && (
        <div>
          <span>Race</span>
          <h2 className="text-2xl font-medium">{races[raceId]}</h2>
        </div>
      )}
      {classId && (
        <div>
          <span>Class</span>
          <h2 className="text-2xl font-medium">{classes[classId]}</h2>
        </div>
      )}
    </div>
  )
}
