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

export type Race =
  | "dwarf"
  | "elf"
  | "halfling"
  | "human"
  | "dragonborn"
  | "gnome"
  | "half-elf"
  | "half-orc"
  | "tiefling"

export type Subrace = "hill-dwarf" | "high-elf" | "lightfoot" | "rock-gnome"

export type { Class } from "./classes"
