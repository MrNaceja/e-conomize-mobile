import AsyncStorage from "@react-native-async-storage/async-storage"
import { TAccount } from "utils/interfaces/AccountDTO"
import { TTransaction } from "utils/interfaces/TransactionDTO"
import { TRANSACTION_STORAGE_KEY } from "utils/keys/storageKeys"

export interface IStorageTransactionActions {
    create: (newTransaction       : TTransaction) => Promise<void>
    read  : (accountId : TAccount['id']) => Promise<TTransaction[]>
    update: (updatedTransaction   : TTransaction) => Promise<void>
    remove: (accountId : TAccount['id'], ...removedTransactions : TTransaction['id'][]) => Promise<void>
}
export default function StorageTransaction() : IStorageTransactionActions {
    
    const getKeyStorageByAccount = (accountId : TAccount['id']) => `${TRANSACTION_STORAGE_KEY}::account:${accountId}`

    const read : IStorageTransactionActions['read'] = async (accountId) => {
        const storedTransactions = await AsyncStorage.getItem(getKeyStorageByAccount(accountId))
        const transactions : TTransaction[] = storedTransactions ? JSON.parse(storedTransactions) : []
        return transactions
    }

    const create : IStorageTransactionActions['create'] = async (newTransaction) => {
        const existentTransactions = await read(newTransaction.account)
        const transactionsWithNew = [...existentTransactions, newTransaction]
        return await AsyncStorage.setItem(getKeyStorageByAccount(newTransaction.account), JSON.stringify(transactionsWithNew))
    }

    const update : IStorageTransactionActions['update'] = async (updatedTransaction) =>  {
        const existentTransactions    = await read(updatedTransaction.account)
        const transactionsWithUpdated = existentTransactions.map(transaction => transaction.id == updatedTransaction.id ? updatedTransaction : transaction)
        return await AsyncStorage.setItem(getKeyStorageByAccount(updatedTransaction.account), JSON.stringify(transactionsWithUpdated))
    }

    const remove : IStorageTransactionActions['remove'] = async (accountId, ...removedTransactions) =>  {
        const existentTransactions       = await read(accountId)
        const transactionsWithoutRemoved = existentTransactions.filter(transaction => !removedTransactions.includes(transaction.id))
        return await AsyncStorage.setItem(getKeyStorageByAccount(accountId), JSON.stringify(transactionsWithoutRemoved))
    }

    return { read, create, update, remove }
}