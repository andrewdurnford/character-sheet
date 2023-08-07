import { abilities } from "./abilities"

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
