import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCharacter } from "../../stores/character"
import { Checkbox, Error, Input } from "../../components/Input"
import { Button, LinkButton } from "../../components/Button"
import {
  CharacterBackgroundSchema,
  characterBackgroundSchema,
} from "../../lib/characterBackgroundSchema"
import { Skill, api } from "../../api"

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
          placeholder="Acolyte"
          error={errors?.background?.message}
          {...register("background")}
          required
        />
        {/* TODO: refactor into reusable component with class form */}
        <div>
          <div className="mb-1 flex items-center gap-1">
            <h3 className="font-bold">
              Skill Proficiencies<span aria-hidden>*</span>
            </h3>
            <span className="text-sm">(Choose 2)</span>
          </div>
          <Error
            error={errors.backgroundSkillProficiencyChoices?.message}
            className="mb-1"
          />
          <ul>
            {Object.entries(api.skills).map(([skillId, { name }]) => {
              const classIncludesSkill =
                !!classId &&
                !!classSkillProficiencyChoices?.includes(skillId as Skill)
              const selectedMax =
                selectedSkillIds &&
                selectedSkillIds.length >= 2 &&
                !selectedSkillIds?.includes(skillId as Skill)

              return (
                <Checkbox
                  key={skillId}
                  value={skillId}
                  label={name}
                  subLabel={
                    classIncludesSkill
                      ? `class: ${api.classes[classId].name}`
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
