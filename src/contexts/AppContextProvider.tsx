import { PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState } from "react";

import { 
    EManagerModalActionTypes, 
    TManagerModalType,
    MANAGER_MODAL_INITIAL_STATE,
    TManagerModalState
}                                                                                from "utils/interfaces/ReducerManagerModalDTO";
import { ACCOUNT_INITIAL_STATE, EAccountActionTypes, TAccountState }             from "utils/interfaces/ReducerAccountDTO";
import { ETransactionActionTypes, TRANSACTION_INITIAL_STATE, TTransactionState } from "utils/interfaces/ReducerTransactionDTO";

import { TAccount }     from "utils/interfaces/AccountDTO";
import { TTransaction } from "utils/interfaces/TransactionDTO";

import ReducerManagerModal from "reducers/ReducerManagerModal";
import ReducerAccount      from "reducers/ReducerAccount";
import ReducerTransaction  from "reducers/ReducerTransaction";

export type TAppContextProps = {
    user: string,
    managerAccount: {     
        accounts           : TAccountState['accounts'],
        activeAccount      : TAccountState['activeAccount'],
        changeActiveAccount: (account : TAccount) => void
        createAccount      : (account : TAccount) => void,
        editAccount        : (account : TAccount) => void,
        deleteAccount      : (account : TAccount) => void,
    },
    managerTransactions: {
        transactions     : TTransactionState['transactions'],
        createTransaction: (transaction : TTransaction) => void,
        editTransaction  : (transaction : TTransaction) => void,
        deleteTransaction: (transaction : TTransaction) => void,
    },
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
    const [user, setUser]                                             = useState('Naceja')
    const [accountsState, dispatchAccountState]          = useReducer(ReducerAccount     , ACCOUNT_INITIAL_STATE)
    const [transactionsState, dispatchTransactionsState] = useReducer(ReducerTransaction , TRANSACTION_INITIAL_STATE)
    const [managerModalState, dispatchManagerModalState] = useReducer(ReducerManagerModal, MANAGER_MODAL_INITIAL_STATE)

    const openModal = useCallback((modalType : TManagerModalType) => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.OPEN_MODAL, modalType })
    }, [])

    const closeModal = useCallback(() => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.CLOSE_MODAL })
    }, [])

    const createAccount = useCallback((account : TAccount) => {
        dispatchAccountState({ action: EAccountActionTypes.CREATE, account });
    }, [])

    const deleteAccount = useCallback((account : TAccount) => {
        dispatchAccountState({ action: EAccountActionTypes.DELETE, account })
    }, [])

    const editAccount = useCallback((account : TAccount) => {
        dispatchAccountState({ action: EAccountActionTypes.EDIT, account })
    }, [])

    const createTransaction = useCallback((transaction : TTransaction) => {
        dispatchTransactionsState({ action: ETransactionActionTypes.CREATE, transaction })
    }, [])

    const editTransaction = useCallback((transaction : TTransaction) => {
        dispatchTransactionsState({ action: ETransactionActionTypes.EDIT, transaction })
    }, [])

    const deleteTransaction = useCallback((transaction : TTransaction) => {
        dispatchTransactionsState({ action: ETransactionActionTypes.DELETE, transaction })
    }, [])

    const changeActiveAccount = useCallback((account : TAccount) => {
        dispatchAccountState({ action: EAccountActionTypes.CHANGE_ACTIVE, account })
    }, [])
    
    useEffect(() => {
        if (accountsState.activeAccount == null) {
            changeActiveAccount(accountsState.accounts[0])
        }
    },[])
    return (
        <AppContext.Provider 
            value={{
                user,
                managerAccount : {
                    accounts: accountsState.accounts,
                    activeAccount: accountsState.activeAccount,
                    changeActiveAccount,
                    createAccount,
                    deleteAccount,
                    editAccount
                }, 
                managerTransactions: {
                    transactions: transactionsState.transactions,
                    createTransaction,
                    editTransaction,
                    deleteTransaction
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