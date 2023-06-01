import useModalTransaction from "hooks/useModalTransaction";
import { Modal, Text } from "native-base";

/**
 *  Modal de cadastro de Transação.
 */
export default function ModalNewTransaction() {
    const { opened, modalTransactionType, closeModalTransaction} = useModalTransaction()
    return (
        <Modal isOpen={opened} onClose={closeModalTransaction}>
            <Modal.Content>
                <Modal.CloseButton/>
                <Modal.Header>Teste</Modal.Header>
                <Modal.Body>
                    <Text>{modalTransactionType}</Text>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}