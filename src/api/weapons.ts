export type Weapon =
  | "club"
  | "dagger"
  | "greatclub"
  | "handaxe"
  | "javelin"
  | "light-hammer"
  | "mace"
  | "quarterstaff"
  | "sickle"
  | "spear"
  | "crossbow-light"
  | "dart"
  | "shortbow"
  | "sling"
  | "battleaxe"
  | "flail"
  | "glaive"
  | "greataxe"
  | "greatsword"
  | "halberd"
  | "lance"
  | "longsword"
  | "maul"
  | "morningstar"
  | "pike"
  | "rapier"
  | "scimitar"
  | "shortsword"
  | "trident"
  | "war-pick"
  | "warhammer"
  | "whip"
  | "crossbow-hand"
  | "crossbow-heavy"
  | "longbow"

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

export type WeaponCategory = "simple" | "martial"
export type WeaponType = "melee" | "ranged"
export type DamageType = "bludgeoning" | "piercing" | "slashing"

// prettier-ignore
export const weaponData: Record<
  keyof typeof weapons,
  {
    roll: Roll
    damageType: DamageType
    type: WeaponType
    category: WeaponCategory
  }
> = {
  // simple melee
  club:           { roll: { count: 1, die: 4 }, damageType: "bludgeoning", type: 'melee', category: 'simple' },
  dagger:         { roll: { count: 1, die: 4 }, damageType: "piercing",    type: 'melee', category: 'simple' },
  greatclub:      { roll: { count: 1, die: 8 }, damageType: "bludgeoning", type: 'melee', category: 'simple' },
  handaxe:        { roll: { count: 1, die: 6 }, damageType: "slashing",    type: 'melee', category: 'simple' },
  javelin:        { roll: { count: 1, die: 6 }, damageType: "piercing",    type: 'melee', category: 'simple' },
  "light-hammer": { roll: { count: 1, die: 4 }, damageType: "bludgeoning", type: 'melee', category: 'simple' },
  mace:           { roll: { count: 1, die: 6 }, damageType: "bludgeoning", type: 'melee', category: 'simple' },
  quarterstaff:   { roll: { count: 1, die: 6 }, damageType: "bludgeoning", type: 'melee', category: 'simple' },
  sickle:         { roll: { count: 1, die: 4 }, damageType: "slashing",    type: 'melee', category: 'simple' },
  spear:          { roll: { count: 1, die: 6 }, damageType: "piercing",    type: 'melee', category: 'simple' },
  // simple ranged
  "crossbow-light": { roll: { count: 1, die: 8 }, damageType: "piercing",    type: 'ranged', category: 'simple' },
  dart:             { roll: { count: 1, die: 4 }, damageType: "piercing",    type: 'ranged', category: 'simple' },
  shortbow:         { roll: { count: 1, die: 6 }, damageType: "piercing",    type: 'ranged', category: 'simple' },
  sling:            { roll: { count: 1, die: 4 }, damageType: "bludgeoning", type: 'ranged', category: 'simple' },
  // martial melee
  battleaxe:   { roll: { count: 1, die: 8 },  damageType: "slashing",    type: 'melee', category: 'martial' },
  flail:       { roll: { count: 1, die: 8 },  damageType: "bludgeoning", type: 'melee', category: 'martial' },
  glaive:      { roll: { count: 1, die: 10 }, damageType: "slashing",    type: 'melee', category: 'martial' },
  greataxe:    { roll: { count: 1, die: 12 }, damageType: "slashing",    type: 'melee', category: 'martial' },
  greatsword:  { roll: { count: 2, die: 6 },  damageType: "slashing",    type: 'melee', category: 'martial' },
  halberd:     { roll: { count: 1, die: 10 }, damageType: "slashing",    type: 'melee', category: 'martial' },
  lance:       { roll: { count: 1, die: 12 }, damageType: "bludgeoning", type: 'melee', category: 'martial' },
  longsword:   { roll: { count: 1, die: 8 },  damageType: "slashing",    type: 'melee', category: 'martial' },
  maul:        { roll: { count: 2, die: 6 },  damageType: "bludgeoning", type: 'melee', category: 'martial' },
  morningstar: { roll: { count: 1, die: 8 },  damageType: "piercing",    type: 'melee', category: 'martial' },
  pike:        { roll: { count: 1, die: 10 }, damageType: "piercing",    type: 'melee', category: 'martial' },
  rapier:      { roll: { count: 1, die: 8 },  damageType: "piercing",    type: 'melee', category: 'martial' },
  scimitar:    { roll: { count: 1, die: 6 },  damageType: "slashing",    type: 'melee', category: 'martial' },
  shortsword:  { roll: { count: 1, die: 6 },  damageType: "piercing",    type: 'melee', category: 'martial' },
  trident:     { roll: { count: 1, die: 6 },  damageType: "piercing",    type: 'melee', category: 'martial' },
  "war-pick":  { roll: { count: 1, die: 8 },  damageType: "piercing",    type: 'melee', category: 'martial' },
  warhammer:   { roll: { count: 1, die: 8 },  damageType: "bludgeoning", type: 'melee', category: 'martial' },
  whip:        { roll: { count: 1, die: 4 },  damageType: "slashing",    type: 'melee', category: 'martial' },
  // martial ranged
  // blowgun - 1 piercing
  "crossbow-hand":  { roll: { count: 1, die: 4 }, damageType: "piercing", type: 'ranged', category: 'martial' },
  "crossbow-heavy": { roll: { count: 1, die: 4 }, damageType: "piercing", type: 'ranged', category: 'martial' },
  longbow:          { roll: { count: 1, die: 4 }, damageType: "piercing", type: 'ranged', category: 'martial' },
  // net - null
}
