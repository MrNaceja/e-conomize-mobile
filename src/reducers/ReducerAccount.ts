import { TAccount } from "utils/interfaces/AccountDTO"
import { EAccountActionTypes, TAccountAction, TAccountState } from "utils/interfaces/ReducerAccountDTO"
import { TTransaction } from "utils/interfaces/TransactionDTO"

/**
 *  Reducer para gerenciamento e controle das contas.
 */
export default function ReducerAccount(state : TAccountState, { action, payload } : TAccountAction) : TAccountState {
  switch (action) {
    case EAccountActionTypes.ACCOUNT_CREATE:
      const accountCreated = payload as TAccount
      return {...state, accounts: [...state.accounts, accountCreated]}
    case EAccountActionTypes.ACCOUNT_EDIT:
      const accountEdited = payload as TAccount
      return {...state, accounts: state.accounts.map( account => account.id == accountEdited.id ? accountEdited : account  )}
    case EAccountActionTypes.ACCOUNT_DELETE:
      const accountIdDeleted = payload as TAccount['id']
      return { ...state, accounts: state.accounts.filter( account => account.id != accountIdDeleted ) }
    case EAccountActionTypes.ACCOUNT_CHANGE_SELECTED:
      const accountIdSelected = payload as TAccount['id']
      return {...state, accountSelected: accountIdSelected }

    case EAccountActionTypes.TRANSACTION_CREATE:
      const transactionCreated = payload as TTransaction
      return {...state, transactions: [...state.transactions, transactionCreated]}
    case EAccountActionTypes.TRANSACTION_EDIT:
      const transactionEdited = payload as TTransaction
      return {...state, transactions: state.transactions.map( account => account.id == transactionEdited.id ? transactionEdited : account  )}
    case EAccountActionTypes.TRANSACTION_DELETE:
      const transactionIdDeleted = payload as TTransaction['id']
      return { ...state, accounts: state.accounts.filter( transaction => transaction.id != transactionIdDeleted ) }

    case EAccountActionTypes.LOAD_STATE:
      return { ...state, ...payload as TAccountState }
    default: 
        return state
  }
}
