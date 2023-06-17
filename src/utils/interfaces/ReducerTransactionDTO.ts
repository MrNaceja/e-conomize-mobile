import { TTransaction } from "./TransactionDTO"

export type TTransactionState = {
    transactions: TTransaction[]
}

export enum ETransactionActionTypes {
    CREATE = "CREATE_ACCOUNT",
    EDIT   = "EDIT_ACCOUNT",
    DELETE = "DELETE_ACCOUNT"
}

export type TTransactionAction = {
    action: ETransactionActionTypes,
    transaction: TTransaction
}

export const TRANSACTION_INITIAL_STATE : TTransactionState = {
    transactions: []
}