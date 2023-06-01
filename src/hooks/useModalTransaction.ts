import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";

export default function useModalTransaction() {
    const { modalTransaction } = useContext(AppContext)
    const { openModalTransaction, closeModalTransaction } = modalTransaction
    return {openModalTransaction, closeModalTransaction, ...modalTransaction.state}
}