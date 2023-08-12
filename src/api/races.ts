import { abilities } from "./abilities"

export const races = {
  dwarf: { name: "Dwarf" },
  elf: { name: "Elf" },
  halfling: { name: "Halfling" },
  human: { name: "Human" },
  dragonborn: { name: "Dragonborn" },
  gnome: { name: "Gnome" },
  "half-elf": { name: "Half-Elf" },
  "half-orc": { name: "Half-Orc" },
  tiefling: { name: "Tiefling" },
}

interface RaceAbilityScoreIncrease {
  raceId: keyof typeof races
  abilityId: keyof typeof abilities | null // null indicates a choice
  increase: number
}

// prettier-ignore
export const raceAbilityScoreIncreases: RaceAbilityScoreIncrease[] = [
  { raceId: "dwarf",      abilityId: "constitution", increase: 2 },
  { raceId: "elf",        abilityId: "dexterity",    increase: 2 },
  { raceId: "halfling",   abilityId: "constitution", increase: 2 },
  { raceId: "human",      abilityId: "strength",     increase: 1 },
  { raceId: "human",      abilityId: "dexterity",    increase: 1 },
  { raceId: "human",      abilityId: "constitution", increase: 1 },
  { raceId: "human",      abilityId: "intelligence", increase: 1 },
  { raceId: "human",      abilityId: "wisdom",       increase: 1 },
  { raceId: "human",      abilityId: "charisma",     increase: 1 },
  { raceId: "dragonborn", abilityId: "strength",     increase: 2 },
  { raceId: "dragonborn", abilityId: "charisma",     increase: 1 },
  { raceId: "gnome",      abilityId: "intelligence", increase: 2 },
  { raceId: "half-elf",   abilityId: "charisma",     increase: 2 },
  { raceId: "half-elf",   abilityId: null,           increase: 1 },
  { raceId: "half-elf",   abilityId: null,           increase: 1 },
  { raceId: "half-orc",   abilityId: "strength",     increase: 2 },
  { raceId: "half-orc",   abilityId: "constitution", increase: 1 },
  { raceId: "tiefling",   abilityId: "intelligence", increase: 2 },
  { raceId: "tiefling",   abilityId: "charisma",     increase: 1 },
]

interface Subrace {
  name: string
  raceId: keyof typeof races
}

export const subraces: Record<
  "hill-dwarf" | "high-elf" | "lightfoot" | "rock-gnome",
  Subrace
> = {
  "hill-dwarf": { raceId: "dwarf", name: "Hill Dwarf" },
  "high-elf": { raceId: "elf", name: "High Elf" },
  lightfoot: { raceId: "halfling", name: "Lightfoot" },
  "rock-gnome": { raceId: "gnome", name: "Rock Gnome" },
}

interface SubraceAbilityScoreIncrease {
  subraceId: keyof typeof subraces
  abilityId: keyof typeof abilities
  increase: number
}

export const subraceAbilityScoreIncreases: SubraceAbilityScoreIncrease[] = [
  { subraceId: "hill-dwarf", abilityId: "wisdom", increase: 1 },
  { subraceId: "high-elf", abilityId: "intelligence", increase: 1 },
  { subraceId: "lightfoot", abilityId: "charisma", increase: 1 },
  { subraceId: "rock-gnome", abilityId: "constitution", increase: 1 },
]
