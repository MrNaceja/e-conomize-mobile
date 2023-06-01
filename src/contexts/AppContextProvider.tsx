import { ReactNode, createContext, useReducer, useState } from "react";

import ModalNewTransaction from "components/ModalNewTransaction";

import { TAccount } from "utils/interfaces/AccountDTO";
import { TTransaction, TTransactionType } from "utils/interfaces/TransactionDTO";
import { EModalTransactionReducerActionType, MODAL_TRANSACTION_REDUCER_INITIAL_STATE, TModalTransactionReducerState } from "utils/interfaces/ModalTransactionReducerDTO";

import ModalTransactionReducer from "reducers/ModalTransactionReducer";

export type TAppContextProps = {
    user: string;
    accounts: TAccount[];
    transactions: TTransaction[],
    modalTransaction: {
        openModalTransaction: (transactionType : TTransactionType) => void
        closeModalTransaction: () => void,
        state: TModalTransactionReducerState
    }
}
export const AppContext = createContext<TAppContextProps>({} as TAppContextProps)

export interface IAppContextProviderProps {
    children: ReactNode
}
/**
 * Contexto do App.
 */
export default function AppContextProvider({ children } : IAppContextProviderProps) {
    const [user, setUser] = useState('Naceja')
    const [accounts, setAccounts] = useState([]) // Alterar para reducer...
    const [transactions, setTransactions] = useState([]) // Alterar para reducer...

    const [modalTransactionState, dispatchModalTransactionState] = useReducer(ModalTransactionReducer, MODAL_TRANSACTION_REDUCER_INITIAL_STATE)

    function openModalTransaction(transactionType : TTransactionType) {
        dispatchModalTransactionState({
            action: EModalTransactionReducerActionType.OPEN_MODAL,
            transactionType
        })
    }
    function closeModalTransaction() {
        dispatchModalTransactionState({
            action: EModalTransactionReducerActionType.CLOSE_MODAL
        })
    }

    return (
        <AppContext.Provider 
            value={{
                transactions, 
                accounts, 
                user,
                modalTransaction: {
                    openModalTransaction,
                    closeModalTransaction,
                    state: modalTransactionState
                }
                
            }} 
        >
        {/* <ModalNewAccount /> */}
        {children}
        </AppContext.Provider>
    )
}