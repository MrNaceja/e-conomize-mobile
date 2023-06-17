import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";

export default function useAccount() {
    const { managerAccount } = useContext(AppContext)
    return managerAccount
}