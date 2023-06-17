import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";
import { ETransactionTypes, TTransaction } from "utils/interfaces/TransactionDTO";

export default function useTransaction() {
    const { managerTransactions, managerAccount: { activeAccount } } = useContext(AppContext)
    if (!activeAccount) {
        return {...managerTransactions, transactions: [], transactionsGain: [], transactionsExpense: []}
    }
    const transactions = managerTransactions.transactions.filter(transaction => transaction.accountId == activeAccount.id)
    const [transactionsGain, transactionsExpense] = transactions.reduce((state, transaction) => {
        const [ gain, expense ] = state
        switch (transaction.type) {
            case ETransactionTypes.GAIN:
                return [[transaction, ...gain], [...expense]]
            case ETransactionTypes.EXPENSE:
                return [[...gain], [transaction, ...expense]]
            default:
                return [gain, expense]
        }
    }, [[], []] as [TTransaction[], TTransaction[]])
    return { transactionsGain, transactionsExpense, ...managerTransactions, transactions }
}