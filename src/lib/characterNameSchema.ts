import { z } from "zod"

export const characterNameSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .nonempty("Name is required"),
})

export type CharacterNameSchema = z.infer<typeof characterNameSchema>
