
import { ACCOUNT_COLORS_HIGHLIGHT } from "utils/interfaces/AccountDTO";
import * as z from "zod";

export const schemaAccount = z.object({
    name: z.string().nonempty('Ops, precisamos que defina o nome desta conta'),
    total: z.number().optional().default(0),
    instituition: z.string().nonempty('Ops, precisamos que defina uma instituição que represente esta conta'),
    color: z.enum(ACCOUNT_COLORS_HIGHLIGHT)
})

export type TSchemaAccount = z.infer<typeof schemaAccount>