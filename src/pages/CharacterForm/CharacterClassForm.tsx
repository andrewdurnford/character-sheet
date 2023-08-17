import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { getMaxHitPoints, getProficiencyBonus } from "../../utils/core"
import { Button, LinkButton } from "../../components/Button"
import { Checkbox, Error, RadioGroup, Select } from "../../components/Input"
import { useEffect } from "react"
import React from "react"
import {
  CharacterClassSchema,
  characterClassSchema,
} from "../../lib/characterClassSchema"
import { Class, Skill, api } from "../../api"
import { List } from "../../components/List"
import { titleCase } from "../../utils/string"

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacter((s) => s.classId)
  const level = useCharacter((s) => s.level)
  const skillProficiencyChoices = useCharacter((s) => s.skillProficiencyChoices)
  const background = useCharacter((s) => s.background)
  const backgroundSkillProficiencyChoices = useCharacter(
    (s) => s.backgroundSkillProficiencyChoices,
  )
  const setClass = useCharacter((s) => s.setClass)
  const abilityScores = useCharacter((s) => s.abilityScores)
  const setCurrentHitPoints = useCharacter((s) => s.setCurrentHitPoints)

  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CharacterClassSchema>({
    mode: "onSubmit",
    defaultValues: {
      classId,
      level,
      skillProficiencyChoices,
      select: 0,
    },
    resolver: zodResolver(characterClassSchema),
  })
  const selectedId = watch("classId")
  const selectedSkillIds = watch("skillProficiencyChoices")

  // Clear choices if class is changed
  useEffect(() => {
    if (selectedId !== classId) {
      setValue("skillProficiencyChoices", [])
    }
  }, [selectedId, classId, setValue])

  const { select, filter } = api.classes[selectedId]?.proficiencies.skills || {}

  useEffect(() => {
    setValue("select", select ?? 0)
  }, [select, setValue])

  function onSubmit(data: CharacterClassSchema) {
    setClass(data.classId, data.level, data.skillProficiencyChoices)

    // set current hit points to max when class changes
    if (classId !== data.classId) {
      setCurrentHitPoints(
        getMaxHitPoints(
          data.classId,
          data.level,
          abilityScores().constitution.modifier,
        ),
      )
    }
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <Select
          label="Level"
          error={errors.level?.message}
          {...register("level", { valueAsNumber: true })}
          required
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
        <div className="mb-[-0.5rem]">
          Proficiency Bonus:{" "}
          <strong>+{getProficiencyBonus(watch("level"))}</strong>
        </div>
        <RadioGroup
          label="Class"
          options={Object.entries(api.classes).map(([classId, { name }]) => ({
            label: name,
            value: classId,
          }))}
          error={errors?.classId?.message}
          required
          {...register("classId")}
        />
        {selectedId && (
          <React.Fragment>
            <section className="mb-[-0.5rem]">
              Hit Dice: <code>1d{api.classes[selectedId].hitDice}</code>
            </section>
            <ClassStartingWeapons classId={selectedId} />
            <section>
              <h2 className="mb-2 font-bold">Proficiencies</h2>
              <ClassArmorProficiencies classId={selectedId} />
              <ClassSavingThrowProficiencies classId={selectedId} />
              <ClassWeaponProficiencies classId={selectedId} />
              {select && (
                <section>
                  <div className="mb-1 mt-2 flex items-center gap-1">
                    <h3 className="font-bold">
                      Skills<span aria-hidden>*</span>
                    </h3>
                    <span className="text-sm">(Choose {select})</span>
                  </div>
                  <Error
                    error={errors.skillProficiencyChoices?.message}
                    className="mb-1"
                  />
                  {filter && (
                    <ul>
                      {filter.map((skillId) => {
                        const backgroundIncludesSkill =
                          !!background &&
                          !!backgroundSkillProficiencyChoices?.includes(
                            skillId as Skill,
                          )
                        const selectedMax =
                          selectedSkillIds &&
                          selectedSkillIds.length >= select &&
                          !selectedSkillIds.includes(skillId)
                        return (
                          <Checkbox
                            key={`${selectedId}-${skillId}`}
                            value={skillId}
                            label={api.skills[skillId].name}
                            subLabel={
                              backgroundIncludesSkill
                                ? `background: ${background}`
                                : undefined
                            }
                            disabled={selectedMax || backgroundIncludesSkill}
                            {...register("skillProficiencyChoices")}
                          />
                        )
                      })}
                    </ul>
                  )}
                </section>
              )}
            </section>
          </React.Fragment>
        )}
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <LinkButton onClick={onCancel}>Cancel</LinkButton>
        </div>
      </div>
    </form>
  )
}

type ClassProps = {
  classId: Class
}

export function ClassStartingWeapons({ classId }: ClassProps) {
  const { armorId, shield } = api.classes[classId].startingEquipment

  return (
    <section>
      <h2 className="mb-2 font-bold">Starting Equipment</h2>
      <ul>
        {api.classes[classId].startingEquipment.weapons.map((weaponId) => (
          <List key={`${classId}-${weaponId}`} style="disc">
            {api.weapons[weaponId]} {/* {count && `x${count}`} */}
          </List>
        ))}
        {armorId && <List style="disc">{api.armor[armorId].name} armor</List>}
        {shield && <List style="disc">Shield</List>}
      </ul>
    </section>
  )
}

function ClassSavingThrowProficiencies({ classId }: ClassProps) {
  return (
    <section>
      <h3 className="font-bold italic">Saving Throws</h3>
      <ul>
        {api.classes[classId].proficiencies.savingThrows.map((abilityId) => (
          <List
            key={`class-saving-throw-${abilityId}-proficiency`}
            style="disc"
          >
            {api.abilities[abilityId]}
          </List>
        ))}
      </ul>
    </section>
  )
}

function ClassWeaponProficiencies({ classId }: ClassProps) {
  const { weapons, weaponCategories } = api.classes[classId].proficiencies

  return (
    <section>
      <h3 className="font-bold italic">Weapons</h3>
      <ul>
        {weapons &&
          weapons.length > 0 &&
          weapons.map((weaponId) => (
            <List key={`class-weapon-${weaponId}-proficiency`} style="disc">
              {api.weapons[weaponId]}
            </List>
          ))}
        {weaponCategories.length > 0 &&
          weaponCategories.map((weaponCategory) => (
            <List
              key={`class-weapon-category-${weaponCategory}-proficiency`}
              className="italic"
              style="disc"
            >
              {titleCase(weaponCategory)} weapons
            </List>
          ))}
      </ul>
    </section>
  )
}

function ClassArmorProficiencies({ classId }: ClassProps) {
  const { armor, shield } = api.classes[classId].proficiencies

  return (
    <section>
      <h3 className="font-bold italic">Armor</h3>
      <ul>
        {armor.length > 0 &&
          armor.map((armorType) => (
            <List key={`class-armor-${armorType}-proficiency`} style="disc">
              {titleCase(armorType)} armor
            </List>
          ))}
        {shield && <List style="disc">Shields</List>}
      </ul>
    </section>
  )
}
