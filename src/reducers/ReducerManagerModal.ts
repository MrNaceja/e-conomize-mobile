import { EManagerModalActionTypes, TManagerModalAction, TManagerModalState } from "utils/interfaces/ReducerManagerModalDTO"

/**
 *  Reducer para gerenciamento e controle dos modais abertos.
 */
export default function ReducerManagerModal(state : TManagerModalState, {action, modalType} : TManagerModalAction) {
    switch (action) {
        case EManagerModalActionTypes.OPEN_MODAL:
            return {modalType: modalType ? modalType : state.modalType, opened: true}
        case EManagerModalActionTypes.CLOSE_MODAL:
            return {...state, opened: false}
        default: 
            return state
    }
    
}