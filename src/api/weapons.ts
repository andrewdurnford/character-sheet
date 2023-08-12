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

type Damage = {
  roll: Roll
  type: "bludgeoning" | "piercing" | "slashing"
}

export const weaponDamage: Record<keyof typeof weapons, Damage> = {
  // simple melee
  club: { roll: { count: 1, die: 4 }, type: "bludgeoning" },
  dagger: { roll: { count: 1, die: 4 }, type: "piercing" },
  greatclub: { roll: { count: 1, die: 8 }, type: "bludgeoning" },
  handaxe: { roll: { count: 1, die: 6 }, type: "slashing" },
  javelin: { roll: { count: 1, die: 6 }, type: "piercing" },
  "light-hammer": { roll: { count: 1, die: 4 }, type: "bludgeoning" },
  mace: { roll: { count: 1, die: 6 }, type: "bludgeoning" },
  quarterstaff: { roll: { count: 1, die: 6 }, type: "bludgeoning" },
  sickle: { roll: { count: 1, die: 4 }, type: "slashing" },
  spear: { roll: { count: 1, die: 6 }, type: "piercing" },
  // simple ranged
  "crossbow-light": { roll: { count: 1, die: 8 }, type: "piercing" },
  dart: { roll: { count: 1, die: 4 }, type: "piercing" },
  shortbow: { roll: { count: 1, die: 6 }, type: "piercing" },
  sling: { roll: { count: 1, die: 4 }, type: "bludgeoning" },
  // martial melee
  battleaxe: { roll: { count: 1, die: 8 }, type: "slashing" },
  flail: { roll: { count: 1, die: 8 }, type: "bludgeoning" },
  glaive: { roll: { count: 1, die: 10 }, type: "slashing" },
  greataxe: { roll: { count: 1, die: 12 }, type: "slashing" },
  greatsword: { roll: { count: 2, die: 6 }, type: "slashing" },
  halberd: { roll: { count: 1, die: 10 }, type: "slashing" },
  lance: { roll: { count: 1, die: 12 }, type: "bludgeoning" },
  longsword: { roll: { count: 1, die: 8 }, type: "slashing" },
  maul: { roll: { count: 2, die: 6 }, type: "bludgeoning" },
  morningstar: { roll: { count: 1, die: 8 }, type: "piercing" },
  pike: { roll: { count: 1, die: 10 }, type: "piercing" },
  rapier: { roll: { count: 1, die: 8 }, type: "piercing" },
  scimitar: { roll: { count: 1, die: 6 }, type: "slashing" },
  shortsword: { roll: { count: 1, die: 6 }, type: "piercing" },
  trident: { roll: { count: 1, die: 6 }, type: "piercing" },
  "war-pick": { roll: { count: 1, die: 8 }, type: "piercing" },
  warhammer: { roll: { count: 1, die: 8 }, type: "bludgeoning" },
  whip: { roll: { count: 1, die: 4 }, type: "slashing" },
  // martial ranged
  // blowgun - 1 piercing
  "crossbow-hand": { roll: { count: 1, die: 4 }, type: "piercing" },
  "crossbow-heavy": { roll: { count: 1, die: 4 }, type: "piercing" },
  longbow: { roll: { count: 1, die: 4 }, type: "piercing" },
  // net - null
}
