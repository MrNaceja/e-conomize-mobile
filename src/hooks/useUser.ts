import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";

export default function useUser() {
    const { user, setUser, loadingUser } = useContext(AppContext)
    return { user, setUser, loadingUser }
}