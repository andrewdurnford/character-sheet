import { useState } from "react"
import { useCharacterStore } from "../useCharacterStore"
import { races } from "../utils/races"
import { classes } from "../utils/classes"
import { CharacterClassForm } from "../forms/CharacterClassForm"
import { CharacterRaceForm } from "../forms/CharacterRaceForm"
import { CharacterNameForm } from "../forms/CharacterNameForm"
import { abilities, skills } from "../utils/abilities"
import { Button } from "../components/Button"

export function Character() {
  const [tab, setTab] = useState<"name" | "race" | "class" | null>(null)

  const name = useCharacterStore((state) => state.name)
  const raceId = useCharacterStore((state) => state.raceId)
  const classId = useCharacterStore((state) => state.classId)

  const raceName = raceId ? races[raceId].name : null
  const className = classId ? classes[classId] : null

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
            <CharacterTab
              label="Name"
              value={name}
              onCancel={() => setTab("name")}
            />
            <CharacterTab
              label="Race"
              value={raceName}
              onCancel={() => setTab("race")}
            />
            <CharacterTab
              label="Class"
              value={className}
              onCancel={() => setTab("class")}
            />
          </div>
        )}
      </div>
      <div>
        <CharacterAbilities />
        <CharacterSkills />
      </div>
    </div>
  )
}

interface CharacterTabProps {
  label: string
  value: string | null
  onCancel: () => void
}

function CharacterTab({ label: name, value, onCancel }: CharacterTabProps) {
  return (
    <div>
      <span>{name}</span>{" "}
      <Button type="button" onClick={() => onCancel()}>
        Edit
      </Button>
      {value && <h2 className="text-2xl font-medium">{value}</h2>}
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

function CharacterSkills() {
  const abilityChecks = useCharacterStore((state) => state.abilityChecks)

  return (
    <div className="mt-4">
      <h2>Skills</h2>
      <ul>
        {Object.entries(abilityChecks()).map(([skillId, { modifier }]) => (
          <li key={skillId}>
            <div className="flex justify-between gap-4">
              <span>{skills[skillId as keyof typeof skills].name}</span>
              <span>
                {modifier >= 0 && "+"}
                {modifier}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
