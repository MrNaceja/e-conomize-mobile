import { TAccount } from "./AccountDTO"

export type TAccountState = {
    accounts: TAccount[],
    activeAccount: TAccount | null
}

export enum EAccountActionTypes {
    CREATE = "CREATE_ACCOUNT",
    EDIT   = "EDIT_ACCOUNT",
    DELETE = "DELETE_ACCOUNT"
}

export type TAccountAction = {
    action: EAccountActionTypes,
    account: TAccount
}

export const ACCOUNT_INITIAL_STATE : TAccountState = {
    accounts: [],
    activeAccount: null
}