import { create } from "zustand"
import { Ability, Class, Race, Skill, api } from "../api"

// TODO: move to core logic helper functions
export function proficiencyBonus(level: number) {
  if (level % 4 === 0) {
    return Math.floor(level / 4) + 1
  }
  return Math.floor(level / 4) + 2
}
export function calculateMaxHitPoints(
  classId: Class | undefined,
  level: number,
  modifier: number,
) {
  if (!classId) return 0

  const hitDice = api.classes[classId].hitDice

  // calculate average for every level > 1
  return hitDice + modifier + (hitDice / 2 + 1 + modifier) * (level - 1)
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
  raceAbilityScoreIncreaseChoices?: Ability[]
  currentHitPoints: number
  setName: (name: string) => void
  setCurrentHitPoints: (currentHitPoints: number) => void
  setRace: (raceId: Race, raceAbilityScoreIncreaseChoices?: Ability[]) => void
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
  initiative: () => number
  speed: () => number
  abilityScores: () => Record<Ability, { score: number; modifier: number }>
  abilityChecks: () => Record<Skill, { modifier: number; proficient: boolean }>
  savingThrows: () => Record<Ability, { modifier: number; proficient: boolean }>
  armorClass: () => number
  maxHitPoints: () => number
  // TODO: currentHitPoints
}

export const useCharacter = create<CharacterState>()((set, get) => ({
  name: "Untitled",
  raceId: undefined,
  classId: undefined,
  level: 1,
  background: "Acolyte",
  currentHitPoints: 0,
  setName: (name) => set(() => ({ name })),
  setCurrentHitPoints: (currentHitPoints) => set(() => ({ currentHitPoints })),
  setRace: (raceId, raceAbilityScoreIncreaseChoices) =>
    set(() => ({ raceId, raceAbilityScoreIncreaseChoices })),
  setClass: (classId, level, skillProficiencyChoices) =>
    set(() => ({ classId, level, skillProficiencyChoices })),
  setBackground: (background, backgroundSkillProficiencyChoices) =>
    set(() => ({ background, backgroundSkillProficiencyChoices })),
  setAbilityScoreChoices: (abilityScoreChoices) =>
    set(() => ({ abilityScoreChoices })),
  proficiencyBonus: () => proficiencyBonus(get().level),
  initiative: () => get().abilityScores().dexterity.modifier,
  speed: () => {
    const raceId = get().raceId
    return raceId ? api.races[raceId].details.speed : 0
  },
  abilityScores: () =>
    Object.keys(api.abilities).reduce(
      (acc, abilityId) => {
        const raceId = get().raceId
        const raceAbilityScoreIncrease = raceId
          ? api.races[raceId].abilityScoreIncreases.find(
              (x) => x.abilityId === abilityId,
            )?.increase
          : undefined
        const subraceAbilityScoreIncrease = raceId
          ? api.races[raceId].subrace?.abilityScoreIncrease === abilityId
            ? 1
            : undefined
          : undefined

        const increase =
          // calculate race ability score increase choice
          (get().raceAbilityScoreIncreaseChoices?.some((x) => x === abilityId)
            ? // TODO: handle increase as a dynamic number
              1
            : 0) +
          // calculate race ability score increase
          (raceAbilityScoreIncrease ?? 0) +
          // calculate subrace ability score increase
          (subraceAbilityScoreIncrease ?? 0)

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
        const classId = get().classId
        const proficiencyBonus = get().proficiencyBonus()
        const proficient =
          !!classId &&
          api.classes[classId].proficiencies.savingThrows.includes(
            abilityId as Ability,
          )
        const abilityModifier =
          get().abilityScores()[abilityId as Ability].modifier

        const modifier = abilityModifier + (proficient ? proficiencyBonus : 0)

        acc[abilityId as Ability] = { modifier, proficient }
        return acc
      },
      {} as Record<Ability, { modifier: number; proficient: boolean }>,
    ),
  // TODO: equip different armors from inventory
  armorClass: () => {
    const classId = get().classId
    const dexMod = get().abilityScores().dexterity.modifier

    if (!classId) {
      return 10 + dexMod
    }

    // TODO: class armor choices
    const { armorId, shield } = api.classes[classId].startingEquipment

    const armor = !armorId ? null : api.armor[armorId]
    const shieldMod = shield ? 2 : 0

    // unarmored -> 10 + dex mod
    // light -> ac + dex mod
    // medium -> ac + dex mod (max 2)
    // heavy -> ac
    let base = 10
    if (armor?.type === "light") {
      base = armor.armorClass + dexMod
    }
    if (armor?.type === "medium") {
      base = armor.armorClass + (dexMod > 2 ? 2 : dexMod)
    }
    if (armor?.type === "heavy") {
      base = armor.armorClass
    }
    return base + shieldMod
  },
  maxHitPoints: () =>
    calculateMaxHitPoints(
      get().classId,
      get().level,
      get().abilityScores().constitution.modifier,
    ),
}))
