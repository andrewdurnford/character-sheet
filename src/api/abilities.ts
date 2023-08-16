export type Ability =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma"

export const abilities: Record<Ability, string> = {
  strength: "Strength",
  dexterity: "Dexterity",
  constitution: "Constitution",
  intelligence: "Intelligence",
  wisdom: "Wisdom",
  charisma: "Charisma",
}

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

export const skills: Record<Skill, { name: string; abilityId: Ability }> = {
  acrobatics: { name: "Acrobatics", abilityId: "dexterity" },
  "animal-handling": { name: "Animal Handling", abilityId: "wisdom" },
  arcana: { name: "Arcana", abilityId: "intelligence" },
  athletics: { name: "Athletics", abilityId: "strength" },
  deception: { name: "Deception", abilityId: "charisma" },
  history: { name: "History", abilityId: "intelligence" },
  insight: { name: "Insight", abilityId: "wisdom" },
  intimidation: { name: "Intimidation", abilityId: "charisma" },
  investigation: { name: "Investigation", abilityId: "intelligence" },
  medicine: { name: "Medicine", abilityId: "wisdom" },
  nature: { name: "Nature", abilityId: "intelligence" },
  perception: { name: "Perception", abilityId: "wisdom" },
  performance: { name: "Performance", abilityId: "charisma" },
  persuasion: { name: "Persuasion", abilityId: "charisma" },
  religion: { name: "Religion", abilityId: "intelligence" },
  "sleight-of-hand": { name: "Sleight of Hand", abilityId: "dexterity" },
  stealth: { name: "Stealth", abilityId: "dexterity" },
  survival: { name: "Survival", abilityId: "wisdom" },
}
