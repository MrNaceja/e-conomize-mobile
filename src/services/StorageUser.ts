import AsyncStorage from "@react-native-async-storage/async-storage"
import { USER_STORAGE_KEY } from "utils/keys/storageKeys"

export interface IStorageUserActions {
    readonly create: (user : string) => Promise<void>
    readonly read  : () => Promise<string | null>
}
export default function StorageUser() : IStorageUserActions {
    const read : IStorageUserActions['read'] = async function () {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY)
        const user = storedUser ? storedUser : null
        return user
    }
    const create : IStorageUserActions['create'] = async function (user) {
        return await AsyncStorage.setItem(USER_STORAGE_KEY, user)
    }
    return { read, create }
}