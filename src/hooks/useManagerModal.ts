import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";
import { TManagerModalPayloadParam } from "utils/interfaces/ReducerManagerModalDTO";

export default function useManagerModal<T extends TManagerModalPayloadParam['param']>() {
    const { managerModal } = useContext(AppContext)
    const { openModal, closeModal, state } = managerModal
    return { ...state, openModal, closeModal, param: state.param as T | undefined }
}