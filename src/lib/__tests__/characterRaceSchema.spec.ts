import { SafeParseError } from "zod"
import {
  CharacterRaceSchema,
  characterRaceSchema,
} from "../characterRaceSchema"

test("pass with race", () => {
  const data: CharacterRaceSchema = { raceId: "dwarf", hasChoice: false }
  const result = characterRaceSchema.safeParse(
    data,
  ) as SafeParseError<CharacterRaceSchema>

  expect(result.success).toBe(true)
})
