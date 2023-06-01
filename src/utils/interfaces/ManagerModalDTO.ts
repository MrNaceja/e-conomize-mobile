import { TTransactionType } from "./TransactionDTO"

export type TManagerModalType = TTransactionType | 'account'

export type TManagerModalState = {
    modalType: TManagerModalType,
    opened: boolean
}

export enum EManagerModalActionTypes {
    OPEN_MODAL  = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL"
}

export type TManagerModalAction = {
    action: EManagerModalActionTypes,
    modalType?: TManagerModalType
}

export const MANAGER_MODAL_INITIAL_STATE : TManagerModalState = {
    modalType: "account",
    opened: false
}