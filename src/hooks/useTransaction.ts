import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";
import { ETransactionTypes, TTransaction } from "utils/interfaces/TransactionDTO";

export default function useTransaction() {
    const { managerTransactions, managerAccount: { activeAccount } } = useContext(AppContext)
    if (activeAccount) {
        managerTransactions.transactions.filter(transaction => transaction.accountId == activeAccount.id)
    }
    const [transactionsGain, transactionsExpense] = managerTransactions.transactions.reduce((state, item) => {
        const [ gain, expense ] = state
        switch (item.type) {
            case ETransactionTypes.GAIN:
                return [[item, ...gain], [...expense]]
            case ETransactionTypes.EXPENSE:
                return [[...gain], [item, ...expense]]
            default:
                return [gain, expense]
        }
    }, [[], []] as [TTransaction[], TTransaction[]])
    return { transactionsGain, transactionsExpense, ...managerTransactions }
}