import { abilities, skills } from "./abilities"
import {
  classes,
  classStartingEquipment,
  classSavingThrowProficiencies,
  classSkillProficiencyChoices,
  classWeaponProficiencies,
  classStartingArmor,
  classArmorProficiencies,
} from "./classes"
import { armor } from "./equipment"
import { races, raceIds } from "./races"
import { weapons, weaponData } from "./weapons"

export const api = {
  abilities,
  skills,
  classes,
  classStartingArmor,
  classStartingEquipment,
  classArmorProficiencies,
  classSavingThrowProficiencies,
  classSkillProficiencyChoices,
  classWeaponProficiencies,
  races,
  raceIds,
  armor,
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
export type { Race } from "./races"
export type { Armor } from "./equipment"
