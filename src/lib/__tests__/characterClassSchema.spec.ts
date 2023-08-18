import { SafeParseError } from "zod"
import {
  CharacterClassSchema,
  characterClassSchema,
} from "../characterClassSchema"

test("fail when choices less than select", () => {
  const data: CharacterClassSchema = {
    classId: "barbarian",
    level: 1,
    select: 2,
    skillProficiencyChoices: ["acrobatics"],
  }
  const result = characterClassSchema.safeParse(
    data,
  ) as SafeParseError<CharacterClassSchema>

  expect(result.success).toBe(false)
  expect(result.error.issues[0].message).toBe("Select 2 skills")
})

test("fail when choices more than select", () => {
  const data: CharacterClassSchema = {
    classId: "barbarian",
    level: 1,
    select: 2,
    skillProficiencyChoices: ["acrobatics", "animal-handling", "arcana"],
  }
  const result = characterClassSchema.safeParse(
    data,
  ) as SafeParseError<CharacterClassSchema>

  expect(result.success).toBe(false)
  expect(result.error.issues[0].message).toBe("Select 2 skills")
})

test("pass when choices equal select", () => {
  const data: CharacterClassSchema = {
    classId: "barbarian",
    level: 1,
    select: 2,
    skillProficiencyChoices: ["acrobatics", "animal-handling"],
  }
  const result = characterClassSchema.safeParse(
    data,
  ) as SafeParseError<CharacterClassSchema>

  expect(result.success).toBe(true)
})
