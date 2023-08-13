import { abilities, skills } from "./abilities"
import {
  classes,
  classStartingEquipment,
  classSavingThrowProficiencies,
  classSkillProficiencyChoices,
  classWeaponProficiencies,
} from "./classes"
import {
  races,
  raceAbilityScoreIncreases,
  subraces,
  subraceAbilityScoreIncreases,
} from "./races"
import { weapons, weaponData } from "./weapons"

export const api = {
  abilities,
  skills,
  classes,
  classStartingEquipment,
  classSavingThrowProficiencies,
  classSkillProficiencyChoices,
  classWeaponProficiencies,
  races,
  raceAbilityScoreIncreases,
  subraces,
  subraceAbilityScoreIncreases,
  weapons,
  weaponData,
}

export type Ability =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma"

export type Skill =
  | "acrobatics"
  | "animal-handling"
  | "athletics"
  | "arcana"
  | "deception"
  | "athletics"
  | "history"
  | "deception"
  | "insight"
  | "history"
  | "intimidation"
  | "insight"
  | "investigation"
  | "intimidation"
  | "medicine"
  | "investigation"
  | "nature"
  | "medicine"
  | "perception"
  | "nature"
  | "performance"
  | "perception"
  | "persuasion"
  | "performance"
  | "religion"
  | "persuasion"
  | "sleight-of-hand"
  | "stealth"
  | "religion"
  | "survival"
  | "stealth"
  | "survival"

export type { Class } from "./classes"
export type { Race, Subrace } from "./races"
