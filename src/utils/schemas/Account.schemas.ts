import * as z from "zod";

export const schemaAccount = z.object({
    name: z.string(),
    total: z.number().optional().default(0),
    instituition: z.string()
})

export type TSchemaAccount = z.infer<typeof schemaAccount>