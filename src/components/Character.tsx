import { useState } from "react"
import { useCharacterStore } from "../useCharacterStore"
import { races } from "../utils/races"
import { classes } from "../utils/classes"
import { CharacterClassForm } from "../forms/CharacterClassForm"
import { CharacterRaceForm } from "../forms/CharacterRaceForm"
import { CharacterNameForm } from "../forms/CharacterNameForm"
import { abilities } from "../utils/abilities"

export function Character() {
  const [tab, setTab] = useState<"name" | "race" | "class" | null>(null)

  const name = useCharacterStore((state) => state.name)
  const raceId = useCharacterStore((state) => state.raceId)
  const classId = useCharacterStore((state) => state.classId)

  return (
    <div className="flex justify-between">
      <div>
        {tab === "name" && <CharacterNameForm onCancel={() => setTab(null)} />}
        {tab === "race" && <CharacterRaceForm onCancel={() => setTab(null)} />}
        {tab === "class" && (
          <CharacterClassForm onCancel={() => setTab(null)} />
        )}
        {!tab && (
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
              {raceId && (
                <h2 className="text-2xl font-medium">{races[raceId].name}</h2>
              )}
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
        )}
      </div>
      <CharacterAbilities />
    </div>
  )
}

function CharacterAbilities() {
  const abilityScores = useCharacterStore((state) => state.abilityScores)

  return (
    <div>
      <h2>Abilities</h2>
      <ul>
        {Object.entries(abilityScores()).map(
          ([abilityId, { score, modifier }]) => (
            <li key={abilityId} className="ml-4 list-disc">
              <span className="font-medium uppercase">
                {abilities[abilityId as keyof typeof abilities].substr(0, 3)}
              </span>{" "}
              {score} ({modifier >= 0 && "+"}
              {modifier})
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
