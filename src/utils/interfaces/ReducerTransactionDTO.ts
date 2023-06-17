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
            value: 0,
            type: 'expense',
            id: '1k23hi23bgk2jh232fdsfvretgrn23',
            accountId: 'ejfdhwosafhuioenrfdnfod'
        },
        {
            createdAt: '17/06/2023',
            description: 'Teste2',
            value: 0,
            type: 'gain',
            id: '1k23hi23bg56565623',
            accountId: 'ejfdhwosafhuioenrfdnfod'
        },
        {
            createdAt: '17/06/2023',
            description: 'Teste3',
            value: 0,
            type: 'gain',
            id: '1k23hi23bgk32452343456n23',
            accountId: 'ejfdhwosafhuioenrfdnfod'
        },
        {
            createdAt: '17/06/2023',
            description: 'Teste4',
            value: 0,
            type: 'gain',
            id: '1k23hi23bg3454356jn23',
            accountId: 'ejfdhwosafhuioenrfdnfod'
        },
        {
            createdAt: '16/06/2023',
            description: 'Teste5',
            value: 0,
            type: 'gain',
            id: '1k23hi454534jh3bjn23',
            accountId: 'ejfdhwosafhuioenrfdnfod'
        },
    ]
}