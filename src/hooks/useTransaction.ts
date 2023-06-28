import { AppContext } from "contexts/AppContextProvider";
import { useCallback, useContext, useState } from "react";
import { ETransactionTypes, TTransaction } from "utils/interfaces/TransactionDTO";

export default function useTransaction() {
    const [transactions, setTransactions] = useState<TTransaction[]>([])
    const [reading, setReading]           = useState(true)
    const { storageTransaction }          = useContext(AppContext)

    const read = useCallback(async (accountId : string) => {
        setReading(true)
            const transactions = await storageTransaction.read(accountId)
            setTransactions(transactions)
        setReading(false)
    }, [transactions, reading])

    const reduceType = useCallback(() => {
        return transactions.reduce((state, transaction) => {
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
    }, [ transactions ])


    return { ...storageTransaction, read, reduceType, reading, transactions}
}