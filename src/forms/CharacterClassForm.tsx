import { useForm } from "react-hook-form"
import { useCharacterStore } from "../useCharacterStore"
import {
  classSavingThrowProficiencies,
  classSkillProficiencyChoices,
  classes,
} from "../utils/classes"
import { Button, LinkButton } from "../components/Button"
import { RadioGroup, Select } from "../components/Input"
import { abilities, skills } from "../utils/abilities"

type CharacterClassFormValues = {
  classId: keyof typeof classes
  level: number
}

interface CharacterClassFormProps {
  onCancel: () => void
}

export function CharacterClassForm({ onCancel }: CharacterClassFormProps) {
  const classId = useCharacterStore((state) => state.classId)
  const level = useCharacterStore((state) => state.level)
  const setClass = useCharacterStore((state) => state.setClass)
  const { watch, handleSubmit, register } = useForm<CharacterClassFormValues>({
    mode: "onSubmit",
    defaultValues: {
      classId,
      level,
    },
  })
  const selectedId = watch("classId")
  const { select, filter } =
    classSkillProficiencyChoices.find((x) => x.classId === selectedId) || {}

  function onSubmit(data: CharacterClassFormValues) {
    setClass(data.classId, data.level)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <LinkButton onClick={onCancel}>Back</LinkButton>
        <Select label="Level" {...register("level")}>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
        <RadioGroup
          label="Class"
          options={Object.entries(classes).map(([classId, name]) => ({
            label: name,
            value: classId,
          }))}
          {...register("classId")}
        />
        {selectedId && (
          <section>
            <h2 className="mb-2 font-medium">Proficiencies</h2>
            <div>
              <h3 className="italic">Saving Throws</h3>
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
                <h3 className="mt-4 italic">Skills</h3>
                <span>Choose {select} from</span>
                {filter && (
                  <ul>
                    {filter.map((x) => (
                      <li className="ml-4 list-disc">{skills[x].name}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        )}
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
