import * as z from "zod";
import { ETransactionTypes } from 'utils/interfaces/TransactionDTO';

export const schemaTransaction = z.object({
    value: z.number().nonnegative().min(0.01, 'Ops, precisamos definir um valor para esta transação'),
    description: z.string().nonempty('Ops, precisamos identificar esta transação'),
    type: z.nativeEnum(ETransactionTypes)
})

export type TSchemaTransaction = z.infer<typeof schemaTransaction>