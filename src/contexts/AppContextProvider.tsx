import { PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState } from "react";

import { 
    EManagerModalActionTypes, 
    TManagerModalType,
    MANAGER_MODAL_INITIAL_STATE,
    TManagerModalState,
    TManagerModalPayloadParam
} from "utils/interfaces/ReducerManagerModalDTO";
import ReducerManagerModal from "reducers/ReducerManagerModal";
import StorageAccount, { IStorageAccountActions }      from "services/StorageAccount";
import StorageTransaction, { IStorageTransactionActions }  from "services/StorageTransaction";
import { TAccount } from "utils/interfaces/AccountDTO";
import { TTransaction } from "utils/interfaces/TransactionDTO";
import StorageUser from "services/StorageUser";

export type TAppContextProps = {
    user: string | null,
    setUser: (user : string) => void,
    storageAccount: IStorageAccountActions
    storageTransaction : IStorageTransactionActions
    managerModal: {
        openModal : <T extends TManagerModalType>(modalType : T, param?: T extends 'account' ? TAccount : TTransaction) => void
        closeModal: () => void,
        state     : TManagerModalState
    }
}
export const AppContext = createContext<TAppContextProps>({} as TAppContextProps)

const storageUser = StorageUser()

/**
 * Contexto do App.
 */
export default function AppContextProvider(props : PropsWithChildren) {
    const [user, setUser]                                = useState<string | null>(null)
    const [storageAccount]                               = useState(StorageAccount())
    const [storageTransaction]                           = useState(StorageTransaction())
    const [managerModalState, dispatchManagerModalState] = useReducer(ReducerManagerModal, MANAGER_MODAL_INITIAL_STATE)

    const openModal : TAppContextProps['managerModal']['openModal'] = useCallback((modalType, param) => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.OPEN_MODAL, payload: { modalType, param } })
    }, [])

    const closeModal : TAppContextProps['managerModal']['closeModal'] = useCallback(() => {
        dispatchManagerModalState({ action: EManagerModalActionTypes.CLOSE_MODAL })
    }, [])

    const storeUser = async () => {
        if (user) {
            await storageUser.create(user)
        }
    }

    async function loadStoredUser() {
        const userStored = await storageUser.read()
        if (userStored) {
            setUser(userStored)
        }
    }

    useEffect(() => {
        loadStoredUser()
    }, [])
    useEffect(() => {
        storeUser()
    }, [ user ])
    return (
        <AppContext.Provider 
            value={{
                user,
                setUser,
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