import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";

export default function useAccount() {
    const { storageAccount } = useContext(AppContext)
    return storageAccount
}
