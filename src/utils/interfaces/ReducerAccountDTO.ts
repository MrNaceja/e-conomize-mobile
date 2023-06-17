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
    accounts: [
        {
            color: 'violet',
            id: 'nubank',
            instituition: 'Nubank',
            name: 'Principal',
            total: 0
        },
        {
            color: 'red',
            id: 'mercadopago',
            instituition: 'Mercado Pago',
            name: 'Investimentos',
            total: 0
        }
    ],
    activeAccount: null
}