import { SafeParseError } from "zod"
import {
  CharacterNameSchema,
  characterNameSchema,
} from "../characterNameSchema"

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
