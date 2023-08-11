import { z } from "zod"

export const characterNameSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .nonempty("Name is required"),
})

export type CharacterNameSchema = z.infer<typeof characterNameSchema>

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

export const characterBackgroundSchema = z
  .object({
    background: z
      .string({ required_error: "Background is required" })
      .nonempty("Background is required"),
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
    message: `Must select 2 skills`,
    path: ["backgroundSkillProficiencyChoices"],
  })

export type CharacterBackgroundSchema = z.infer<
  typeof characterBackgroundSchema
>
