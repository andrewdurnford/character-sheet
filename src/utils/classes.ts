import { abilities, skills } from "./abilities"

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
