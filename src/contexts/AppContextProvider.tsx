import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";

import { 
    EManagerModalActionTypes, 
    TManagerModalType,
    MANAGER_MODAL_INITIAL_STATE,
    TManagerModalState
} from "utils/interfaces/ReducerManagerModalDTO";
import ReducerManagerModal from "reducers/ReducerManagerModal";
import StorageAccount      from "services/StorageAccount";
import StorageTransaction, { IStorageTransactionActions }  from "services/StorageTransaction";
import { TAccount } from "utils/interfaces/AccountDTO";
import { TTransaction } from "utils/interfaces/TransactionDTO";
import StorageUser from "services/StorageUser";

export type TAppContextProps = {
    user: string | null
    setUser: (user : string) => void
    loadingUser: boolean
    storageTransaction : IStorageTransactionActions
    managerAccount: {
        accounts : TAccount[],
        loadingAccounts : boolean,
        loadAccounts: () => Promise<void>,
        newAccount : (newAccount : TAccount) => Promise<void>
        updateAccount : (updatedAccount : TAccount) => Promise<void>
        removeAccount : (removedAccountId : TAccount['id']) => Promise<void>
    },
    managerModal: {
        openModal : <T extends TManagerModalType>(modalType : T, param?: T extends 'account' ? TAccount : TTransaction) => void
        closeModal: () => void,
        state     : TManagerModalState
    }
}

const storageUser    = StorageUser()
const storageAccount = StorageAccount()

export const AppContext = createContext<TAppContextProps>({} as TAppContextProps)

/**
 * Contexto do App.
 */
export default function AppContextProvider(props : PropsWithChildren) {
    const [user, setUser]                                = useState<string | null>(null)
    const [loadingUser, setLoadingUser]                  = useState(true)
    const [accounts, setAccounts]                        = useState<TAccount[]>([])
    const [loadingAccounts, setLoadingAccounts]          = useState(true)
    
    const [storageTransaction]                           = useState(StorageTransaction())
    const [managerModalState, dispatchManagerModalState] = useReducer(ReducerManagerModal, MANAGER_MODAL_INITIAL_STATE)

    const openModal : TAppContextProps['managerModal']['openModal'] = useCallback((modalType, param) => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.OPEN_MODAL, payload: { modalType, param } })
    }, [])

    const closeModal : TAppContextProps['managerModal']['closeModal'] = useCallback(() => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.CLOSE_MODAL })
    }, [])

    const loadAccounts = useCallback(async () => {
        setLoadingAccounts(true)
            const accountsReaded = await storageAccount.read()
            setAccounts(accountsReaded)
        setLoadingAccounts(false)
    }, [])

    const newAccount = useCallback(async (newAccount : TAccount) => {
        setLoadingAccounts(true)
            const accountsWithNew = await storageAccount.create(newAccount)
            setAccounts(accountsWithNew)
        setLoadingAccounts(false)
    }, [])

    const updateAccount = useCallback(async (updatedAccount : TAccount) => {
        setLoadingAccounts(true)
            const accountsWithUpdated = await storageAccount.update(updatedAccount)
            setAccounts(accountsWithUpdated)
        setLoadingAccounts(false)
    }, [])

    const removeAccount = useCallback(async (removedAccountId : TAccount['id']) => {
        setLoadingAccounts(true)
            const accountsWithoutRemoved = await storageAccount.remove(removedAccountId)
            setAccounts(accountsWithoutRemoved)
        setLoadingAccounts(false)
    }, [])

    const storeUser = async () => {
        if (user) {
            setLoadingUser(true)
            await storageUser.create(user)
            setLoadingUser(false)
        }
    }

    async function loadStoredUser() {
        setLoadingUser(true)
            const userStored = await storageUser.read()
            if (userStored) {
                setUser(userStored)
            }
        setLoadingUser(false)
    }
    
    const appContextValues : TAppContextProps  = useMemo(() => ({
        user,
        setUser,
        loadingUser,
        storageAccount,
        storageTransaction,
        managerAccount: {
            accounts, loadingAccounts, loadAccounts, newAccount, updateAccount, removeAccount
        },
        managerModal: {
            openModal, closeModal, state: managerModalState
        }
    }), [
        user, 
        setUser, 
        loadingUser, 
        storageAccount, 
        storageTransaction, 
        openModal, 
        closeModal, 
        managerModalState, 
        accounts, 
        loadingAccounts,
        loadAccounts,
        newAccount,
        updateAccount,
        removeAccount
    ])

    useEffect(() => {
        loadStoredUser()
        loadAccounts()
    }, [])
    useEffect(() => {
        storeUser()
    }, [ user ])
    return (
        <AppContext.Provider 
            value={appContextValues} 
            {...props}
        />
    )
}