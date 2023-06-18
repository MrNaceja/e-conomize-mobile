import { PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState } from "react";

import { 
    EManagerModalActionTypes, 
    TManagerModalType,
    MANAGER_MODAL_INITIAL_STATE,
    TManagerModalState
}                                                                    from "utils/interfaces/ReducerManagerModalDTO";
import { ACCOUNT_INITIAL_STATE, EAccountActionTypes, TAccountState } from "utils/interfaces/ReducerAccountDTO";

import { TAccount }     from "utils/interfaces/AccountDTO";
import { TTransaction } from "utils/interfaces/TransactionDTO";

import ReducerManagerModal from "reducers/ReducerManagerModal";
import ReducerAccount      from "reducers/ReducerAccount";

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ACCOUNT_STORAGE_KEY, TRANSACTION_STORAGE_KEY } from "utils/keys/storageKeys";

export type TAppContextProps = {
    user: string,
    managerAccount: {     
        accounts        : TAccountState['accounts'],
        transactions    : TAccountState['transactions']
        accountSelected : TAccountState['accountSelected'],

        createAccount        : (accountNew        : TAccount)       => Promise<void>,
        editAccount          : (accountEdited     : TAccount)       => Promise<void>,
        deleteAccount        : (accountIdDeleted  : TAccount['id']) => Promise<void>,
        changeAccountSelected: (accountIdSelected : TAccount['id']) => void

        createTransaction: (transactionNew       : TTransaction)       => Promise<void>,
        editTransaction  : (transactionEdited    : TTransaction)       => Promise<void>,
        deleteTransaction: (transactionIdDeleted : TTransaction['id']) => Promise<void>,
    }
    managerModal: {
        openModal : (modalType : TManagerModalType) => void
        closeModal: () => void,
        state     : TManagerModalState
    }
}
export const AppContext = createContext<TAppContextProps>({} as TAppContextProps)

/**
 * Contexto do App.
 */
export default function AppContextProvider(props : PropsWithChildren) {
    const [user, setUser]                                = useState('Naceja')
    const [accountsState    , dispatchAccountState]      = useReducer(ReducerAccount, ACCOUNT_INITIAL_STATE)
    const [managerModalState, dispatchManagerModalState] = useReducer(ReducerManagerModal, MANAGER_MODAL_INITIAL_STATE)

    const openModal = useCallback((modalType : TManagerModalType) => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.OPEN_MODAL, modalType })
    }, [])

    const closeModal = useCallback(() => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.CLOSE_MODAL })
    }, [])

    const createAccount = useCallback(async (accountNew : TAccount) => {
        //gravar no storage...
        dispatchAccountState({ action: EAccountActionTypes.ACCOUNT_CREATE, payload: accountNew });
    }, [])

    const deleteAccount = useCallback(async (accountIdDeleted : TAccount['id']) => {
        //gravar no storage...
        dispatchAccountState({ action: EAccountActionTypes.ACCOUNT_DELETE, payload: accountIdDeleted })
    }, [])

    const editAccount = useCallback(async (accountEdited : TAccount) => {
        //gravar no storage...
        dispatchAccountState({ action: EAccountActionTypes.ACCOUNT_EDIT, payload: accountEdited })
    }, [])

    const changeAccountSelected = useCallback((accountIdSelected : TAccount['id']) => {
        dispatchAccountState({ action: EAccountActionTypes.ACCOUNT_CHANGE_SELECTED, payload: accountIdSelected })
    }, [])

    const createTransaction = useCallback(async (transactionNew : TTransaction) => {
        //gravar no storage...
        dispatchAccountState({ action: EAccountActionTypes.TRANSACTION_CREATE, payload: transactionNew })
    }, [])

    const editTransaction = useCallback(async (transactionEdited : TTransaction) => {
        //gravar no storage...
        dispatchAccountState({ action: EAccountActionTypes.TRANSACTION_EDIT, payload: transactionEdited })
    }, [])

    const deleteTransaction = useCallback(async (transactionIdDeleted : TTransaction['id']) => {
        //gravar no storage...
        dispatchAccountState({ action: EAccountActionTypes.TRANSACTION_DELETE, payload: transactionIdDeleted })
    }, [])

    async function loadStoragedAccountsState() {
        const storagedAccounts     = await AsyncStorage.getItem(ACCOUNT_STORAGE_KEY)
        const storagedTransactions = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
        if (storagedAccounts && storagedTransactions) {
            const accounts      : TAccount[]     = JSON.parse(storagedAccounts)
            const transactions  : TTransaction[] = JSON.parse(storagedTransactions)
            const accountsState : TAccountState  = {
                accounts,
                transactions,
                accountSelected: accounts.length > 0 ? accounts[0].id : null
            }
            dispatchAccountState({ action: EAccountActionTypes.LOAD_STATE, payload: accountsState })
        }
    }

    useEffect(() => {
        loadStoragedAccountsState()
        const { accounts } = accountsState
        if (accountsState.accountSelected == null && accounts.length > 0) {
            //isso nao deve acontecer, sempre deve haver ao menos uma conta criada....
            changeAccountSelected(accounts[0].id)
        }
    },[])
    return (
        <AppContext.Provider 
            value={{
                user,
                managerAccount: {
                    accountSelected: accountsState.accountSelected,
                    accounts     : accountsState.accounts,
                    transactions : accountsState.transactions,
                    changeAccountSelected,
                    createAccount,
                    deleteAccount,
                    editAccount, 
                    createTransaction,
                    deleteTransaction,
                    editTransaction 
                },
                managerModal: {
                    openModal,
                    closeModal,
                    state: managerModalState
                }
            }} 
            {...props}
        />
    )
}