import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";

export default function useTransaction() {
    const { managerTransactions } = useContext(AppContext)
    return managerTransactions
}