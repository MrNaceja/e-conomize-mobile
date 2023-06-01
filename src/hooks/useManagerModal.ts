import { AppContext } from "contexts/AppContextProvider";
import { useContext } from "react";

export default function useManagerModal() {
    const { managerModal } = useContext(AppContext)
    const { openModal, closeModal } = managerModal
    return {openModal, closeModal, ...managerModal.state}
}