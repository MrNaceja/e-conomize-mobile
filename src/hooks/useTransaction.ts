import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";
import { TAccount } from "utils/interfaces/AccountDTO";
import { ETransactionTypes, TTransaction } from "utils/interfaces/TransactionDTO";

export default function useTransaction() {
    const { storageTransaction } = useContext(AppContext)
    const { read } = storageTransaction

    const readTransactionsByType = async (accountId : TAccount['id']) => {
        const transactionsReaded = await read(accountId)
        return transactionsReaded.reduce((state, transaction) => {
            const [gains, expenses] = state
            switch (transaction.type) {
                case ETransactionTypes.GAIN:
                    return [[...gains, transaction], expenses]
                case ETransactionTypes.EXPENSE:
                    return [gains, [...expenses, transaction]]
                default: 
                    return state
            }
        }, [[], []] as TTransaction[][])
    }
    
    return { ...storageTransaction, read: readTransactionsByType }
}