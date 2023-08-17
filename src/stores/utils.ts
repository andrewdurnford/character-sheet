import { Ability, Class, Skill, api } from "../api"
import { CharacterState } from "./character"

export function abilityScores(
  state: CharacterState,
): Record<Ability, { score: number; modifier: number }> {
  return Object.keys(api.abilities).reduce(
    (acc, abilityId) => {
      const raceId = state.raceId
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
        (state.raceAbilityScoreIncreaseChoices?.some((x) => x === abilityId)
          ? // TODO: handle increase as a dynamic number
            1
          : 0) +
        // calculate race ability score increase
        (raceAbilityScoreIncrease ?? 0) +
        // calculate subrace ability score increase
        (subraceAbilityScoreIncrease ?? 0)

      const abilityScore =
        state.abilityScoreChoices?.[abilityId as Ability] ?? 10

      const score = abilityScore + increase
      const modifier = Math.floor((score - 10) / 2)

      acc[abilityId as Ability] = { score, modifier }
      return acc
    },
    {} as Record<Ability, { score: number; modifier: number }>,
  )
}

export function abilityChecks(
  state: CharacterState,
): Record<Skill, { modifier: number; proficient: boolean }> {
  return Object.entries(api.skills).reduce(
    (acc, [skillId, { abilityId }]) => {
      const bonus = proficiencyBonus(state)
      const proficient =
        !!state.skillProficiencyChoices?.some((x) => x === skillId) ||
        !!state.backgroundSkillProficiencyChoices?.some((x) => x === skillId)
      const abilityModifier = abilityScores(state)[abilityId].modifier
      const modifier = abilityModifier + (proficient ? bonus : 0)

      acc[skillId as Skill] = { modifier, proficient }
      return acc
    },
    {} as Record<Skill, { modifier: number; proficient: boolean }>,
  )
}

export function savingThrows(
  state: CharacterState,
): Record<Ability, { modifier: number; proficient: boolean }> {
  return Object.keys(abilityScores(state)).reduce(
    (acc, abilityId) => {
      const classId = state.classId
      const bonus = proficiencyBonus(state)
      const proficient =
        !!classId &&
        api.classes[classId].proficiencies.savingThrows.includes(
          abilityId as Ability,
        )
      const abilityModifier =
        abilityScores(state)[abilityId as Ability].modifier

      const modifier = abilityModifier + (proficient ? bonus : 0)

      acc[abilityId as Ability] = { modifier, proficient }
      return acc
    },
    {} as Record<Ability, { modifier: number; proficient: boolean }>,
  )
}

export function proficiencyBonus({ level }: CharacterState): number {
  return getProficiencyBonus(level)
}

export function speed({ raceId }: CharacterState): number {
  if (!raceId) return 0
  return api.races[raceId].details.speed
}

export function maxHitPoints(state: CharacterState): number {
  return getMaxHitPoints(
    state.classId,
    state.level,
    abilityScores(state).constitution.modifier,
  )
}

// TODO: equip different armors from inventory
export function armorClass(state: CharacterState): number {
  const classId = state.classId
  const dexMod = abilityScores(state).dexterity.modifier

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
}

export function getMaxHitPoints(
  classId: Class | undefined,
  level: number,
  modifier: number,
) {
  if (!classId) return 0

  const hitDice = api.classes[classId].hitDice

  // calculate average for every level > 1
  return hitDice + modifier + (hitDice / 2 + 1 + modifier) * (level - 1)
}

export function getProficiencyBonus(level: number): number {
  if (level % 4 === 0) {
    return Math.floor(level / 4) + 1
  }
  return Math.floor(level / 4) + 2
}
