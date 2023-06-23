import { EManagerModalActionTypes, TManagerModalAction, TManagerModalPayloadParam, TManagerModalState } from "utils/interfaces/ReducerManagerModalDTO"

/**
 *  Reducer para gerenciamento e controle dos modais abertos.
 */
export default function ReducerManagerModal(state : TManagerModalState, {action, payload} : TManagerModalAction) : TManagerModalState {
    switch (action) {
        case EManagerModalActionTypes.OPEN_MODAL:
            const { modalType, param } = payload ? payload : state
            return {opened: true, modalType, param}
        case EManagerModalActionTypes.CLOSE_MODAL:
            return {...state, opened: false}
        default: 
            return state
    }
    
}