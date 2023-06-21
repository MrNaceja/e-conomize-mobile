import { AppContext } from "contexts/AppContextProvider";
import { useCallback, useContext } from "react";
import { TAccount } from "utils/interfaces/AccountDTO";
import { TTransaction, ETransactionTypes } from "utils/interfaces/TransactionDTO";

export default function useAccount() {
    const { storageAccount } = useContext(AppContext)
    return storageAccount

    // const getTransactionsByAccount : (accountId : TAccount['id']) => Promise<TTransaction[][]> = useCallback(
    //     async (accountId : TAccount['id']) => (
    //         new Promise(resolve => {
    //             const [ gains, expenses ] = managerAccount.transactions
    //                 .filter(transaction => transaction.accountId == accountId)
    //                 .reduce(
    //                     (state, transaction) => {
    //                         const [gains, expenses] = state
    //                         switch (transaction.type) {
    //                             case ETransactionTypes.GAIN:
    //                                 return [[...gains, transaction], expenses]
    //                             case ETransactionTypes.EXPENSE:
    //                                 return [gains, [...expenses, transaction]]
    //                             default: 
    //                                 return state
    //                         }
    //                     }, [[], []] as TTransaction[][]
    //                 )
    //             resolve([ gains, expenses ])
    //         })
    //     ), []
    // )

    // return { ...managerAccount,  getTransactionsByAccount}
}
