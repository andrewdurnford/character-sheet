import { abilities, skills } from "./abilities"
import { classes, _classIds } from "./classes"
import { armor } from "./equipment"
import { races, _raceIds } from "./races"
import { weapons, weaponData } from "./weapons"

export const api = {
  abilities,
  skills,
  races,
  classes,
  armor,
  weapons,
  weaponData,
  _raceIds,
  _classIds,
}

export type { Ability, Skill } from "./abilities"
export type { Armor } from "./equipment"
export type { Class } from "./classes"
export type { Race } from "./races"
