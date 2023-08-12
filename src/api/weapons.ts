export const weapons = {
  // simple melee
  club: "Club",
  dagger: "Dagger",
  greatclub: "Greatclub",
  handaxe: "Handaxe",
  javelin: "Javelin",
  "light-hammer": "Light hammer",
  mace: "Mace",
  quarterstaff: "Quarterstaff",
  sickle: "Sickle",
  spear: "Spear",
  // simple ranged
  "crossbow-light": "Crossbow, light",
  dart: "Dart",
  shortbow: "Shortbow",
  sling: "Sling",
  // martial melee
  battleaxe: "Battleaxe",
  flail: "Flail",
  glaive: "Glaive",
  greataxe: "Greataxe",
  greatsword: "Greatsword",
  halberd: "Halberd",
  lance: "Lance",
  longsword: "Longsword",
  maul: "Maul",
  morningstar: "Morningstar",
  pike: "Pike",
  rapier: "Rapier",
  scimitar: "Scimitar",
  shortsword: "Shortsword",
  trident: "Trident",
  "war-pick": "War pick",
  warhammer: "Warhammer",
  whip: "Whip",
  // martial ranged
  // TODO: blowgun
  "crossbow-hand": "Crossbow, hand",
  "crossbow-heavy": "Crossbow, heavy",
  longbow: "Longbow",
  // TODO: net
}

// eg 1d4, 2d6, 10d10
type Roll = {
  count: number
  die: 4 | 6 | 8 | 10 | 12 | 20
}

type DamageType = "bludgeoning" | "piercing" | "slashing"

type Weapon = {
  roll: Roll
  damageType: DamageType
  type: "melee" | "ranged"
}

// prettier-ignore
export const weaponData: Record<keyof typeof weapons, Weapon> = {
  // simple melee
  club:           { roll: { count: 1, die: 4 }, damageType: "bludgeoning", type: 'melee' },
  dagger:         { roll: { count: 1, die: 4 }, damageType: "piercing",    type: 'melee' },
  greatclub:      { roll: { count: 1, die: 8 }, damageType: "bludgeoning", type: 'melee' },
  handaxe:        { roll: { count: 1, die: 6 }, damageType: "slashing",    type: 'melee' },
  javelin:        { roll: { count: 1, die: 6 }, damageType: "piercing",    type: 'melee' },
  "light-hammer": { roll: { count: 1, die: 4 }, damageType: "bludgeoning", type: 'melee' },
  mace:           { roll: { count: 1, die: 6 }, damageType: "bludgeoning", type: 'melee' },
  quarterstaff:   { roll: { count: 1, die: 6 }, damageType: "bludgeoning", type: 'melee' },
  sickle:         { roll: { count: 1, die: 4 }, damageType: "slashing",    type: 'melee' },
  spear:          { roll: { count: 1, die: 6 }, damageType: "piercing",    type: 'melee' },
  // simple ranged
  "crossbow-light": { roll: { count: 1, die: 8 }, damageType: "piercing",    type: 'ranged' },
  dart:             { roll: { count: 1, die: 4 }, damageType: "piercing",    type: 'ranged' },
  shortbow:         { roll: { count: 1, die: 6 }, damageType: "piercing",    type: 'ranged' },
  sling:            { roll: { count: 1, die: 4 }, damageType: "bludgeoning", type: 'ranged' },
  // martial melee
  battleaxe:   { roll: { count: 1, die: 8 },  damageType: "slashing",    type: 'melee' },
  flail:       { roll: { count: 1, die: 8 },  damageType: "bludgeoning", type: 'melee' },
  glaive:      { roll: { count: 1, die: 10 }, damageType: "slashing",    type: 'melee' },
  greataxe:    { roll: { count: 1, die: 12 }, damageType: "slashing",    type: 'melee' },
  greatsword:  { roll: { count: 2, die: 6 },  damageType: "slashing",    type: 'melee' },
  halberd:     { roll: { count: 1, die: 10 }, damageType: "slashing",    type: 'melee' },
  lance:       { roll: { count: 1, die: 12 }, damageType: "bludgeoning", type: 'melee' },
  longsword:   { roll: { count: 1, die: 8 },  damageType: "slashing",    type: 'melee' },
  maul:        { roll: { count: 2, die: 6 },  damageType: "bludgeoning", type: 'melee' },
  morningstar: { roll: { count: 1, die: 8 },  damageType: "piercing",    type: 'melee' },
  pike:        { roll: { count: 1, die: 10 }, damageType: "piercing",    type: 'melee' },
  rapier:      { roll: { count: 1, die: 8 },  damageType: "piercing",    type: 'melee' },
  scimitar:    { roll: { count: 1, die: 6 },  damageType: "slashing",    type: 'melee' },
  shortsword:  { roll: { count: 1, die: 6 },  damageType: "piercing",    type: 'melee' },
  trident:     { roll: { count: 1, die: 6 },  damageType: "piercing",    type: 'melee' },
  "war-pick":  { roll: { count: 1, die: 8 },  damageType: "piercing",    type: 'melee' },
  warhammer:   { roll: { count: 1, die: 8 },  damageType: "bludgeoning", type: 'melee' },
  whip:        { roll: { count: 1, die: 4 },  damageType: "slashing",    type: 'melee' },
  // martial ranged
  // blowgun - 1 piercing
  "crossbow-hand":  { roll: { count: 1, die: 4 }, damageType: "piercing", type: 'ranged' },
  "crossbow-heavy": { roll: { count: 1, die: 4 }, damageType: "piercing", type: 'ranged' },
  longbow:          { roll: { count: 1, die: 4 }, damageType: "piercing", type: 'ranged' },
  // net - null
}
