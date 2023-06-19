import { TAccount } from "./AccountDTO"
import { TTransaction } from "./TransactionDTO"

export type TAccountState = {
    accounts: TAccount[],
    transactions: TTransaction[]
    accountSelected: TAccount['id'] | null
}

export enum EAccountActionTypes {
    LOAD_STATE = "LOAD_STATE_ACCOUNT",

    ACCOUNT_CREATE          = "CREATE_ACCOUNT",
    ACCOUNT_EDIT            = "EDIT_ACCOUNT",
    ACCOUNT_DELETE          = "DELETE_ACCOUNT",
    ACCOUNT_CHANGE_SELECTED = "CHANGE_SELECTED_ACCOUNT",

    TRANSACTION_CREATE = 'CREATE_TRANSACTION',
    TRANSACTION_EDIT   = "EDIT_TRANSACTION",
    TRANSACTION_DELETE = "DELETE_TRANSACTION",
}

export type TAccountAction = {
    action: EAccountActionTypes,
    payload: TAccountState | 
            TAccount       | TAccount['id']   |
            TTransaction   | TTransaction['id']
}

export const ACCOUNT_INITIAL_STATE : TAccountState = {
    accounts: [
        {
            color: 'violet',
            id: 'nubank',
            instituition: 'Nubank',
            name: 'Principal',
            total: 0
        },
        {
            color: 'rose',
            id: 'teste',
            instituition: 'Nubank',
            name: 'Teste',
            total: 2
        },
        {
            color: 'pink',
            id: 'ret',
            instituition: 'Guero',
            name: 'Olá',
            total: 0
        }
    ],
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
    ],
    accountSelected: 'nubank'
}