import { AppContext } from "contexts/AppContextProvider";
import { useCallback, useContext, useState } from "react";
import { ETransactionTypes, TTransaction } from "utils/interfaces/TransactionDTO";

export default function useTransaction() {
    const [gains, setGains]       = useState<TTransaction[]>([])
    const [expenses, setExpenses] = useState<TTransaction[]>([])
    const [reading, setReading]   = useState(true)
    const { storageTransaction }  = useContext(AppContext)

    const read : (accountId : string) => Promise<TTransaction[]> = useCallback((accountId : string) => new Promise(async (onSucess, onError) => {
        setReading(true)
        try {
            const transactions = await storageTransaction.read(accountId)
            const [gainTransactions, expenseTransactions] = transactions.reduce((state, transaction) => {
                const [_gains, _expenses] = state
                switch (transaction.type) {
                    case ETransactionTypes.GAIN:
                        return [[..._gains, transaction], _expenses]
                    case ETransactionTypes.EXPENSE:
                        return [_gains, [..._expenses, transaction]]
                    default: 
                        return state
                }
            }, [[], []] as TTransaction[][])
            setGains(gainTransactions)
            setExpenses(expenseTransactions)
            setReading(false)
            onSucess(transactions)
        }
        catch(error) {
            onError(error)
        }
    }), [storageTransaction])

    return { ...storageTransaction, read, reading, gains, expenses}
}