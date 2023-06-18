import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";
import { TAccount } from "utils/interfaces/AccountDTO";
import { TTransaction, ETransactionTypes } from "utils/interfaces/TransactionDTO";

export default function useAccount() {
    const { managerAccount } = useContext(AppContext)

    const getTransactionsByAccount : (accountId : TAccount['id']) => TTransaction[][] = (accountId : TAccount['id']) => (
        managerAccount.transactions
        .filter(transaction => transaction.accountId == accountId)
        .reduce((state, transaction) => {
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
    )

    return { ...managerAccount,  getTransactionsByAccount}
}
