import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { Checklist, Input } from "../../components/Input"
import { Button, LinkButton } from "../../components/Button"
import {
  CharacterBackgroundSchema,
  characterBackgroundSchema,
} from "../../lib/characterBackgroundSchema"
import { api } from "../../api"

interface CharacterNameBackgroundProps {
  onCancel: () => void
}

export function CharacterBackgroundForm({
  onCancel,
}: CharacterNameBackgroundProps) {
  const setBackground = useCharacter((s) => s.setBackground)
  const background = useCharacter((s) => s.background)
  const backgroundSkillProficiencyChoices = useCharacter(
    (s) => s.backgroundSkillProficiencyChoices,
  )
  const classId = useCharacter((s) => s.classId)
  const classSkillProficiencyChoices = useCharacter(
    (s) => s.skillProficiencyChoices,
  )

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CharacterBackgroundSchema>({
    mode: "onSubmit",
    defaultValues: {
      background,
      backgroundSkillProficiencyChoices,
    },
    resolver: zodResolver(characterBackgroundSchema),
  })
  const choices = watch("backgroundSkillProficiencyChoices")

  function onSubmit({
    background,
    backgroundSkillProficiencyChoices,
  }: CharacterBackgroundSchema) {
    setBackground(background, backgroundSkillProficiencyChoices)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-6">
        <Input
          label="Background"
          placeholder="Acolyte"
          error={errors?.background?.message}
          {...register("background")}
          required
        />
        <Checklist
          required
          label="Skill Proficiencies"
          select={2}
          selectCount={choices?.length}
          options={api._skillIds.map((skillId) => {
            const classIncludesSkill =
              !!classId && !!classSkillProficiencyChoices?.includes(skillId)
                ? `class: ${api.classes[classId].name}`
                : undefined
            const selectedMax =
              choices && choices.length >= 2 && !choices?.includes(skillId)

            return {
              value: skillId,
              label: api.skills[skillId].name,
              subLabel: classIncludesSkill,
              disabled: selectedMax || !!classIncludesSkill,
            }
          })}
          error={errors.backgroundSkillProficiencyChoices?.message}
          {...register("backgroundSkillProficiencyChoices")}
        />
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <LinkButton onClick={onCancel}>Cancel</LinkButton>
        </div>
      </div>
    </form>
  )
}
