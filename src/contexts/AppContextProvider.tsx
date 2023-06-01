import { PropsWithChildren, createContext, useReducer, useState } from "react";

import { TAccount } from "utils/interfaces/AccountDTO";
import { TTransaction } from "utils/interfaces/TransactionDTO";
import { 
    EManagerModalActionTypes, 
    TManagerModalType,
    MANAGER_MODAL_INITIAL_STATE,
    TManagerModalState
 } from "utils/interfaces/ManagerModalDTO";

import ReducerManagerModal from "reducers/ReducerManagerModal";

export type TAppContextProps = {
    user: string;
    accounts: TAccount[];
    transactions: TTransaction[],
    managerModal: {
        openModal: (modalType : TManagerModalType) => void
        closeModal: () => void,
        state: TManagerModalState
    }
}
export const AppContext = createContext<TAppContextProps>({} as TAppContextProps)

/**
 * Contexto do App.
 */
export default function AppContextProvider(props : PropsWithChildren) {
    const [user, setUser] = useState('Naceja')
    const [accounts, setAccounts] = useState([]) // Alterar para reducer...
    const [transactions, setTransactions] = useState([]) // Alterar para reducer...
    const [managerModalState, dispatchManagerModalState] = useReducer(ReducerManagerModal, MANAGER_MODAL_INITIAL_STATE)

    function openModal(modalType : TManagerModalType) {
        dispatchManagerModalState({ action: EManagerModalActionTypes.OPEN_MODAL, modalType })
    }

    function closeModal() {
        dispatchManagerModalState({ action: EManagerModalActionTypes.CLOSE_MODAL })
    }

    return (
        <AppContext.Provider 
            value={{
                transactions, 
                accounts, 
                user,
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