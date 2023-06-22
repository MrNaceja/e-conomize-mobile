import AsyncStorage from "@react-native-async-storage/async-storage"
import { ACCOUNTS, TAccount } from "utils/interfaces/AccountDTO"
import { ACCOUNT_STORAGE_KEY } from "utils/keys/storageKeys"

export class StorageAccount {
    readonly create: (newAccount       : TAccount)       => Promise<void>
    readonly update: (updatedAccount   : TAccount)       => Promise<void>
    readonly delete: (deletedAccountId : TAccount['id']) => Promise<void>
    readonly read  : () => Promise<TAccount[]>

    constructor() {
        this.create = async function (newAccount) {
            const existentAccounts = await this.read()
            const accountsWithNew = [...existentAccounts, newAccount]
            return await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithNew))
        }
        this.update = async function (updatedAccount) {
            const existentAccounts    = await this.read()
            const accountsWithUpdated = existentAccounts.map(account => account.id == updatedAccount.id ? updatedAccount : account)
            return await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithUpdated))
        }
        this.delete = async function (deletedAccountId) {
            const existentAccounts       = await this.read()
            const accountsWithoutDeleted = existentAccounts.filter(account => account.id != deletedAccountId)
            return await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithoutDeleted))
        }
        this.read = async function () {
            const storedAccounts = await AsyncStorage.getItem(ACCOUNT_STORAGE_KEY)
            const accounts : TAccount[] = storedAccounts ? JSON.parse(storedAccounts) : ACCOUNTS
            return accounts
        }
    }


}