import { useState } from "react"
import { useCharacterStore } from "../useCharacterStore"
import { races } from "../utils/races"
import { classes } from "../utils/classes"
import { CharacterClassForm } from "../forms/CharacterClassForm"
import { CharacterRaceForm } from "../forms/CharacterRaceForm"
import { CharacterNameForm } from "../forms/CharacterNameForm"

export function Character() {
  const [tab, setTab] = useState<"name" | "race" | "class" | null>(null)

  const name = useCharacterStore((state) => state.name)
  const raceId = useCharacterStore((state) => state.raceId)
  const classId = useCharacterStore((state) => state.classId)

  if (tab === "name") {
    return <CharacterNameForm onCancel={() => setTab(null)} />
  }

  if (tab === "race") {
    return <CharacterRaceForm onCancel={() => setTab(null)} />
  }

  if (tab === "class") {
    return <CharacterClassForm onCancel={() => setTab(null)} />
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span>Name</span>{" "}
        <button
          type="button"
          onClick={() => setTab("name")}
          className="rounded border border-black bg-gray-200 px-1"
        >
          Edit
        </button>
        <h2 className="text-2xl font-medium">{name}</h2>
      </div>
      <div>
        <span>Race</span>{" "}
        <button
          type="button"
          onClick={() => setTab("race")}
          className="rounded border border-black bg-gray-200 px-1"
        >
          Edit
        </button>
        {raceId && <h2 className="text-2xl font-medium">{races[raceId]}</h2>}
      </div>
      <div>
        <span>Class</span>{" "}
        <button
          type="button"
          onClick={() => setTab("class")}
          className="rounded border border-black bg-gray-200 px-1"
        >
          Edit
        </button>
        {classId && (
          <h2 className="text-2xl font-medium">{classes[classId]}</h2>
        )}
      </div>
    </div>
  )
}
