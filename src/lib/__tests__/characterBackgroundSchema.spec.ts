import { SafeParseError } from "zod"
import {
  CharacterBackgroundSchema,
  characterBackgroundSchema,
} from "../characterBackgroundSchema"

test("fail with empty background", () => {
  const data: CharacterBackgroundSchema = { background: "" }
  const result = characterBackgroundSchema.safeParse(
    data,
  ) as SafeParseError<CharacterBackgroundSchema>

  expect(result.success).toBe(false)
  expect(result.error.issues[0].message).toBe("Background is required")
})

test("fail when choices are undefined", () => {
  const data: CharacterBackgroundSchema = {
    background: "Acolyte",
    backgroundSkillProficiencyChoices: undefined,
  }
  const result = characterBackgroundSchema.safeParse(
    data,
  ) as SafeParseError<CharacterBackgroundSchema>

  expect(result.success).toBe(false)
  expect(result.error.issues[0].message).toBe("Must select 2 skills")
})

test("fail when choices less than 2", () => {
  const data: CharacterBackgroundSchema = {
    background: "Acolyte",
    backgroundSkillProficiencyChoices: ["acrobatics"],
  }
  const result = characterBackgroundSchema.safeParse(
    data,
  ) as SafeParseError<CharacterBackgroundSchema>

  expect(result.success).toBe(false)
  expect(result.error.issues[0].message).toBe("Must select 2 skills")
})

test("fail when choices more than 2", () => {
  const data: CharacterBackgroundSchema = {
    background: "Acolyte",
    backgroundSkillProficiencyChoices: [
      "acrobatics",
      "animal-handling",
      "arcana",
    ],
  }
  const result = characterBackgroundSchema.safeParse(
    data,
  ) as SafeParseError<CharacterBackgroundSchema>

  expect(result.success).toBe(false)
  expect(result.error.issues[0].message).toBe("Must select 2 skills")
})

test("pass when choices equal 2", () => {
  const data: CharacterBackgroundSchema = {
    background: "Acolyte",
    backgroundSkillProficiencyChoices: ["acrobatics", "animal-handling"],
  }
  const result = characterBackgroundSchema.safeParse(
    data,
  ) as SafeParseError<CharacterBackgroundSchema>

  expect(result.success).toBe(true)
})
