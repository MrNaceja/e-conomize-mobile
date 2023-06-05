import { HStack, Heading, Icon, Modal, Pressable, Text, VStack} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useMemo } from "react";

import useManagerModal from "hooks/useManagerModal";
import { zodResolver } from '@hookform/resolvers/zod'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { TSchemaTransaction, schemaTransaction } from "utils/schemas/Transaction.schemas";

import CampoForm from "./CampoForm";

/**
 *  Modal de cadastro de Transação.
 */
export default function ModalNewTransaction() {
    const { opened, modalType, closeModal} = useManagerModal()
    const { control, handleSubmit, reset } = useForm<TSchemaTransaction>({
        defaultValues:{
            description: "",
            value: 0
        },
        resolver: zodResolver(schemaTransaction)
    })

    const titleByTransaction = useMemo(() => {
        switch (modalType) {
            case "expense":
                return "Nova Despesa"
            case "gain":
            default:
                return "Novo Ganho"
        }
    }, [modalType])

    const handleCloseModal = useCallback(() => {
        reset()
        closeModal()
    }, [])

    return (
        <Modal isOpen={opened} onClose={handleCloseModal} size="xl" _backdrop={{bg:"gray.900"}}>
            <Modal.Content>
                <Modal.CloseButton _icon={{ color: "gray.400" }} _pressed={{bg: "transparent"}}/>
                <Modal.Header>
                    <HStack space="2" alignItems="center">
                        <Icon 
                            as={MaterialCommunityIcons}
                            name={modalType == "gain" ? "trending-up" : "trending-down"}
                            color={modalType == "gain" ? "green.500" : "red.500"}
                            size="2xl"
                        />
                        <Heading color={modalType == "gain" ? "green.500" : "red.500"}>
                            {titleByTransaction}
                        </Heading>
                    </HStack>
                </Modal.Header>
                <Modal.Body>
                    <VStack space="4">
                        <Controller 
                            control={control}
                            name="description"
                            render={({ field: { onChange, value} }) => (
                                <CampoForm 
                                    type="text"
                                    label="Descrição da transação"
                                    placeholder={modalType == "gain" ? "salário" : "fatura cartão"}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}  
                        />
                        <Controller 
                            control={control}
                            name="value"
                            render={({ field: { onChange, value} }) => (
                                <CampoForm 
                                    type="monetary"
                                    label="Valor da transação"
                                    onChangeText={onChange}
                                    value={value.toString()}
                                />
                            )}  
                        />
                        <Pressable bg="green.500" p="5" alignItems="center" rounded="md" shadow="10">
                            <Text color="white" fontSize="2xl">Adicionar</Text>
                        </Pressable>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}