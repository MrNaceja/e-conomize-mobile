import { TAccount } from "./AccountDTO"

export type TTransactionType = 'gain' | 'expense'

export enum ETransactionTypes {
    GAIN    = "gain",
    EXPENSE = "expense"
}

export type TTransaction = {
    id: string,
    value: number,
    description: string,
    type: TTransactionType,
    createdAt: string,
    accountId?: TAccount['id']
}

export type TTransactionsByDate = {
    title: string,
    data: TTransaction[]
}