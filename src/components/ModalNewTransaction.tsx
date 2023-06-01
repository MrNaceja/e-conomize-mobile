import useManagerModal from "hooks/useManagerModal";
import { Modal, Text } from "native-base";

/**
 *  Modal de cadastro de Transação.
 */
export default function ModalNewTransaction() {
    const { opened, modalType, closeModal} = useManagerModal()
    return (
        <Modal isOpen={opened} onClose={closeModal}>
            <Modal.Content>
                <Modal.CloseButton/>
                <Modal.Header>Teste</Modal.Header>
                <Modal.Body>
                    <Text>{modalType}</Text>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}