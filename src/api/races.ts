import { abilities } from "./abilities"

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

// prettier-ignore
export const races: Record<Race, {name: string, speed: number}> = {
  dwarf:      { name: "Dwarf",      speed: 25 },
  elf:        { name: "Elf",        speed: 30 },
  halfling:   { name: "Halfling",   speed: 25 },
  human:      { name: "Human",      speed: 30 },
  dragonborn: { name: "Dragonborn", speed: 30 },
  gnome:      { name: "Gnome",      speed: 25 },
  "half-elf": { name: "Half-Elf",   speed: 30 },
  "half-orc": { name: "Half-Orc",   speed: 30 },
  tiefling:   { name: "Tiefling",   speed: 30 },
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

export type Subrace = "hill-dwarf" | "high-elf" | "lightfoot" | "rock-gnome"

export const subraces: Record<Subrace, { raceId: Race; name: string }> = {
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
