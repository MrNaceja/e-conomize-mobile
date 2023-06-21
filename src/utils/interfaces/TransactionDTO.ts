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
    account: TAccount['id']
}

export type TTransactionsByDate = {
    title: string,
    data: TTransaction[]
}

export const TRANSACTIONS : TTransaction[] = [
    {
        createdAt: '17/06/2023',
        description: 'Teste1',
        value: 10,
        type: 'expense',
        id: '1k23hi23bgk2jh232fdsfvretgrn23',
        account: 'mercadopago'
    },
    {
        createdAt: '17/06/2023',
        description: 'Teste2',
        value: 100,
        type: 'gain',
        id: '1k23hi23bg56565623',
        account: 'nubank'
    },
    {
        createdAt: '17/06/2023',
        description: 'Teste3',
        value: 10.50,
        type: 'gain',
        id: '1k23hi23bgk32452343456n23',
        account: 'nubank'
    },
    {
        createdAt: '17/06/2023',
        description: 'Teste4',
        value: 100,
        type: 'expense',
        id: '1k23hi23bg3454356jn23',
        account: 'nubank'
    },
    {
        createdAt: '16/06/2023',
        description: 'Teste5',
        value: 50,
        type: 'gain',
        id: '1k23hi454534jh3bjn23',
        account: 'nubank'
    },
]