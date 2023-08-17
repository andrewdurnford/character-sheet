import { useState } from "react"
import { CharacterAbilityScoreForm } from "./CharacterAbilityScoreForm"
import { CharacterBackgroundForm } from "./CharacterBackgroundForm"
import { CharacterClassForm } from "./CharacterClassForm"
import { CharacterNameForm } from "./CharacterNameForm"
import { CharacterRaceForm } from "./CharacterRaceForm"
import { Button } from "../../components/Button"
import { useCharacter } from "../../stores/character"
import { api } from "../../api"

export function CharacterForm() {
  const [tab, setTab] = useState<
    "name" | "race" | "class" | "background" | "abilities" | null
  >(null)

  const raceId = useCharacter((s) => s.raceId)
  const classId = useCharacter((s) => s.classId)
  const level = useCharacter((s) => s.level)

  const name = useCharacter((s) => s.name) ?? null
  const raceName = raceId ? api.races[raceId].name : null
  const className = classId ? `${api.classes[classId].name} (${level})` : null
  const backgroundName = useCharacter((s) => s.background) ?? null
  const abilitiesName = useCharacter((s) => s.abilityScoreChoices)
    ? "(Point Buy)"
    : null

  const closeTab = () => setTab(null)

  if (tab === "name") {
    return <CharacterNameForm onCancel={closeTab} />
  }
  if (tab === "race") {
    return <CharacterRaceForm onCancel={closeTab} />
  }
  if (tab === "class") {
    return <CharacterClassForm onCancel={closeTab} />
  }
  if (tab === "background") {
    return <CharacterBackgroundForm onCancel={closeTab} />
  }
  if (tab === "abilities") {
    return <CharacterAbilityScoreForm onCancel={closeTab} />
  }

  return (
    <div className="flex flex-col gap-4">
      <CharacterTab label="Name" value={name} onCancel={() => setTab("name")} />
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
      <CharacterTab
        label="Background"
        value={backgroundName}
        onCancel={() => setTab("background")}
      />
      <CharacterTab
        label="Ability Scores"
        value={abilitiesName}
        onCancel={() => setTab("abilities")}
      />
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
    <div className="flex items-center gap-1">
      <span aria-hidden="true">{value ? "✅" : "❌"}</span>
      <span>{name}:</span>
      {value && <strong>{value}</strong>}
      <Button onClick={onCancel} className="text-xs">
        Edit
      </Button>
    </div>
  )
}
