import { Class } from "../../api/classes"
import { getMaxHitPoints, getProficiencyBonus } from "../core"

describe("getProficiencyBonus", () => {
  test.each([
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 3],
    [6, 3],
    [7, 3],
    [8, 3],
    [9, 4],
    [10, 4],
    [11, 4],
    [12, 4],
    [13, 5],
    [14, 5],
    [15, 5],
    [16, 5],
    [17, 6],
    [18, 6],
    [19, 6],
    [20, 6],
  ])("level %i: +%i", (level, bonus) => {
    expect(getProficiencyBonus(level)).toBe(bonus)
  })
})

describe("getMaxHitPoints", () => {
  test("calculate undefined class max hit points", () => {
    expect(getMaxHitPoints(undefined, 1, 0)).toBe(0)
  })

  describe("calculate 1st level max hit points", () => {
    test.each([
      ["barbarian", 12],
      ["bard", 8],
      ["cleric", 8],
      ["druid", 8],
      ["fighter", 10],
      ["monk", 8],
      ["paladin", 10],
      ["ranger", 10],
      ["rogue", 8],
      ["sorcerer", 6],
      ["warlock", 8],
      ["wizard", 6],
    ])("%s: %i", (classId, hitDice) => {
      expect(getMaxHitPoints(classId as Class, 1, 0)).toBe(hitDice)
    })
  })
})
