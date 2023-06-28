import { AppContext } from "contexts/AppContextProvider";
import { useCallback, useContext, useState } from "react";
import { TAccount } from "utils/interfaces/AccountDTO";

export default function useAccount() {
    const [accounts, setAccounts] = useState<TAccount[]>([])
    const [reading, setReading]   = useState(false)
    const { storageAccount } = useContext(AppContext)

    const read = useCallback(async () => {
        setReading(true)
            const accountsReaded = await storageAccount.read()
            setAccounts(accountsReaded)
            setReading(false)
            
    }, [])
    
    return {...storageAccount, accounts, read, reading}
}
