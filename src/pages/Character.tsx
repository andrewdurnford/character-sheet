import { useState } from "react"
import { useCharacter } from "../stores/character"
import { CharacterClassForm } from "../forms/CharacterClassForm"
import { CharacterRaceForm } from "../forms/CharacterRaceForm"
import { CharacterNameForm } from "../forms/CharacterNameForm"
import { CharacterBackgroundForm } from "../forms/CharacterBackground"
import { CharacterAbilityScoreForm } from "../forms/CharacterAbilityScoreForm"
import { Button, LinkButton } from "../components/Button"
import { cn } from "../utils/tailwind"
import { Ability, Skill, api } from "../api"
import { mod } from "../api/utils"
import { Input } from "../components/Input"
import { useForm } from "react-hook-form"
import { List } from "../components/List"

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
  const initiative = useCharacter((state) => state.initiative)
  const speed = useCharacter((state) => state.speed)

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
        <section>
          <div>
            Proficiency Bonus: <strong>+{proficiencyBonus()}</strong>
          </div>
          <div>
            Initiative: <strong>{mod(initiative())}</strong>
          </div>
          {speed() > 0 && (
            <div>
              Speed: <strong>{speed()}</strong> feet
            </div>
          )}
        </section>
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
            <List key={abilityId}>
              <div className="flex justify-between gap-4">
                <span>{api.abilities[abilityId as Ability]}</span>
                <div className="flex gap-2">
                  {score} ({modifier >= 0 && "+"}
                  {modifier})
                </div>
              </div>
            </List>
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
            <List
              key={abilityId}
              className={cn(proficient && "font-semibold")}
              style={proficient ? "disc" : "circle"}
            >
              <div className="flex justify-between gap-4">
                {api.abilities[abilityId as Ability]}
                <span>
                  ({modifier >= 0 && "+"}
                  {modifier})
                </span>
              </div>
            </List>
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
            <List
              key={skillId}
              className={cn(proficient && "font-semibold")}
              style={proficient ? "disc" : "circle"}
            >
              <div className="flex justify-between gap-4">
                <span>{api.skills[skillId as Skill].name}</span>
                <span>
                  {modifier >= 0 && "+"}
                  {modifier}
                </span>
              </div>
            </List>
          ),
        )}
      </ul>
    </div>
  )
}

type HitPointForm = {
  current: number
  max: number
}

function CharacterCombat() {
  const armorClass = useCharacter((s) => s.armorClass)
  const currentHitPoints = useCharacter((s) => s.currentHitPoints)
  const maxHitPoints = useCharacter((s) => s.maxHitPoints)
  const setCurrentHitPoints = useCharacter((s) => s.setCurrentHitPoints)
  const [edit, setEdit] = useState(false)

  const { handleSubmit, register, watch, setValue } = useForm<HitPointForm>({
    defaultValues: {
      current: currentHitPoints,
      max: maxHitPoints(),
    },
  })

  const current = watch("current")

  const increment = () => setValue("current", current + 1)
  const decrement = () => setValue("current", current - 1)

  function onSubmit(data: HitPointForm) {
    setCurrentHitPoints(data.current)
    setEdit(false)
  }

  return (
    <section>
      <div>
        Armor Class: <strong>{armorClass()}</strong>
      </div>
      {!edit ? (
        <div>
          Hit Points:{" "}
          <strong
            className={cn(
              currentHitPoints === 0 && "text-red-400",
              currentHitPoints > maxHitPoints() && "text-green-400",
            )}
          >
            {currentHitPoints} / {maxHitPoints()}
          </strong>{" "}
          <LinkButton className="inline-block" onClick={() => setEdit(true)}>
            Edit
          </LinkButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex items-end gap-2">
              <Input label="Hit Points" readOnly {...register("current")} />
              <strong className="mb-[1px]">/ {maxHitPoints()}</strong>
            </div>
            <div className="mt-2 flex gap-1">
              <Button type="button" onClick={increment}>
                +
              </Button>
              <Button
                type="button"
                onClick={decrement}
                disabled={current === 0}
              >
                -
              </Button>
              <Button type="submit">Confirm</Button>
              <LinkButton
                onClick={() => setEdit(false)}
                className="inline-block"
              >
                Cancel
              </LinkButton>
            </div>
          </div>
        </form>
      )}
      <WeaponAttacks />
    </section>
  )
}

// TODO: move calculations to character store
function WeaponAttacks() {
  const classId = useCharacter((state) => state.classId)
  const abilityScores = useCharacter((state) => state.abilityScores)
  const proficiencyBonus = useCharacter((state) => state.proficiencyBonus)

  if (!classId) return null

  return (
    <section>
      <h2 className="my-2 font-medium">Attacks</h2>
      <ul>
        {api.classes[classId].startingEquipment.weapons.map((weaponId) => {
          const weapon = api.weaponData[weaponId]
          const abilityModifier =
            abilityScores()[weapon.type === "melee" ? "strength" : "dexterity"]
              .modifier
          const proficient =
            api.classes[classId].proficiencies.weapons.includes(weaponId) ||
            api.classes[classId].proficiencies.weaponCategories.includes(
              weapon.category,
            )
          const modifier =
            abilityModifier + (proficient ? proficiencyBonus() : 0)

          return (
            <List key={`${classId}-${weaponId}`} style="disc">
              {api.weapons[weaponId]}, {mod(modifier)}, {weapon.roll.count}d
              {weapon.roll.die} {mod(abilityModifier)} {weapon.damageType}
            </List>
          )
        })}
      </ul>
    </section>
  )
}
