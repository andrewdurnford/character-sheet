import { Ability, Skill } from "./abilities"
import { Armor, ArmorType } from "./equipment"
import { Weapon, WeaponCategory } from "./weapons"

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

export const _classIds: Class[] = [
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
]

const classDictionary: Record<Class, string> = {
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

type HitDice = 6 | 8 | 10 | 12

const classDetails: Record<Class, { hitDice: HitDice }> = {
  barbarian: { hitDice: 12 },
  bard: { hitDice: 8 },
  cleric: { hitDice: 8 },
  druid: { hitDice: 8 },
  fighter: { hitDice: 10 },
  monk: { hitDice: 8 },
  paladin: { hitDice: 10 },
  ranger: { hitDice: 10 },
  rogue: { hitDice: 8 },
  sorcerer: { hitDice: 6 },
  warlock: { hitDice: 8 },
  wizard: { hitDice: 6 },
}

// TODO: add armor choices
const startingArmor: Record<Class, Armor | null> = {
  barbarian: null,
  bard: "leather",
  cleric: "scale-mail",
  druid: "leather",
  fighter: "chain-mail",
  monk: null,
  paladin: "chain-mail",
  ranger: "scale-mail",
  rogue: "leather",
  sorcerer: null,
  warlock: "leather",
  wizard: null,
}

// TODO: include shield in equipment choices
const startingShields: Class[] = ["cleric", "druid", "paladin"]

// TODO: change to an array of choices
// TODO: fix multiples of weapons
const startingWeapons: Record<Class, Weapon[]> = {
  barbarian: ["greataxe", "handaxe", "javelin"], // 2 handaxes, 4 javelins
  bard: ["rapier"],
  cleric: ["mace", "crossbow-light"],
  druid: ["scimitar"],
  fighter: ["longbow", "crossbow-light"],
  monk: ["shortsword"],
  paladin: ["javelin", "javelin"], // 4 javelins
  ranger: ["shortsword", "shortsword", "longbow"],
  rogue: ["rapier", "shortbow"],
  sorcerer: ["crossbow-light", "dagger", "dagger"],
  warlock: ["crossbow-light"],
  wizard: ["quarterstaff"],
}

/**
 * TODO: armor proficiency
 * Anyone can put on a suit of armor or strap a shield to an arm. Only those
 * proficient in the armor’s use know how to wear it effectively, however. Your
 * class gives you proficiency with certain types of armor. If you wear armor
 * that you lack proficiency with, you have disadvantage on any ability check,
 * saving throw, or attack roll that involves Strength or Dexterity, and you
 * can’t cast spells.
 */
const armorProficiencies: Record<Class, ArmorType[]> = {
  barbarian: ["light", "medium"],
  bard: ["light"],
  cleric: ["light", "medium"],
  druid: ["light", "medium"],
  fighter: ["light", "medium", "heavy"],
  monk: [],
  paladin: ["light", "medium", "heavy"],
  ranger: ["light", "medium"],
  rogue: ["light"],
  sorcerer: [],
  warlock: ["light"],
  wizard: [],
}

const shieldProficiencies: Class[] = [
  "barbarian",
  "cleric",
  "druid",
  "fighter",
  "paladin",
  "ranger",
]

const weaponProficiencies: Record<Class, Weapon[]> = {
  barbarian: [],
  bard: ["crossbow-hand", "longsword", "rapier", "shortsword"],
  cleric: [],
  // prettier-ignore
  druid: ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"],
  fighter: [],
  monk: ["shortsword"],
  paladin: [],
  ranger: [],
  rogue: ["crossbow-hand", "longsword", "rapier", "shortsword"],
  sorcerer: ["dagger", "dart", "sling", "quarterstaff", "crossbow-light"],
  warlock: [],
  wizard: ["dagger", "dart", "sling", "quarterstaff", "crossbow-light"],
}

const weaponCategoryProficiencies: Record<Class, WeaponCategory[]> = {
  barbarian: ["simple", "martial"],
  bard: ["simple"],
  cleric: ["simple"],
  druid: [],
  fighter: ["simple", "martial"],
  monk: ["simple"],
  paladin: ["simple", "martial"],
  ranger: ["simple", "martial"],
  rogue: ["simple"],
  sorcerer: [],
  warlock: ["simple"],
  wizard: [],
}

const savingThrowProficiencies: Record<Class, Ability[]> = {
  barbarian: ["strength", "constitution"],
  bard: ["dexterity", "charisma"],
  cleric: ["wisdom", "charisma"],
  druid: ["intelligence", "wisdom"],
  fighter: ["strength", "constitution"],
  monk: ["strength", "dexterity"],
  paladin: ["wisdom", "charisma"],
  ranger: ["strength", "dexterity"],
  rogue: ["dexterity", "intelligence"],
  sorcerer: ["constitution", "charisma"],
  warlock: ["wisdom", "charisma"],
  wizard: ["intelligence", "wisdom"],
}

const skillProficiencyChoices: Record<Class, number> = {
  barbarian: 2,
  bard: 3,
  cleric: 2,
  druid: 2,
  fighter: 2,
  monk: 2,
  paladin: 2,
  ranger: 3,
  rogue: 4,
  sorcerer: 2,
  warlock: 2,
  wizard: 2,
}

const skillProficiencyFilter: Record<Class, Skill[]> = {
  barbarian: [
    "animal-handling",
    "athletics",
    "intimidation",
    "nature",
    "perception",
    "survival",
  ],
  bard: [
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
  cleric: ["history", "insight", "medicine", "persuasion", "religion"],
  druid: [
    "arcana",
    "animal-handling",
    "insight",
    "medicine",
    "nature",
    "perception",
    "religion",
    "survival",
  ],
  fighter: [
    "acrobatics",
    "animal-handling",
    "athletics",
    "history",
    "insight",
    "intimidation",
    "perception",
    "survival",
  ],
  monk: [
    "acrobatics",
    "athletics",
    "history",
    "insight",
    "religion",
    "stealth",
  ],
  paladin: [
    "athletics",
    "insight",
    "intimidation",
    "medicine",
    "persuasion",
    "religion",
  ],
  ranger: [
    "animal-handling",
    "athletics",
    "insight",
    "investigation",
    "nature",
    "perception",
    "stealth",
    "survival",
  ],
  rogue: [
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
  sorcerer: [
    "arcana",
    "deception",
    "insight",
    "intimidation",
    "persuasion",
    "religion",
  ],
  warlock: [
    "arcana",
    "deception",
    "history",
    "intimidation",
    "investigation",
    "nature",
    "religion",
  ],
  wizard: [
    "arcana",
    "history",
    "insight",
    "investigation",
    "medicine",
    "religion",
  ],
}

type ClassTable = Record<
  Class,
  {
    name: string
    hitDice: HitDice
    proficiencies: {
      armor: ArmorType[]
      shield: boolean
      weapons: Weapon[]
      weaponCategories: WeaponCategory[]
      // tools: Tool[],
      savingThrows: Ability[]
      skills: {
        select: number
        filter: Skill[]
      }
    }
    startingEquipment: {
      armorId: Armor | null
      shield: boolean
      weapons: Weapon[]
    }
  }
>

export const classes: ClassTable = _classIds.reduce((acc, classId) => {
  acc[classId] = {
    name: classDictionary[classId],
    hitDice: classDetails[classId].hitDice,
    proficiencies: {
      armor: armorProficiencies[classId],
      shield: shieldProficiencies.includes(classId),
      weapons: weaponProficiencies[classId],
      weaponCategories: weaponCategoryProficiencies[classId],
      savingThrows: savingThrowProficiencies[classId],
      skills: {
        select: skillProficiencyChoices[classId],
        filter: skillProficiencyFilter[classId],
      },
    },
    startingEquipment: {
      armorId: startingArmor[classId],
      shield: startingShields.includes(classId),
      weapons: startingWeapons[classId],
    },
  }
  return acc
}, {} as ClassTable)
