import { AppContext } from "contexts/AppContextProvider";
import {useContext, useMemo} from "react";

export default function useAccount() {
    const { managerAccount } = useContext(AppContext)
    return { ...managerAccount, hasAccounts: managerAccount.accounts.length > 0 }
}
