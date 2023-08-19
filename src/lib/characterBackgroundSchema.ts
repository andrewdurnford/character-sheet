import { z } from "zod"

export const characterBackgroundSchema = z
  .object({
    background: z
      .string({ required_error: "Background is required" })
      .nonempty("Background is required"),
    backgroundCharacteristics: z.object({
      trait1: z.string().optional(),
      trait2: z.string().optional(),
      ideals: z.string().optional(),
      bonds: z.string().optional(),
      flaws: z.string().optional(),
    }),
    backgroundSkillProficiencyChoices: z
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
  // TODO: add characteristics: personality traits, ideals, bonds, flaws
  // TODO: submitting empty choices validates as 'Expected array, received boolean'
  .refine((data) => data.backgroundSkillProficiencyChoices?.length === 2, {
    message: `Select 2 skills`,
    path: ["backgroundSkillProficiencyChoices"],
  })

export type CharacterBackgroundSchema = z.infer<
  typeof characterBackgroundSchema
>
