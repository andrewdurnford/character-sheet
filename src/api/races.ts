import { Ability } from "."

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

export const _raceIds: Race[] = [
  "dwarf",
  "elf",
  "halfling",
  "human",
  "dragonborn",
  "gnome",
  "half-elf",
  "half-orc",
  "tiefling",
]

const raceDictionary: Record<Race, string> = {
  dwarf: "Dwarf",
  elf: "Elf",
  halfling: "Halfling",
  human: "Human",
  dragonborn: "Dragonborn",
  gnome: "Gnome",
  "half-elf": "Half-Elf",
  "half-orc": "Half-Orc",
  tiefling: "Tiefling",
}

type RaceAbilityScoreIncrease = {
  abilityId: Ability | null
  increase: number
}

const raceAbilityScoreIncreases: Record<Race, RaceAbilityScoreIncrease[]> = {
  dwarf: [{ abilityId: "constitution", increase: 2 }],
  elf: [{ abilityId: "dexterity", increase: 2 }],
  halfling: [{ abilityId: "constitution", increase: 2 }],
  human: [
    { abilityId: "strength", increase: 1 },
    { abilityId: "dexterity", increase: 1 },
    { abilityId: "constitution", increase: 1 },
    { abilityId: "intelligence", increase: 1 },
    { abilityId: "wisdom", increase: 1 },
    { abilityId: "charisma", increase: 1 },
  ],
  dragonborn: [
    { abilityId: "strength", increase: 2 },
    { abilityId: "charisma", increase: 1 },
  ],
  gnome: [{ abilityId: "intelligence", increase: 2 }],
  "half-elf": [
    { abilityId: "charisma", increase: 2 },
    { abilityId: null, increase: 1 },
    { abilityId: null, increase: 1 },
  ],
  "half-orc": [
    { abilityId: "strength", increase: 2 },
    { abilityId: "constitution", increase: 1 },
  ],
  tiefling: [
    { abilityId: "intelligence", increase: 2 },
    { abilityId: "charisma", increase: 1 },
  ],
}

// TODO:
// age
// alignment
// size
type RaceDetails = { speed: number }

const raceDetails: Record<Race, RaceDetails> = {
  dwarf: { speed: 25 },
  elf: { speed: 30 },
  halfling: { speed: 25 },
  human: { speed: 30 },
  dragonborn: { speed: 30 },
  gnome: { speed: 25 },
  "half-elf": { speed: 30 },
  "half-orc": { speed: 30 },
  tiefling: { speed: 30 },
}

// NOTE: each race may contain 1 subrace
const raceSubraces: Record<Race, Subrace | null> = {
  dwarf: "hill-dwarf",
  elf: "high-elf",
  halfling: null,
  human: "lightfoot",
  dragonborn: null,
  gnome: "rock-gnome",
  "half-elf": null,
  "half-orc": null,
  tiefling: null,
}

type Subrace = "hill-dwarf" | "high-elf" | "lightfoot" | "rock-gnome"

const subraceDictionary: Record<Subrace, string> = {
  "hill-dwarf": "Hill Dwarf",
  "high-elf": "High Elf",
  lightfoot: "Lightfoot",
  "rock-gnome": "Rock Gnome",
}

// NOTE: each subrace only contails a single increase of +1
const subraceAbilityScoreIncreases: Record<Subrace, Ability> = {
  "hill-dwarf": "wisdom",
  "high-elf": "intelligence",
  lightfoot: "charisma",
  "rock-gnome": "constitution",
}

type RaceSubrace = {
  name: string
  abilityScoreIncrease: Ability
} | null

type RaceTable = Record<
  Race,
  {
    name: string
    abilityScoreIncreases: RaceAbilityScoreIncrease[]
    details: RaceDetails
    subrace: RaceSubrace
  }
>

export const races: RaceTable = _raceIds.reduce((acc, raceId) => {
  const subraceId = raceSubraces[raceId]
  const subrace = !subraceId
    ? null
    : {
        name: subraceDictionary[subraceId],
        abilityScoreIncrease: subraceAbilityScoreIncreases[subraceId],
      }

  acc[raceId] = {
    name: raceDictionary[raceId],
    abilityScoreIncreases: raceAbilityScoreIncreases[raceId],
    details: raceDetails[raceId],
    subrace,
  }
  return acc
}, {} as RaceTable)
