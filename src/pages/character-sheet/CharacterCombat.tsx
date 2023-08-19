import { useState } from "react"
import { useCharacter } from "../../stores/character"
import { useForm } from "react-hook-form"
import { Button, LinkButton } from "../../components/Button"
import { Input } from "../../components/Input"
import { cn } from "../../utils/tailwind"
import { api } from "../../api"
import { List } from "../../components/List"
import { mod } from "../../utils/string"
import React from "react"

type HitPointForm = {
  current: number
  max: number
}

// TODO: update to `src/pages/character-sheet/CharacterSummary/index.tsx` and
// move all subcomponents into directory
export function CharacterCombat() {
  const initiative = useCharacter((s) => s.initiative)
  const speed = useCharacter((s) => s.speed)
  const armorClass = useCharacter((s) => s.armorClass)
  const maxHitPoints = useCharacter((s) => s.maxHitPoints)

  return (
    <React.Fragment>
      <section className="flex gap-2">
        <div className="flex flex-1 flex-col items-center justify-between gap-2 rounded border border-black px-2 py-3">
          <code>{armorClass}</code>
          <span className="text-center text-xs uppercase">Armor Class</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-between gap-2 rounded border border-black px-2 py-3">
          <code>{mod(initiative)}</code>
          <span className="text-center text-xs uppercase">Initiative</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-between gap-2 rounded border border-black px-2 py-3">
          <code>{speed} feet</code>
          <span className="text-center text-xs uppercase">Speed</span>
        </div>
      </section>
      {maxHitPoints > 0 && <HitPoints />}
      <WeaponAttacks />
    </React.Fragment>
  )
}

function HitPoints() {
  const [edit, setEdit] = useState(false)
  const currentHitPoints = useCharacter((s) => s.currentHitPoints)
  const maxHitPoints = useCharacter((s) => s.maxHitPoints)
  const setCurrentHitPoints = useCharacter((s) => s.setCurrentHitPoints)

  const { handleSubmit, register, watch, setValue } = useForm<HitPointForm>({
    defaultValues: {
      current: currentHitPoints,
      max: maxHitPoints,
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
    <div>
      {!edit ? (
        <div>
          <h2 className="font-bold">Hit Points</h2>
          <div className="flex items-center gap-1">
            <code
              className={cn(
                currentHitPoints === 0 && "text-red-500",
                currentHitPoints > maxHitPoints && "text-green-500",
              )}
            >
              {currentHitPoints}/{maxHitPoints}
            </code>
            <Button className="text-xs" onClick={() => setEdit(true)}>
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex items-end gap-2">
              <Input
                label="Hit Points"
                required
                readOnly
                {...register("current")}
              />
              <strong className="mb-[1px]">/ {maxHitPoints}</strong>
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
    </div>
  )
}

// TODO: move calculations to character store
function WeaponAttacks() {
  const classId = useCharacter((s) => s.classId)
  const abilityScores = useCharacter((s) => s.abilityScores)
  const proficiencyBonus = useCharacter((s) => s.proficiencyBonus)

  if (!classId) return null

  const grid = {
    display: "grid",
    gridTemplateColumns: "3fr 2fr 3fr",
  }

  return (
    <section>
      <h2 className="mb-1 font-bold">Attacks</h2>
      <p style={grid} className="mb-1 text-xs uppercase">
        <span>Name</span>
        <span>Atk Bonus</span>
        <span>Damage/Type</span>
      </p>
      <ul>
        {api.classes[classId].startingEquipment.weapons.map((weaponId) => {
          const weapon = api.weaponData[weaponId]
          const abilityModifier =
            abilityScores[weapon.type === "melee" ? "strength" : "dexterity"]
              .modifier
          const proficient =
            api.classes[classId].proficiencies.weapons.includes(weaponId) ||
            api.classes[classId].proficiencies.weaponCategories.includes(
              weapon.category,
            )
          const modifier = abilityModifier + (proficient ? proficiencyBonus : 0)

          return (
            <List key={`${classId}-${weaponId}`}>
              <div style={grid}>
                <span>{api.weapons[weaponId]}</span>
                <span>{mod(modifier)}</span>
                <span>
                  <code>
                    {weapon.roll.count}d{weapon.roll.die}
                    {mod(abilityModifier)}
                  </code>{" "}
                  <span className="text-sm">{weapon.damageType}</span>
                </span>
              </div>
            </List>
          )
        })}
      </ul>
    </section>
  )
}
