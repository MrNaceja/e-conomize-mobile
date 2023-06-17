import { EAccountActionTypes, TAccountAction, TAccountState } from "utils/interfaces/ReducerAccountDTO"

/**
 *  Reducer para gerenciamento e controle das contas.
 */
export default function ReducerAccount(state : TAccountState, {action, account} : TAccountAction) : TAccountState {
   switch (action) {
    case EAccountActionTypes.CREATE:
    case EAccountActionTypes.EDIT:
    case EAccountActionTypes.DELETE:
    case EAccountActionTypes.CHANGE_ACTIVE:
      return {...state, activeAccount: account}
    default: 
        return state
   }
}
