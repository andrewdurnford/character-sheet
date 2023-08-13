import { abilities, skills } from "./abilities"
import { Armor, ArmorType } from "./equipment"
import { weapons } from "./weapons"

export type Class =
  | "barbarian"
  | "bard"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "warlock"
  | "wizard"

// prettier-ignore
export const classes: Record<
  Class,
  { name: string; hitDice: 6 | 8 | 10 | 12 }
> = {
  barbarian: { name: "Barbarian", hitDice: 12 },
  bard:      { name: "Bard",      hitDice: 8  },
  cleric:    { name: "Cleric",    hitDice: 8  },
  druid:     { name: "Druid",     hitDice: 8  },
  fighter:   { name: "Fighter",   hitDice: 10 },
  monk:      { name: "Monk",      hitDice: 8  },
  paladin:   { name: "Paladin",   hitDice: 10 },
  ranger:    { name: "Ranger",    hitDice: 10 },
  rogue:     { name: "Rogue",     hitDice: 8  },
  sorcerer:  { name: "Sorcerer",  hitDice: 6  },
  warlock:   { name: "Warlock",   hitDice: 8  },
  wizard:    { name: "Wizard",    hitDice: 6  },
}

interface ClassStartingArmor {
  classId: keyof typeof classes
  armorId: Armor
  shield?: boolean
}

// prettier-ignore
export const classStartingArmor: ClassStartingArmor[] = [
  { classId: "bard",    armorId: "leather",                 },
  { classId: "cleric",  armorId: "scale-mail", shield: true },
  { classId: "druid",   armorId: "leather",    shield: true },
  { classId: "fighter", armorId: "chain-mail",              },
  { classId: "paladin", armorId: "chain-mail", shield: true },
  { classId: "ranger",  armorId: "scale-mail",              },
  { classId: "rogue",   armorId: "leather",                 },
  { classId: "warlock", armorId: "leather",                 },
]

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

// TODO: armor proficiency
// Anyone can put on a suit of armor or strap a shield to an arm. Only those
// proficient in the armor’s use know how to wear it effectively, however. Your
// class gives you proficiency with certain types of armor. If you wear armor
// that you lack proficiency with, you have disadvantage on any ability check,
// saving throw, or attack roll that involves Strength or Dexterity, and you
// can’t cast spells.

// prettier-ignore
export const classArmorProficiencies: Array<{
  classId: keyof typeof classes
  types: ArmorType[]
  shield?: boolean
}> = [
  { classId: 'barbarian', types: ["light", "medium"],          shield: true },
  { classId: 'bard',      types: ["light"],                                 },
  { classId: 'cleric',    types: ["light", "medium"],          shield: true },
  { classId: 'druid',     types: ["light", "medium"],          shield: true }, // TODO: wooden shield
  { classId: 'fighter',   types: ["light", "medium", "heavy"], shield: true },
  { classId: 'monk',      types: []                                         },
  { classId: 'paladin',   types: ["light", "medium", "heavy"], shield: true },
  { classId: 'ranger',    types: ["light", "medium"],          shield: true },
  { classId: 'rogue',     types: ["light"],                                 },
  { classId: 'sorcerer',  types: []                                         },
  { classId: 'warlock',   types: ["light"],                                 },
  { classId: 'wizard',    types: [],                                        },
]

// prettier-ignore
export const classWeaponProficiencies: Array<{
  classId: keyof typeof classes
  categories: Array<'simple' | 'martial'>
  weapons: Array<keyof typeof weapons>
}> = [
  { classId: 'barbarian', categories: ["simple", "martial"], weapons: [], },
  { classId: 'bard',      categories: ["simple"],            weapons: ["crossbow-hand", "longsword", "rapier", "shortsword"], },
  { classId: 'cleric',    categories: ["simple"],            weapons: [], },
  { classId: 'druid',     categories: [],                    weapons: ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"], },
  { classId: 'fighter',   categories: ["simple", "martial"], weapons: [], },
  { classId: 'monk',      categories: ["simple"],            weapons: ["shortsword"], },
  { classId: 'paladin',   categories: ["simple", "martial"], weapons: [], },
  { classId: 'ranger',    categories: ["simple", "martial"], weapons: [], },
  { classId: 'rogue',     categories: ["simple"],            weapons: ["crossbow-hand", "longsword", "rapier", "shortsword"], },
  { classId: 'sorcerer',  categories: [],                    weapons: ["dagger", "dart", "sling", "quarterstaff", "crossbow-light"], },
  { classId: 'warlock',   categories: ["simple"],            weapons: [], },
  { classId: 'wizard',    categories: [],                    weapons: ["dagger", "dart", "sling", "quarterstaff", "crossbow-light"], },
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
