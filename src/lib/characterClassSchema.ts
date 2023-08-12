import { z } from "zod"

export const characterClassSchema = z
  .object({
    classId: z.union([
      z.literal("barbarian", {
        errorMap: () => ({ message: "Class is required" }),
      }),
      z.literal("bard"),
      z.literal("cleric"),
      z.literal("druid"),
      z.literal("fighter"),
      z.literal("monk"),
      z.literal("paladin"),
      z.literal("ranger"),
      z.literal("rogue"),
      z.literal("sorcerer"),
      z.literal("warlock"),
      z.literal("wizard"),
    ]),
    level: z
      .number()
      .min(1, { message: "Level must be between 1 and 20" })
      .max(20, { message: "Level must be between 1 and 20" }),
    select: z.number(),
    // TODO: add filter to check proficiency is from list
    skillProficiencyChoices: z
      .union([
        z.literal("acrobatics"),
        z.literal("animal-handling"),
        z.literal("athletics"),
        z.literal("arcana"),
        z.literal("deception"),
        z.literal("athletics"),
        z.literal("history"),
        z.literal("deception"),
        z.literal("insight"),
        z.literal("history"),
        z.literal("intimidation"),
        z.literal("insight"),
        z.literal("investigation"),
        z.literal("intimidation"),
        z.literal("medicine"),
        z.literal("investigation"),
        z.literal("nature"),
        z.literal("medicine"),
        z.literal("perception"),
        z.literal("nature"),
        z.literal("performance"),
        z.literal("perception"),
        z.literal("persuasion"),
        z.literal("performance"),
        z.literal("religion"),
        z.literal("persuasion"),
        z.literal("sleight-of-hand"),
        z.literal("stealth"),
        z.literal("religion"),
        z.literal("survival"),
        z.literal("stealth"),
        z.literal("survival"),
      ])
      .array()
      .optional(),
  })
  .refine(
    (data) => data.select === data.skillProficiencyChoices?.length,
    (data) => ({
      message: `Must select ${data.select} skills`,
      path: ["skillProficiencyChoices"],
    }),
  )

export type CharacterClassSchema = z.infer<typeof characterClassSchema>
