import { useState } from "react"
import { useCharacter } from "../../stores/character"
import { useForm } from "react-hook-form"
import { Button, LinkButton } from "../../components/Button"
import { Input } from "../../components/Input"
import { cn } from "../../utils/tailwind"
import { api } from "../../api"
import { List } from "../../components/List"
import { mod } from "../../api/utils"

type HitPointForm = {
  current: number
  max: number
}

export function CharacterCombat() {
  // TODO: proficiency should be in stats sections
  const proficiencyBonus = useCharacter((s) => s.proficiencyBonus)
  const initiative = useCharacter((s) => s.initiative)
  const speed = useCharacter((s) => s.speed)
  const armorClass = useCharacter((s) => s.armorClass)
  const maxHitPoints = useCharacter((s) => s.maxHitPoints)

  return (
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
      <div>
        Armor Class: <strong>{armorClass()}</strong>
      </div>
      {maxHitPoints() > 0 && <HitPoints />}
      <WeaponAttacks />
    </section>
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
    <div>
      <div></div>
      {!edit ? (
        <div>
          Hit Points:{" "}
          <strong
            className={cn(
              currentHitPoints === 0 && "text-red-500",
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
    </div>
  )
}

// TODO: move calculations to character store
function WeaponAttacks() {
  const classId = useCharacter((s) => s.classId)
  const abilityScores = useCharacter((s) => s.abilityScores)
  const proficiencyBonus = useCharacter((s) => s.proficiencyBonus)

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
