// TODO:
// - strength requirement
// - stealth disadvantage
// - cost
// - weight
export type Armor =
  | "padded"
  | "leather"
  | "studded-leather"
  | "hide"
  | "chain-shirt"
  | "scale-mail"
  | "breastplate"
  | "half-plate"
  | "ring-mail"
  | "chain-mail"
  | "splint"
  | "plate"

// light -> + dex modifier
// medium -> + dex modifier (max 2)
// heavy -> no modifier
export type ArmorType = "light" | "medium" | "heavy"

// prettier-ignore
export const armor: Record<
  Armor,
  { name: string; armorClass: number; type: ArmorType }
> = {
  // light
  "padded":          { name: "Padded",          armorClass: 11, type: 'light' },
  "leather":         { name: "Leather",         armorClass: 11, type: 'light' },
  "studded-leather": { name: "Studded leather", armorClass: 12, type: 'light' },
  // medium
  "hide":        { name: "Hide",        armorClass: 12, type: 'medium' },
  "chain-shirt": { name: "Chain shirt", armorClass: 13, type: 'medium' },
  "scale-mail":  { name: "Scale mail",  armorClass: 14, type: 'medium' },
  "breastplate": { name: "Breastplate", armorClass: 14, type: 'medium' },
  "half-plate":  { name: "Half plate",  armorClass: 15, type: 'medium' },
  // heavy
  "ring-mail":  { name: "Ring mail",  armorClass: 14, type: 'heavy' },
  "chain-mail": { name: "Chain mail", armorClass: 16, type: 'heavy' },
  "splint":     { name: "Splint",     armorClass: 17, type: 'heavy' },
  "plate":      { name: "Plate",      armorClass: 18, type: 'heavy' },
}
