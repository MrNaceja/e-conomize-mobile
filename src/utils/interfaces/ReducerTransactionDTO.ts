import { TTransaction } from "./TransactionDTO"

export type TTransactionState = {
    transactions: TTransaction[]
}

export enum ETransactionActionTypes {
    CREATE  = "CREATE_ACCOUNT",
    EDIT    = "EDIT_ACCOUNT",
    DELETE  = "DELETE_ACCOUNT"
}

export type TTransactionAction = {
    action: ETransactionActionTypes,
    transaction: TTransaction
}

export const TRANSACTION_INITIAL_STATE : TTransactionState = {
    transactions: [
        {
            createdAt: '17/06/2023',
            description: 'Teste1',
            value: 10,
            type: 'expense',
            id: '1k23hi23bgk2jh232fdsfvretgrn23',
            accountId: 'mercadopago'
        },
        {
            createdAt: '17/06/2023',
            description: 'Teste2',
            value: 100,
            type: 'gain',
            id: '1k23hi23bg56565623',
            accountId: 'nubank'
        },
        {
            createdAt: '17/06/2023',
            description: 'Teste3',
            value: 10.50,
            type: 'gain',
            id: '1k23hi23bgk32452343456n23',
            accountId: 'nubank'
        },
        {
            createdAt: '17/06/2023',
            description: 'Teste4',
            value: 100,
            type: 'expense',
            id: '1k23hi23bg3454356jn23',
            accountId: 'nubank'
        },
        {
            createdAt: '16/06/2023',
            description: 'Teste5',
            value: 50,
            type: 'gain',
            id: '1k23hi454534jh3bjn23',
            accountId: 'nubank'
        },
    ]
}