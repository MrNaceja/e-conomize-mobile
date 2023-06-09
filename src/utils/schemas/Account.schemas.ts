import { TAccountColorHighlight } from "utils/interfaces/AccountDTO";

import * as z from "zod";

export const schemaAccount = z.object({
    name: z.string(),
    total: z.number().optional().default(0),
    instituition: z.string(),
    color: z.enum<TAccountColorHighlight, [TAccountColorHighlight]>(['green'])
})

export type TSchemaAccount = z.infer<typeof schemaAccount>