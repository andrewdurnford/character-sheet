import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { proficiencyBonus, useCharacterStore } from "../useCharacterStore"
import {
  classSavingThrowProficiencies,
  classSkillProficiencyChoices,
  classStartingEquipment,
  classWeaponProficiencies,
  classes,
} from "../api/classes"
import { Button, LinkButton } from "../components/Button"
import { Checkbox, Error, RadioGroup, Select } from "../components/Input"
import { abilities, skills } from "../api/abilities"
import { useEffect } from "react"
import { CharacterClassSchema, characterClassSchema } from "../lib/types"
import React from "react"
import { weapons } from "../api/weapons"

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacterStore((state) => state.classId)
  const level = useCharacterStore((state) => state.level)
  const skillProficiencyChoices = useCharacterStore(
    (state) => state.skillProficiencyChoices,
  )
  const background = useCharacterStore((state) => state.background)
  const backgroundSkillProficiencyChoices = useCharacterStore(
    (state) => state.backgroundSkillProficiencyChoices,
  )
  const setClass = useCharacterStore((state) => state.setClass)
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
      setValue("skillProficiencyChoices", undefined)
    }
  }, [selectedId, classId, setValue])

  const { select, filter } =
    classSkillProficiencyChoices.find((x) => x.classId === selectedId) || {}

  useEffect(() => {
    setValue("select", select ?? 0)
  }, [select, setValue])

  function onSubmit(data: CharacterClassSchema) {
    setClass(data.classId, data.level, data.skillProficiencyChoices)
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
          options={Object.entries(classes).map(([classId, name]) => ({
            label: name,
            value: classId,
          }))}
          error={errors?.classId?.message}
          required
          {...register("classId")}
        />
        {selectedId && (
          <React.Fragment>
            <ClassStartingWeapons classId={selectedId} />
            <section>
              <h2 className="mb-2 font-medium">Proficiencies</h2>
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
                            skillId as keyof typeof skills,
                          )
                        const selectedMax =
                          selectedSkillIds &&
                          selectedSkillIds.length >= select &&
                          !selectedSkillIds?.includes(skillId)
                        return (
                          <Checkbox
                            key={`${selectedId}-${skillId}`}
                            value={skillId}
                            label={skills[skillId].name}
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
  classId: keyof typeof classes
}

export function ClassStartingWeapons({ classId }: ClassProps) {
  return (
    <section>
      <h2 className="mb-2 font-medium">Equipment</h2>
      <ul>
        {classStartingEquipment
          .filter((x) => x.classId === classId)
          .map(({ count, weaponId }) => (
            <li key={`${classId}-${weaponId}`} className="ml-4 list-disc">
              {weapons[weaponId]} {count && `x${count}`}
            </li>
          ))}
      </ul>
    </section>
  )
}

function ClassSavingThrowProficiencies({ classId }: ClassProps) {
  return (
    <section>
      <h3 className="italic">Saving Throws</h3>
      <ul>
        {classSavingThrowProficiencies
          .filter((x) => x.classId === classId)
          .map(({ abilityId }) => (
            <li
              key={`class-saving-throw-${abilityId}-proficiency`}
              className="ml-4 list-disc"
            >
              {abilities[abilityId]}
            </li>
          ))}
      </ul>
    </section>
  )
}

function ClassWeaponProficiencies({ classId }: ClassProps) {
  return (
    <section>
      <h3 className="italic">Weapons</h3>
      <ul>
        {classWeaponProficiencies
          .find((x) => x.classId === classId)
          ?.weapons.map((weaponId) => (
            <li
              key={`class-weapon-${weaponId}-proficiency`}
              className="ml-4 list-disc"
            >
              {weapons[weaponId]}
            </li>
          ))}
      </ul>
    </section>
  )
}
