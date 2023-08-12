import { useState } from "react"
import { useCharacterStore } from "../useCharacterStore"
import { races } from "../api/races"
import {
  classStartingEquipment,
  classWeaponProficiencies,
  classes,
} from "../api/classes"
import { CharacterClassForm } from "../forms/CharacterClassForm"
import { CharacterRaceForm } from "../forms/CharacterRaceForm"
import { CharacterNameForm } from "../forms/CharacterNameForm"
import { abilities, skills } from "../api/abilities"
import { LinkButton } from "../components/Button"
import { CharacterAbilityScoreForm } from "../forms/CharacterAbilityScoreForm"
import { cn } from "../utils"
import { CharacterBackgroundForm } from "../forms/CharacterBackground"
import { weaponData, weapons } from "../api/weapons"

export function Character() {
  const [tab, setTab] = useState<
    "name" | "race" | "class" | "background" | "abilities" | null
  >(null)

  const name = useCharacterStore((state) => state.name)
  const raceId = useCharacterStore((state) => state.raceId)
  const classId = useCharacterStore((state) => state.classId)
  const level = useCharacterStore((state) => state.level)
  const background = useCharacterStore((state) => state.background)
  const proficiencyBonus = useCharacterStore((state) => state.proficiencyBonus)

  const raceName = raceId ? races[raceId].name : null
  const className = classId ? `${classes[classId]} (${level})` : null

  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row">
      <div>
        {tab === "name" && <CharacterNameForm onCancel={() => setTab(null)} />}
        {tab === "race" && <CharacterRaceForm onCancel={() => setTab(null)} />}
        {tab === "class" && (
          <CharacterClassForm onCancel={() => setTab(null)} />
        )}
        {tab === "background" && (
          <CharacterBackgroundForm onCancel={() => setTab(null)} />
        )}
        {tab === "abilities" && (
          <CharacterAbilityScoreForm onCancel={() => setTab(null)} />
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
            <CharacterTab
              label="Background"
              value={background || null}
              onCancel={() => setTab("background")}
            />
            <CharacterTab
              label="Ability Scores"
              value={null}
              onCancel={() => setTab("abilities")}
            />
          </div>
        )}
      </div>
      <hr className="h-px border-0 bg-gray-300 sm:hidden" />
      <div className="flex flex-col gap-4">
        <div>
          Proficiency Bonus: <strong>+{proficiencyBonus()}</strong>
        </div>
        <CharacterAbilities />
        <CharacterSavingThrows />
        <CharacterSkills />
        <WeaponAttacks />
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
      <span>{name}</span>
      <div className="flex items-center gap-2">
        {value && <h2 className="text-2xl font-medium">{value}</h2>}
        <LinkButton onClick={onCancel} className="text-sm">
          Edit
        </LinkButton>
      </div>
    </div>
  )
}

function CharacterAbilities() {
  const abilityScores = useCharacterStore((state) => state.abilityScores)

  return (
    <div>
      <h2 className="font-medium">Abilities</h2>
      <ul>
        {Object.entries(abilityScores()).map(
          ([abilityId, { score, modifier }]) => (
            <li
              key={abilityId}
              className="ml-4"
              style={{
                listStyleType: "disclosure-closed",
              }}
            >
              <div className="flex justify-between gap-4">
                <span>{abilities[abilityId as keyof typeof abilities]}</span>
                <div className="flex gap-2">
                  {score} ({modifier >= 0 && "+"}
                  {modifier})
                </div>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

function CharacterSavingThrows() {
  const savingThrows = useCharacterStore((state) => state.savingThrows)

  return (
    <div>
      <h2 className="font-medium">Saving Throws</h2>
      <ul>
        {Object.entries(savingThrows()).map(
          ([abilityId, { modifier, proficient }]) => (
            <li
              key={abilityId}
              className={cn("ml-4", proficient && "font-semibold")}
              style={{ listStyleType: proficient ? "disc" : "circle" }}
            >
              <div className="flex justify-between gap-4">
                {abilities[abilityId as keyof typeof abilities]}
                <span>
                  ({modifier >= 0 && "+"}
                  {modifier})
                </span>
              </div>
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
    <div>
      <h2 className="font-medium">Skills</h2>
      <ul>
        {Object.entries(abilityChecks()).map(
          ([skillId, { modifier, proficient }]) => (
            <li
              key={skillId}
              className={cn("ml-4", proficient && "font-semibold")}
              style={{ listStyleType: proficient ? "disc" : "circle" }}
            >
              <div className="flex justify-between gap-4">
                <span>{skills[skillId as keyof typeof skills].name}</span>
                <span>
                  {modifier >= 0 && "+"}
                  {modifier}
                </span>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

// TODO: move calculations to character store
export function WeaponAttacks() {
  const classId = useCharacterStore((state) => state.classId)
  const proficiencyBonus = useCharacterStore((state) => state.proficiencyBonus)
  const abilityScores = useCharacterStore((state) => state.abilityScores)

  if (!classId) return null

  return (
    <section>
      <h2 className="mb-2 font-medium">Attacks</h2>
      <ul>
        {classStartingEquipment
          .filter((x) => x.classId === classId)
          .map(({ weaponId }) => {
            const weapon = weaponData[weaponId]
            const abilityModifier =
              abilityScores()[
                weapon.type === "melee" ? "strength" : "dexterity"
              ].modifier
            const proficient = classWeaponProficiencies.some(
              (x) => x.classId === classId && x.weapons.includes(weaponId),
            )
            const modifier =
              abilityModifier + (proficient ? proficiencyBonus() : 0)

            return (
              <li key={`${classId}-${weaponId}`} className="ml-4 list-disc">
                {weapons[weaponId]}, +{modifier}, {weapon.roll.count}d
                {weapon.roll.die} +{abilityModifier} {weapon.damageType}
              </li>
            )
          })}
      </ul>
    </section>
  )
}