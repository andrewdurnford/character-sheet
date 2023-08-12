import { useState } from "react"
import { useCharacter } from "../stores/character"
import { CharacterClassForm } from "../forms/CharacterClassForm"
import { CharacterRaceForm } from "../forms/CharacterRaceForm"
import { CharacterNameForm } from "../forms/CharacterNameForm"
import { CharacterBackgroundForm } from "../forms/CharacterBackground"
import { CharacterAbilityScoreForm } from "../forms/CharacterAbilityScoreForm"
import { LinkButton } from "../components/Button"
import { cn } from "../utils/tailwind"
import { Ability, Skill, api } from "../api"
import { mod } from "../api/utils"

export function Character() {
  const [tab, setTab] = useState<
    "name" | "race" | "class" | "background" | "abilities" | null
  >(null)
  const name = useCharacter((state) => state.name)
  const raceId = useCharacter((state) => state.raceId)
  const classId = useCharacter((state) => state.classId)
  const level = useCharacter((state) => state.level)
  const background = useCharacter((state) => state.background)
  const proficiencyBonus = useCharacter((state) => state.proficiencyBonus)

  const raceName = raceId ? api.races[raceId].name : null
  const className = classId ? `${api.classes[classId].name} (${level})` : null

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
        <CharacterCombat />
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
  const abilityScores = useCharacter((state) => state.abilityScores)

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
                <span>{api.abilities[abilityId as Ability]}</span>
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
  const savingThrows = useCharacter((state) => state.savingThrows)

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
                {api.abilities[abilityId as Ability]}
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
  const abilityChecks = useCharacter((state) => state.abilityChecks)

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
                <span>{api.skills[skillId as Skill].name}</span>
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

function CharacterCombat() {
  const armorClass = useCharacter((s) => s.armorClass)
  const maxHitPoints = useCharacter((s) => s.maxHitPoints)

  return (
    <section>
      <div>
        Armor Class: <strong>{armorClass()}</strong>
      </div>
      <div>
        Max Hit Points: <strong>{maxHitPoints()}</strong>
      </div>
      <WeaponAttacks />
    </section>
  )
}

// TODO: move calculations to character store
function WeaponAttacks() {
  const classId = useCharacter((state) => state.classId)
  const proficiencyBonus = useCharacter((state) => state.proficiencyBonus)
  const abilityScores = useCharacter((state) => state.abilityScores)

  if (!classId) return null

  return (
    <section>
      <h2 className="my-2 font-medium">Attacks</h2>
      <ul>
        {api.classStartingEquipment
          .filter((x) => x.classId === classId)
          .map(({ weaponId }) => {
            const weapon = api.weaponData[weaponId]
            const abilityModifier =
              abilityScores()[
                weapon.type === "melee" ? "strength" : "dexterity"
              ].modifier
            const proficient = api.classWeaponProficiencies.some(
              (x) => x.classId === classId && x.weapons.includes(weaponId),
            )
            const modifier =
              abilityModifier + (proficient ? proficiencyBonus() : 0)

            return (
              <li key={`${classId}-${weaponId}`} className="ml-4 list-disc">
                {api.weapons[weaponId]}, {mod(modifier)}, {weapon.roll.count}d
                {weapon.roll.die} {mod(abilityModifier)} {weapon.damageType}
              </li>
            )
          })}
      </ul>
    </section>
  )
}
