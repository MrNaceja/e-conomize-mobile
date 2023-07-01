import { TAccount } from "./AccountDTO"
import { TTransaction, TTransactionType } from "./TransactionDTO"

export type TManagerModalType = TTransactionType | 'account'

export type TManagerModalPayloadParam = {
    modalType: TManagerModalType
    param?: TAccount | TTransaction
}

export type TManagerModalState = {
    opened: boolean
} & TManagerModalPayloadParam


export enum EManagerModalActionTypes {
    OPEN_MODAL  = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL"
}

export type TManagerModalAction = {
    action: EManagerModalActionTypes,
    payload?: TManagerModalPayloadParam
}

export const MANAGER_MODAL_INITIAL_STATE : TManagerModalState = {
    modalType: "account",
    opened: false,
    param: undefined 
}