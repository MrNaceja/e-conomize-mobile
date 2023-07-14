import AsyncStorage from "@react-native-async-storage/async-storage"
import { TAccount } from "utils/interfaces/AccountDTO"
import { ACCOUNT_STORAGE_KEY } from "utils/keys/storageKeys"

export interface IStorageAccountActions {
    readonly create: (newAccount : TAccount)             => Promise<TAccount[]>
    readonly read  : ()                                  => Promise<TAccount[]>
    readonly update: (updatedAccount   : TAccount)       => Promise<TAccount[]>
    readonly remove: (removedAccountId : TAccount['id']) => Promise<TAccount[]>
}
export default function StorageAccount() : IStorageAccountActions {
    const read : IStorageAccountActions['read'] = async function () {
       try {
            const storedAccounts = await AsyncStorage.getItem(ACCOUNT_STORAGE_KEY)
            const accounts : TAccount[] = storedAccounts ? JSON.parse(storedAccounts) : []
            return accounts
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
    const create : IStorageAccountActions['create'] = async function (newAccount) {
        try {
            const existentAccounts = await read()
            const accountsWithNew = [...existentAccounts, newAccount]
            await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithNew))
            return accountsWithNew
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
    const update : IStorageAccountActions['update'] = async function (updatedAccount) {
        try {
            const existentAccounts    = await read()
            const accountsWithUpdated = existentAccounts.map(account => account.id == updatedAccount.id ? updatedAccount : account)
            await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithUpdated))
            return accountsWithUpdated
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
    const remove : IStorageAccountActions['remove'] = async function (removedAccountId) {
      try {
        const existentAccounts       = await read()
        const accountsWithoutDeleted = existentAccounts.filter(account => account.id != removedAccountId)
        await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accountsWithoutDeleted))
        return accountsWithoutDeleted
      }
      catch (error) {
        console.log(error)
        throw error
      }
    }
    return { read, create, update, remove }
}