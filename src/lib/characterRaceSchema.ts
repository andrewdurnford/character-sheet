import { z } from "zod"

export const characterRaceSchema = z.object({
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
})

export type CharacterRaceSchema = z.infer<typeof characterRaceSchema>
