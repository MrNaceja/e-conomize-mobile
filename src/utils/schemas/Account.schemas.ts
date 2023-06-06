import * as z from "zod";

export const schemaAccount = z.object({
    name: z.string(),
    instituition: z.string()
})

export type TSchemaAccount = z.infer<typeof schemaAccount>