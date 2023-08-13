import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  calculateMaxHitPoints,
  proficiencyBonus,
  useCharacter,
} from "../stores/character"
import { Button, LinkButton } from "../components/Button"
import { Checkbox, Error, RadioGroup, Select } from "../components/Input"
import { useEffect } from "react"
import React from "react"
import {
  CharacterClassSchema,
  characterClassSchema,
} from "../lib/characterClassSchema"
import { Class, Skill, api } from "../api"
import { List } from "../components/List"

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacter((state) => state.classId)
  const level = useCharacter((state) => state.level)
  const skillProficiencyChoices = useCharacter(
    (state) => state.skillProficiencyChoices,
  )
  const background = useCharacter((state) => state.background)
  const backgroundSkillProficiencyChoices = useCharacter(
    (state) => state.backgroundSkillProficiencyChoices,
  )
  const setClass = useCharacter((state) => state.setClass)
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

  const { select, filter } =
    api.classSkillProficiencyChoices.find((x) => x.classId === selectedId) || {}

  useEffect(() => {
    setValue("select", select ?? 0)
  }, [select, setValue])

  function onSubmit(data: CharacterClassSchema) {
    setClass(data.classId, data.level, data.skillProficiencyChoices)
    // set current hit points to max when class changes
    if (classId !== data.classId) {
      setCurrentHitPoints(
        calculateMaxHitPoints(
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
          <strong>+{proficiencyBonus(watch("level"))}</strong>
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
              <h2 className="mb-2 font-medium">Proficiencies</h2>
              <ClassArmorProficiencies classId={selectedId} />
              <ClassSavingThrowProficiencies classId={selectedId} />
              <ClassWeaponProficiencies classId={selectedId} />
              {select && (
                <section>
                  <div className="mb-1 mt-2 flex items-center gap-1">
                    <h3 className="font-medium">
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
  const classArmor = api.classStartingArmor.find((x) => x.classId === classId)
  const armor = !classArmor ? null : api.armor[classArmor.armorId]
  const shield = !!classArmor?.shield

  return (
    <section>
      <h2 className="mb-2 font-medium">Starting Equipment</h2>
      <ul>
        {api.classStartingEquipment
          .filter((x) => x.classId === classId)
          .map(({ count, weaponId }) => (
            <List key={`${classId}-${weaponId}`} style="disc">
              {api.weapons[weaponId]} {count && `x${count}`}
            </List>
          ))}
        {armor && <List style="disc">{armor.name} armor</List>}
        {shield && <List style="disc">Shield</List>}
      </ul>
    </section>
  )
}

function ClassSavingThrowProficiencies({ classId }: ClassProps) {
  return (
    <section>
      <h3 className="font-medium italic">Saving Throws</h3>
      <ul>
        {api.classSavingThrowProficiencies
          .filter((x) => x.classId === classId)
          .map(({ abilityId }) => (
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
  const { weapons, categories } =
    api.classWeaponProficiencies.find((x) => x.classId === classId) || {}

  return (
    <section>
      <h3 className="font-medium italic">Weapons</h3>
      <ul>
        {weapons &&
          weapons.length > 0 &&
          weapons.map((weaponId) => (
            <List key={`class-weapon-${weaponId}-proficiency`} style="disc">
              {api.weapons[weaponId]}
            </List>
          ))}
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <List
              key={`class-weapon-category-${category}-proficiency`}
              className="italic"
              style="disc"
            >
              {category.charAt(0).toUpperCase()}
              {category.substring(1)} weapons
            </List>
          ))}
      </ul>
    </section>
  )
}

function ClassArmorProficiencies({ classId }: ClassProps) {
  const { types, shield } =
    api.classArmorProficiencies.find((x) => x.classId === classId) || {}

  return (
    <section>
      <h3 className="font-medium italic">Armor</h3>
      <ul>
        {types &&
          types.length > 0 &&
          types.map((type) => (
            <List key={`class-armor-${type}-proficiency`} style="disc">
              {type.charAt(0).toUpperCase()}
              {type.substring(1)} armor
            </List>
          ))}
        {shield && <li className="ml-4 list-disc">Shields</li>}
      </ul>
    </section>
  )
}
