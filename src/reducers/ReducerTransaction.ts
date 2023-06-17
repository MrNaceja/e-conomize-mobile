import { ETransactionActionTypes, TTransactionAction, TTransactionState } from "utils/interfaces/ReducerTransactionDTO";

/**
 *  Reducer para gerenciamento e controle das transações.
 */
export default function ReducerTransaction(state : TTransactionState, { action, transaction } : TTransactionAction) {
    switch (action) {
        case ETransactionActionTypes.CREATE:
        case ETransactionActionTypes.EDIT:
        case ETransactionActionTypes.DELETE:
        default:
            return state
    }
}