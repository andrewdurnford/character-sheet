import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { getMaxHitPoints, getProficiencyBonus } from "../../utils/core"
import { Button, LinkButton } from "../../components/Button"
import { Checklist, RadioGroup, Select } from "../../components/Input"
import { useEffect } from "react"
import {
  CharacterClassSchema,
  characterClassSchema,
} from "../../lib/characterClassSchema"
import { api } from "../../api"
import { List } from "../../components/List"
import { titleCase } from "../../utils/string"
import { Divider } from "../../components/Divider"
import React from "react"

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacter((s) => s.classId)
  const level = useCharacter((s) => s.level)
  const skillProficiencyChoices = useCharacter((s) => s.skillProficiencyChoices)
  const setClass = useCharacter((s) => s.setClass)
  const abilityScores = useCharacter((s) => s.abilityScores)
  const setCurrentHitPoints = useCharacter((s) => s.setCurrentHitPoints)

  const methods = useForm<CharacterClassSchema>({
    mode: "onSubmit",
    defaultValues: {
      classId,
      level,
      skillProficiencyChoices,
      select: 0,
    },
    resolver: zodResolver(characterClassSchema),
  })

  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods

  const formId = watch("classId")

  // Clear choices if class is changed
  useEffect(() => {
    if (classId !== formId) {
      setValue("skillProficiencyChoices", [])
    }
  }, [classId, formId, setValue])

  function onSubmit(data: CharacterClassSchema) {
    setClass(data.classId, data.level, data.skillProficiencyChoices)

    // set current hit points to max when class changes
    if (classId !== data.classId) {
      setCurrentHitPoints(
        getMaxHitPoints(
          data.classId,
          data.level,
          abilityScores.constitution.modifier,
        ),
      )
    }
    onCancel()
  }

  return (
    <FormProvider {...methods}>
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
          <LevelDetails />
          <RadioGroup
            label="Class"
            options={api._classIds.map((classId) => {
              const { name } = api.classes[classId]
              return {
                label: name,
                value: classId,
              }
            })}
            error={errors?.classId?.message}
            required
            {...register("classId")}
          />
          <ClassHitPoints />
          <ClassProficiencies />
          <ClassStartingEquipment />
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <LinkButton onClick={onCancel}>Cancel</LinkButton>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

function LevelDetails() {
  const { watch } = useFormContext<CharacterClassSchema>()
  const level = watch("level")
  if (!level) return null

  return (
    <section>
      <strong>Proficiency Bonus:</strong>{" "}
      <code>+{getProficiencyBonus(level)}</code>
    </section>
  )
}

function ClassHitPoints() {
  const { watch } = useFormContext<CharacterClassSchema>()
  const classId = watch("classId")
  if (!classId) return null

  return (
    <section>
      <strong>Hit Dice:</strong> <code>1d{api.classes[classId].hitDice}</code>
    </section>
  )
}

function ClassProficiencies() {
  const { watch } = useFormContext<CharacterClassSchema>()
  const classId = watch("classId")
  if (!classId) return null

  return (
    <React.Fragment>
      <Divider />
      <section className="flex flex-col gap-2">
        <h2 className="font-bold">Proficiencies</h2>
        <ClassArmorProficiencies />
        <ClassSavingThrowProficiencies />
        <ClassWeaponProficiencies />
        <ClassSkillProficiencies />
      </section>
    </React.Fragment>
  )
}

function ClassArmorProficiencies() {
  const { watch } = useFormContext<CharacterClassSchema>()
  const classId = watch("classId")
  if (!classId) return null

  const { armor, shield } = api.classes[classId].proficiencies

  return (
    <section>
      <h3 className="font-bold">Armor</h3>
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

function ClassWeaponProficiencies() {
  const { watch } = useFormContext<CharacterClassSchema>()
  const classId = watch("classId")
  if (!classId) return null

  const { weapons, weaponCategories } = api.classes[classId].proficiencies

  return (
    <section>
      <h3 className="font-bold">Weapons</h3>
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

function ClassSavingThrowProficiencies() {
  const { watch } = useFormContext<CharacterClassSchema>()
  const classId = watch("classId")
  if (!classId) return null

  return (
    <section>
      <h3 className="font-bold">Saving Throws</h3>
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

function ClassSkillProficiencies() {
  const background = useCharacter((s) => s.background)
  const backgroundSkills = useCharacter(
    (s) => s.backgroundSkillProficiencyChoices,
  )

  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = useFormContext<CharacterClassSchema>()

  const classId = watch("classId")

  // Update value of select when changing class
  useEffect(() => {
    if (classId) {
      setValue("select", api.classes[classId].proficiencies.skills.select ?? 0)
    }
  }, [classId, setValue])

  if (!classId) return null

  const choices = watch("skillProficiencyChoices")
  const { select, filter } = api.classes[classId].proficiencies.skills

  return (
    <section>
      <Checklist
        required
        label="Skills"
        select={select}
        selectCount={choices?.length}
        options={filter.map((skillId) => {
          const backgroundIncludesSkill =
            !!background && !!backgroundSkills?.includes(skillId)
              ? `background: ${background}`
              : undefined
          const selectedMax =
            choices && choices.length >= select && !choices.includes(skillId)

          return {
            value: skillId,
            label: api.skills[skillId].name,
            subLabel: backgroundIncludesSkill,
            disabled: selectedMax || !!backgroundIncludesSkill,
          }
        })}
        error={errors.skillProficiencyChoices?.message}
        {...register("skillProficiencyChoices")}
      />
    </section>
  )
}

// TODO: add equipment choices
function ClassStartingEquipment() {
  return (
    <React.Fragment>
      <Divider />
      <ClassStartingWeapons />
    </React.Fragment>
  )
}

export function ClassStartingWeapons() {
  const { watch } = useFormContext<CharacterClassSchema>()
  const classId = watch("classId")
  if (!classId) return null

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
