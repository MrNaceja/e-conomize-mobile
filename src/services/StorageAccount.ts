import AsyncStorage from "@react-native-async-storage/async-storage"
import { TAccount } from "utils/interfaces/AccountDTO"
import { ACCOUNT_STORAGE_KEY } from "utils/keys/storageKeys"

export interface IStorageAccountActions {
    readonly create: (newAccount : TAccount) => Promise<void>
    readonly read  : () => Promise<TAccount[]>
    readonly update: (updatedAccount   : TAccount) => Promise<void>
    readonly remove: (removedAccountId : TAccount['id']) => Promise<void>
}
export default function StorageAccount() : IStorageAccountActions {
    const read : IStorageAccountActions['read'] = async function () {
        const storedAccounts = await AsyncStorage.getItem(ACCOUNT_STORAGE_KEY)
        const accounts : TAccount[] = storedAccounts ? JSON.parse(storedAccounts) : []
        return accounts
    }
    const create : IStorageAccountActions['create'] = async function (newAccount) {
        const existentAccounts = await read()
        const accountsWithNew = [...existentAccounts, newAccount]
        return await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithNew))
    }
    const update : IStorageAccountActions['update'] = async function (updatedAccount) {
        const existentAccounts    = await read()
        const accountsWithUpdated = existentAccounts.map(account => account.id == updatedAccount.id ? updatedAccount : account)
        return await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithUpdated))
    }
    const remove : IStorageAccountActions['remove'] = async function (removedAccountId) {
        const existentAccounts       = await read()
        const accountsWithoutDeleted = existentAccounts.filter(account => account.id != removedAccountId)
        return await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithoutDeleted))
    }
    return { read, create, update, remove }
}