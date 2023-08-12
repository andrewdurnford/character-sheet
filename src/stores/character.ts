import { create } from "zustand"
import { Ability, Class, Race, Skill, api } from "../api"

// TODO: move to core logic helper functions
export function proficiencyBonus(level: number) {
  if (level % 4 === 0) {
    return Math.floor(level / 4) + 1
  }
  return Math.floor(level / 4) + 2
}

interface CharacterState {
  name: string
  raceId?: Race
  classId?: Class
  level: number
  // point buy
  abilityScoreChoices?: Record<Ability, number>
  // TODO: rename to classSkillProficiencyChoices
  skillProficiencyChoices?: Skill[]
  background?: string
  backgroundSkillProficiencyChoices?: Skill[]
  setName: (name: string) => void
  setRace: (raceId: Race) => void
  setClass: (
    classId: Class,
    level: number,
    skillProficiencyChoices?: Skill[],
  ) => void
  setBackground: (
    background: string,
    backgroundSkillProficiencyChoices?: Skill[],
  ) => void
  setAbilityScoreChoices: (
    abilityScoreChoices?: Record<Ability, number>,
  ) => void
  proficiencyBonus: () => number
  abilityScores: () => Record<Ability, { score: number; modifier: number }>
  abilityChecks: () => Record<Skill, { modifier: number; proficient: boolean }>
  savingThrows: () => Record<Ability, { modifier: number; proficient: boolean }>
}

export const useCharacter = create<CharacterState>()((set, get) => ({
  name: "Untitled",
  raceId: undefined,
  classId: undefined,
  level: 1,
  background: "Acolyte",
  setName: (name) => set(() => ({ name })),
  setRace: (raceId) => set(() => ({ raceId })),
  setClass: (classId, level, skillProficiencyChoices) =>
    set(() => ({ classId, level, skillProficiencyChoices })),
  setBackground: (background, backgroundSkillProficiencyChoices) =>
    set(() => ({ background, backgroundSkillProficiencyChoices })),
  setAbilityScoreChoices: (abilityScoreChoices) =>
    set(() => ({ abilityScoreChoices })),
  proficiencyBonus: () => proficiencyBonus(get().level),
  abilityScores: () =>
    Object.keys(api.abilities).reduce(
      (acc, abilityId) => {
        const increase =
          // calculate race ability score increase
          (api.raceAbilityScoreIncreases.find(
            (x) => x.raceId === get().raceId && x.abilityId === abilityId,
          )?.increase ?? 0) +
          // calculate subrace ability score increase
          (api.subraceAbilityScoreIncreases.find(
            (x) =>
              x.subraceId ===
                Object.entries(api.subraces).find(
                  (x) => x[1].raceId === get().raceId,
                )?.[0] && x.abilityId === abilityId,
          )?.increase ?? 0)

        const abilityScore =
          get().abilityScoreChoices?.[abilityId as Ability] ?? 10

        const score = abilityScore + increase
        const modifier = Math.floor((score - 10) / 2)

        acc[abilityId as Ability] = { score, modifier }
        return acc
      },
      {} as Record<Ability, { score: number; modifier: number }>,
    ),
  abilityChecks: () =>
    Object.entries(api.skills).reduce(
      (acc, [skillId, { abilityId }]) => {
        const proficiencyBonus = get().proficiencyBonus()
        const proficient =
          !!get().skillProficiencyChoices?.some((x) => x === skillId) ||
          !!get().backgroundSkillProficiencyChoices?.some((x) => x === skillId)
        const abilityModifier = get().abilityScores()[abilityId].modifier
        const modifier = abilityModifier + (proficient ? proficiencyBonus : 0)

        acc[skillId as Skill] = { modifier, proficient }
        return acc
      },
      {} as Record<Skill, { modifier: number; proficient: boolean }>,
    ),
  savingThrows: () =>
    Object.keys(get().abilityScores()).reduce(
      (acc, abilityId) => {
        const proficiencyBonus = get().proficiencyBonus()
        const proficient = api.classSavingThrowProficiencies.some(
          (x) => x.classId === get().classId && x.abilityId === abilityId,
        )
        const abilityModifier =
          get().abilityScores()[abilityId as Ability].modifier

        const modifier = abilityModifier + (proficient ? proficiencyBonus : 0)

        acc[abilityId as Ability] = { modifier, proficient }
        return acc
      },
      {} as Record<Ability, { modifier: number; proficient: boolean }>,
    ),
}))
