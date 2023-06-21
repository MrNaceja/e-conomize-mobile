import { PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState } from "react";

import { 
    EManagerModalActionTypes, 
    TManagerModalType,
    MANAGER_MODAL_INITIAL_STATE,
    TManagerModalState
} from "utils/interfaces/ReducerManagerModalDTO";
import ReducerManagerModal from "reducers/ReducerManagerModal";
import { StorageAccount } from "services/StorageAccount";
import { StorageTransaction } from "services/StorageTransaction";

export type TAppContextProps = {
    user: string,
    storageAccount: StorageAccount
    storageTransaction : StorageTransaction
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
    const [storageAccount]                               = useState(new StorageAccount())
    const [storageTransaction]                           = useState(new StorageTransaction())
    const [managerModalState, dispatchManagerModalState] = useReducer(ReducerManagerModal, MANAGER_MODAL_INITIAL_STATE)

    const openModal = useCallback((modalType : TManagerModalType) => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.OPEN_MODAL, modalType })
    }, [])

    const closeModal = useCallback(() => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.CLOSE_MODAL })
    }, [])

    return (
        <AppContext.Provider 
            value={{
                user,
                storageAccount,
                storageTransaction,
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