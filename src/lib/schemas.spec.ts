import { SafeParseError } from "zod"
import {
  CharacterBackgroundSchema,
  CharacterClassSchema,
  CharacterNameSchema,
  CharacterRaceSchema,
  characterBackgroundSchema,
  characterClassSchema,
  characterNameSchema,
  characterRaceSchema,
} from "./types"

describe("characterNameSchema", () => {
  test("fail with empty string", () => {
    const data: CharacterNameSchema = { name: "" }
    const result = characterNameSchema.safeParse(
      data,
    ) as SafeParseError<CharacterNameSchema>

    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe("Name is required")
  })

  test("pass with string", () => {
    const data: CharacterNameSchema = { name: "Untitled" }
    const result = characterNameSchema.safeParse(
      data,
    ) as SafeParseError<CharacterNameSchema>

    expect(result.success).toBe(true)
  })
})

describe("characterRaceSchema", () => {
  test("pass with race", () => {
    const data: CharacterRaceSchema = { raceId: "dwarf" }
    const result = characterRaceSchema.safeParse(
      data,
    ) as SafeParseError<CharacterRaceSchema>

    expect(result.success).toBe(true)
  })
})

describe("characterClassSchema", () => {
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
    expect(result.error.issues[0].message).toBe("Must select 2 skills")
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
    expect(result.error.issues[0].message).toBe("Must select 2 skills")
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
})

describe("characterBackgroundSchema", () => {
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
})
