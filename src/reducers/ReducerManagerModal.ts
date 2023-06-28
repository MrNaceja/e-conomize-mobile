import { EManagerModalActionTypes, MANAGER_MODAL_INITIAL_STATE, TManagerModalAction, TManagerModalState } from "utils/interfaces/ReducerManagerModalDTO"

/**
 *  Reducer para gerenciamento e controle dos modais abertos.
 */
export default function ReducerManagerModal(state : TManagerModalState, {action, payload} : TManagerModalAction) : TManagerModalState {
    switch (action) {
        case EManagerModalActionTypes.OPEN_MODAL:
            const { modalType, param } = payload ? payload : state
            return {opened: true, modalType, param}
        case EManagerModalActionTypes.CLOSE_MODAL:
            return MANAGER_MODAL_INITIAL_STATE
        default: 
            return state
    }
    
}