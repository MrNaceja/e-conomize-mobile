import { TTransactionType } from "./TransactionDTO"

export type TModalTransactionReducerState = {
    modalTransactionType: TTransactionType,
    opened: boolean
}

export enum EModalTransactionReducerActionType {
    OPEN_MODAL  = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL"
}

export type TModalTransactionReducerAction = {
    action: EModalTransactionReducerActionType,
    transactionType?: TTransactionType
}

export const MODAL_TRANSACTION_REDUCER_INITIAL_STATE : TModalTransactionReducerState = {
    modalTransactionType: "gain",
    opened: false
}