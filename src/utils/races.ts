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
  abilityId: keyof typeof abilities
  increase: number
}

export const raceAbilityScoreIncreases: RaceAbilityScoreIncrease[] = [
  { raceId: "dwarf", abilityId: "constitution", increase: 2 },
  { raceId: "elf", abilityId: "dexterity", increase: 2 },
  { raceId: "halfling", abilityId: "constitution", increase: 2 },
  { raceId: "human", abilityId: "strength", increase: 1 },
  { raceId: "human", abilityId: "dexterity", increase: 1 },
  { raceId: "human", abilityId: "constitution", increase: 1 },
  { raceId: "human", abilityId: "intelligence", increase: 1 },
  { raceId: "human", abilityId: "wisdom", increase: 1 },
  { raceId: "human", abilityId: "charisma", increase: 1 },
  { raceId: "dragonborn", abilityId: "strength", increase: 2 },
  { raceId: "dragonborn", abilityId: "charisma", increase: 1 },
  { raceId: "gnome", abilityId: "intelligence", increase: 2 },
  // TODO: half-elf 2 choices
  { raceId: "half-orc", abilityId: "strength", increase: 2 },
  { raceId: "half-orc", abilityId: "constitution", increase: 1 },
  { raceId: "tiefling", abilityId: "intelligence", increase: 2 },
  { raceId: "tiefling", abilityId: "charisma", increase: 1 },
]
