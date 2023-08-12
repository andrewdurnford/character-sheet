import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../stores/character"
import { Checkbox, Error, Input } from "../components/Input"
import { Button, LinkButton } from "../components/Button"
import {
  CharacterBackgroundSchema,
  characterBackgroundSchema,
} from "../lib/characterBackgroundSchema"
import { skills } from "../api/abilities"
import { classes } from "../api/classes"

interface CharacterNameBackgroundProps {
  onCancel: () => void
}

export function CharacterBackgroundForm({
  onCancel,
}: CharacterNameBackgroundProps) {
  const setBackground = useCharacter((state) => state.setBackground)
  const background = useCharacter((state) => state.background)
  const backgroundSkillProficiencyChoices = useCharacter(
    (state) => state.backgroundSkillProficiencyChoices,
  )
  const classId = useCharacter((state) => state.classId)
  const classSkillProficiencyChoices = useCharacter(
    (state) => state.skillProficiencyChoices,
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
  const selectedSkillIds = watch("backgroundSkillProficiencyChoices")

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
          error={errors?.background?.message}
          {...register("background")}
          required
        />
        {/* TODO: refactor into reusable component with class form */}
        <div>
          <div className="mb-1 flex items-center gap-1">
            <h3 className="font-medium">
              Skill Proficiencies<span aria-hidden>*</span>
            </h3>
            <span className="text-sm">(Choose 2)</span>
          </div>
          <Error
            error={errors.backgroundSkillProficiencyChoices?.message}
            className="mb-1"
          />
          <ul>
            {Object.entries(skills).map(([skillId, { name }]) => {
              const classIncludesSkill =
                !!classId &&
                !!classSkillProficiencyChoices?.includes(
                  skillId as keyof typeof skills,
                )
              const selectedMax =
                selectedSkillIds &&
                selectedSkillIds.length >= 2 &&
                !selectedSkillIds?.includes(skillId as keyof typeof skills)

              return (
                <Checkbox
                  key={skillId}
                  value={skillId}
                  label={name}
                  subLabel={
                    classIncludesSkill
                      ? `class: ${classes[classId]}`
                      : undefined
                  }
                  disabled={selectedMax || classIncludesSkill}
                  {...register("backgroundSkillProficiencyChoices")}
                />
              )
            })}
          </ul>
        </div>
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <LinkButton onClick={onCancel}>Cancel</LinkButton>
        </div>
      </div>
    </form>
  )
}
