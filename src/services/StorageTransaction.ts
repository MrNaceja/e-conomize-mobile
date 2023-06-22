import AsyncStorage from "@react-native-async-storage/async-storage"
import { TAccount } from "utils/interfaces/AccountDTO"
import { ETransactionTypes, TRANSACTIONS, TTransaction } from "utils/interfaces/TransactionDTO"
import { TRANSACTION_STORAGE_KEY } from "utils/keys/storageKeys"

export class StorageTransaction {
    readonly create: (newTransaction       : TTransaction) => Promise<void>
    readonly update: (updatedTransaction   : TTransaction) => Promise<void>
    readonly delete: (deletedTransaction   : Pick<TTransaction, 'id' | 'account'>) => Promise<void>
    readonly read  : (accountId : TAccount['id']) => Promise<TTransaction[]>

    constructor() {
        this.create = async function (newTransaction) {
            const existentTransactions = await this.read(newTransaction.account)
            const transactionsWithNew = [...existentTransactions, newTransaction]
            return await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionsWithNew))
        }
        this.update = async function (updatedTransaction) {
            const existentTransactions    = await this.read(updatedTransaction.account)
            const transactionsWithUpdated = existentTransactions.map(transaction => transaction.id == updatedTransaction.id ? updatedTransaction : transaction)
            return await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionsWithUpdated))
        }
        this.delete = async function (deletedTransaction) {
            const existentTransactions       = await this.read(deletedTransaction.account)
            const transactionsWithoutDeleted = existentTransactions.filter(transaction => transaction.id != deletedTransaction.id)
            return await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionsWithoutDeleted))
        }
        this.read = async function (accountId) {
            const storedTransactions = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
            const transactions : TTransaction[] = storedTransactions ? JSON.parse(storedTransactions) : TRANSACTIONS
            return transactions.filter(transaction => transaction.account == accountId)
        }
    }


}