import { TModalTransactionReducerState, TModalTransactionReducerAction, EModalTransactionReducerActionType } from 'utils/interfaces/ModalTransactionReducerDTO';

export default function ModalTransactionReducer(
    state  : TModalTransactionReducerState, 
    {action, transactionType} : TModalTransactionReducerAction
) {
    switch (action) {
        case EModalTransactionReducerActionType.OPEN_MODAL:
            return {modalTransactionType: transactionType, opened: true} as TModalTransactionReducerState
        case EModalTransactionReducerActionType.CLOSE_MODAL:
            return {...state, opened: false}
        default: 
            return state
    }
    
}