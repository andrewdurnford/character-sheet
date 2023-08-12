import { abilities, skills } from "./abilities"
import { weapons } from "./weapons"

export const classes = {
  barbarian: "Barbarian",
  bard: "Bard",
  cleric: "Cleric",
  druid: "Druid",
  fighter: "Fighter",
  monk: "Monk",
  paladin: "Paladin",
  ranger: "Ranger",
  rogue: "Rogue",
  sorcerer: "Sorcerer",
  warlock: "Warlock",
  wizard: "Wizard",
}

interface ClassStartingEquipment {
  classId: keyof typeof classes
  weaponId: keyof typeof weapons
  count?: number
}

// TODO: add choices and non-weapons
export const classStartingEquipment: ClassStartingEquipment[] = [
  { classId: "barbarian", weaponId: "greataxe" },
  { classId: "barbarian", weaponId: "handaxe", count: 2 },
  { classId: "barbarian", weaponId: "javelin", count: 4 },
  { classId: "bard", weaponId: "rapier" },
  { classId: "cleric", weaponId: "mace" },
  { classId: "cleric", weaponId: "crossbow-light" },
  { classId: "druid", weaponId: "scimitar" },
  { classId: "fighter", weaponId: "longbow" },
  { classId: "fighter", weaponId: "crossbow-light" },
  { classId: "monk", weaponId: "shortsword" },
  { classId: "paladin", weaponId: "javelin", count: 5 },
  { classId: "ranger", weaponId: "shortsword", count: 2 },
  { classId: "ranger", weaponId: "longbow" },
  { classId: "rogue", weaponId: "rapier" },
  { classId: "rogue", weaponId: "shortbow" },
  { classId: "sorcerer", weaponId: "crossbow-light" },
  { classId: "sorcerer", weaponId: "dagger", count: 2 },
  { classId: "warlock", weaponId: "crossbow-light" },
  { classId: "wizard", weaponId: "quarterstaff" },
]

// prettier-ignore
export const classWeaponProficiencies: Array<{
  classId: keyof typeof classes
  weapons: Array<keyof typeof weapons>
}> = [
  { classId: 'barbarian', weapons: [], /* simple weapons, martial weapons */ },
  { classId: 'bard',      weapons: ["crossbow-hand", "longsword", "rapier", "shortsword"], /* simple weapons */ },
  { classId: 'cleric',    weapons: [], /* simple weapons */ },
  { classId: 'druid',     weapons: ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"], },
  { classId: 'fighter',   weapons: [], /* simple weapons, martial weapons */ },
  { classId: 'monk',      weapons: ["shortsword"], /* simple weapons */ },
  { classId: 'paladin',   weapons: [], /* simple weapons, martial weapons */ },
  { classId: 'ranger',    weapons: [], /* simple weapons, martial weapons */ },
  { classId: 'rogue',     weapons: ["crossbow-hand", "longsword", "rapier", "shortsword"], /* simple weapons */ },
  { classId: 'sorcerer',  weapons: ["dagger", "dart", "sling", "quarterstaff", "crossbow-light"], },
  { classId: 'warlock',   weapons: [], /* simple weapons */ },
  { classId: 'wizard',    weapons: ["dagger", "dart", "sling", "quarterstaff", "crossbow-light"], },
]

interface ClassSkillProficiencyChoice {
  classId: keyof typeof classes
  select: number
  filter: Array<keyof typeof skills>
}

export const classSkillProficiencyChoices: ClassSkillProficiencyChoice[] = [
  {
    classId: "barbarian",
    select: 2,
    filter: [
      "animal-handling",
      "athletics",
      "intimidation",
      "nature",
      "perception",
      "survival",
    ],
  },
  {
    classId: "bard",
    select: 3,
    filter: [
      "acrobatics",
      "animal-handling",
      "arcana",
      "athletics",
      "deception",
      "history",
      "insight",
      "intimidation",
      "investigation",
      "medicine",
      "nature",
      "perception",
      "performance",
      "persuasion",
      "religion",
      "sleight-of-hand",
      "stealth",
      "survival",
    ],
  },
  {
    classId: "cleric",
    select: 2,
    filter: ["history", "insight", "medicine", "persuasion", "religion"],
  },
  {
    classId: "druid",
    select: 2,
    filter: [
      "arcana",
      "animal-handling",
      "insight",
      "medicine",
      "nature",
      "perception",
      "religion",
      "survival",
    ],
  },
  {
    classId: "fighter",
    select: 2,
    filter: [
      "acrobatics",
      "animal-handling",
      "athletics",
      "history",
      "insight",
      "intimidation",
      "perception",
      "survival",
    ],
  },
  {
    classId: "monk",
    select: 2,
    filter: [
      "acrobatics",
      "athletics",
      "history",
      "insight",
      "religion",
      "stealth",
    ],
  },
  {
    classId: "paladin",
    select: 2,
    filter: [
      "athletics",
      "insight",
      "intimidation",
      "medicine",
      "persuasion",
      "religion",
    ],
  },
  {
    classId: "ranger",
    select: 3,
    filter: [
      "animal-handling",
      "athletics",
      "insight",
      "investigation",
      "nature",
      "perception",
      "stealth",
      "survival",
    ],
  },
  {
    classId: "rogue",
    select: 4,
    filter: [
      "acrobatics",
      "athletics",
      "deception",
      "insight",
      "intimidation",
      "investigation",
      "perception",
      "performance",
      "persuasion",
      "sleight-of-hand",
      "stealth",
    ],
  },
  {
    classId: "sorcerer",
    select: 2,
    filter: [
      "arcana",
      "deception",
      "insight",
      "intimidation",
      "persuasion",
      "religion",
    ],
  },
  {
    classId: "warlock",
    select: 2,
    filter: [
      "arcana",
      "deception",
      "history",
      "intimidation",
      "investigation",
      "nature",
      "religion",
    ],
  },
  {
    classId: "wizard",
    select: 2,
    filter: [
      "arcana",
      "history",
      "insight",
      "investigation",
      "medicine",
      "religion",
    ],
  },
]

interface ClassSavingThrowProficiency {
  classId: keyof typeof classes
  abilityId: keyof typeof abilities
}

export const classSavingThrowProficiencies: ClassSavingThrowProficiency[] = [
  { classId: "barbarian", abilityId: "strength" },
  { classId: "barbarian", abilityId: "constitution" },
  { classId: "bard", abilityId: "dexterity" },
  { classId: "bard", abilityId: "charisma" },
  { classId: "cleric", abilityId: "wisdom" },
  { classId: "cleric", abilityId: "charisma" },
  { classId: "druid", abilityId: "intelligence" },
  { classId: "druid", abilityId: "wisdom" },
  { classId: "fighter", abilityId: "strength" },
  { classId: "fighter", abilityId: "constitution" },
  { classId: "monk", abilityId: "strength" },
  { classId: "monk", abilityId: "dexterity" },
  { classId: "paladin", abilityId: "wisdom" },
  { classId: "paladin", abilityId: "charisma" },
  { classId: "ranger", abilityId: "strength" },
  { classId: "ranger", abilityId: "dexterity" },
  { classId: "rogue", abilityId: "dexterity" },
  { classId: "rogue", abilityId: "intelligence" },
  { classId: "sorcerer", abilityId: "constitution" },
  { classId: "sorcerer", abilityId: "charisma" },
  { classId: "warlock", abilityId: "wisdom" },
  { classId: "warlock", abilityId: "charisma" },
  { classId: "wizard", abilityId: "intelligence" },
  { classId: "wizard", abilityId: "wisdom" },
]
