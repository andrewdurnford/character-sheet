import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { proficiencyBonus, useCharacterStore } from "../useCharacterStore"
import {
  classSavingThrowProficiencies,
  classSkillProficiencyChoices,
  classes,
} from "../api/classes"
import { Button, LinkButton } from "../components/Button"
import { Checkbox, Error, RadioGroup, Select } from "../components/Input"
import { abilities, skills } from "../api/abilities"
import { useEffect } from "react"
import { CharacterClassSchema, characterClassSchema } from "../lib/types"

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacterStore((state) => state.classId)
  const level = useCharacterStore((state) => state.level)
  const skillProficiencyChoices = useCharacterStore(
    (state) => state.skillProficiencyChoices,
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
          <section>
            <h2 className="mb-2 font-medium">Proficiencies</h2>
            <div>
              <h3>Saving Throws</h3>
              <ul>
                {classSavingThrowProficiencies
                  .filter((x) => x.classId === selectedId)
                  .map(({ abilityId }) => (
                    <li
                      key={`class-saving-throw-${abilityId}-proficiency`}
                      className="ml-4 list-disc"
                    >
                      {abilities[abilityId]}
                    </li>
                  ))}
              </ul>
            </div>
            {select && (
              <div>
                <div className="mb-1 mt-4 flex items-center gap-1">
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
                    {filter.map((skillId) => (
                      <Checkbox
                        key={`${selectedId}-${skillId}`}
                        value={skillId}
                        label={skills[skillId].name}
                        disabled={
                          selectedSkillIds &&
                          selectedSkillIds.length >= select &&
                          !selectedSkillIds?.includes(skillId)
                        }
                        {...register("skillProficiencyChoices")}
                      />
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        )}
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <LinkButton onClick={onCancel}>Cancel</LinkButton>
        </div>
      </div>
    </form>
  )
}
