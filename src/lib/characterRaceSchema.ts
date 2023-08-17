import { z } from "zod"

export const characterRaceSchema = z
  .object({
    raceId: z.union([
      z.literal("dwarf", { errorMap: () => ({ message: "Race is required" }) }),
      z.literal("elf"),
      z.literal("halfling"),
      z.literal("human"),
      z.literal("dragonborn"),
      z.literal("gnome"),
      z.literal("half-elf"),
      z.literal("half-orc"),
      z.literal("tiefling"),
    ]),
    abilityScoreIncreaseChoices: z
      .union([
        z.literal("strength"),
        z.literal("dexterity"),
        z.literal("constitution"),
        z.literal("intelligence"),
        z.literal("wisdom"),
        z.literal("charisma"),
      ])
      .array()
      .optional(),
    hasChoice: z.boolean(),
  })
  .refine(
    (data) =>
      data.hasChoice ? data.abilityScoreIncreaseChoices?.length === 2 : true,
    {
      message: "Select 2 additional abilities",
      path: ["abilityScoreIncreaseChoices"],
    },
  )

export type CharacterRaceSchema = z.infer<typeof characterRaceSchema>
