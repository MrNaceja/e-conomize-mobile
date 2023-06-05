import * as z from "zod";
import { ETransactionTypes } from 'utils/interfaces/TransactionDTO';

export const schemaTransaction = z.object({
    value: z.number().nonnegative(),
    description: z.string(),
    type: z.nativeEnum(ETransactionTypes)
})

export type TSchemaTransaction = z.infer<typeof schemaTransaction>