import { Box, Button, Center, HStack, Heading, Icon, Modal, Pressable, Spinner, Text, VStack, useToast} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { memo, useCallback, useMemo } from "react";

import useManagerModal from "hooks/useManagerModal";
import { zodResolver } from '@hookform/resolvers/zod'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { TSchemaTransaction, schemaTransaction } from "utils/schemas/Transaction.schemas";

import CampoForm from "./CampoForm";
import { ETransactionTypes, TTransaction } from "utils/interfaces/TransactionDTO";
import { TManagerModalType } from "utils/interfaces/ReducerManagerModalDTO";
import useAccount from "hooks/useAccount";
import moment from "moment";
import uuid from 'react-native-uuid';
import { TAccount } from "utils/interfaces/AccountDTO";
import useTransaction from "hooks/useTransaction";

/**
 *  Modal de Transação.
 */
interface IModalTransactionProps {
    accountSelected: TAccount
    refreshTrigger: React.Dispatch<React.SetStateAction<boolean>>
}
export default memo(
    function ModalTransaction({accountSelected, refreshTrigger} : IModalTransactionProps) {
        const { opened, modalType, closeModal, param : transactionToEdit}   = useManagerModal<TTransaction>()
        const { create, update }                                            = useTransaction()
        const Message                                                       = useToast()

        const typeTransaction = transactionToEdit ? transactionToEdit.type : modalType

        const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<TSchemaTransaction>({
            defaultValues: {
                description: transactionToEdit ? transactionToEdit.description : "",
                value      : transactionToEdit ? transactionToEdit.value       : 0,
                type       : typeTransaction == 'gain' ? ETransactionTypes.GAIN : ETransactionTypes.EXPENSE //TA DANDO PAU NO TIPO DEVE SER PQ NAO TEM NENHUM CAMPO PARA ELE, VERIFICAR NA DOCUMENTACAO.
            },
            resolver: zodResolver(schemaTransaction)
        })

    
        const titleByTypeTransaction = useMemo(() => {
            switch (typeTransaction) {
                case ETransactionTypes.EXPENSE:
                    return `${transactionToEdit ? "Editar" : "Nova"} Despesa`
                case ETransactionTypes.GAIN:
                default:
                    return `${transactionToEdit ? "Editar" : "Novo"} Ganho`
            }
        }, [])
    
        const handleCloseModal = useCallback(() => {
            reset()
            closeModal()
        }, [])
    
        const handleConfirmTransaction = async (transactionFormData : TSchemaTransaction) => {
            const transactionToSave : TTransaction = transactionToEdit 
                                    ? { ...transactionToEdit, ...transactionFormData}
                                    : {
                                        ...transactionFormData,
                                        createdAt: moment().format('DD/MM/YYYY'),
                                        id: uuid.v4() as string,
                                        account: accountSelected.id
                                    }
           try {
            console.log('aqui')
                if (transactionToEdit) {
                    await update(transactionToSave)
                } else {
                    await create(transactionToSave)
                }
                Message.show({
                    title: `Transação ${transactionToEdit ? 'alterada' : 'criada'} com sucesso`,
                    bg: "green.500"
                })
           } catch (error) {
                console.log(error)
                Message.show({
                    title: `Não foi possível ${transactionToEdit ? 'editar' : 'criar'} a transação`,
                    bg: "red.500"
                })
           }
           finally {
                refreshTrigger(true)
                handleCloseModal()
           }
        }
    
        const modalOpen = opened && (['expense', 'gain'] as TManagerModalType[]).includes(typeTransaction)
        
        return (
            <Modal isOpen={modalOpen} onClose={handleCloseModal} size="xl" _backdrop={{bg:"gray.900"}}>
                <Modal.Content>
                    <Modal.CloseButton _icon={{ color: "gray.400" }} _pressed={{bg: "transparent"}}/>
                    <Modal.Header>
                        <HStack space="2" alignItems="center">
                            <Icon 
                                as={MaterialCommunityIcons}
                                name={typeTransaction == "gain" ? "trending-up" : "trending-down"}
                                color={typeTransaction == "gain" ? "green.500" : "red.500"}
                                size="2xl"
                            />
                            <Heading color={typeTransaction == "gain" ? "green.500" : "red.500"}>
                                {titleByTypeTransaction}
                            </Heading>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        <VStack space="4">
                            <Box position="absolute" zIndex={1} w="full" h="full" bg="white" opacity=".6" display={isSubmitting ? "flex" : "none"} />
                            <Controller 
                                control={control}
                                name="description"
                                render={({ field: { onChange, value} }) => (
                                    <CampoForm 
                                        type="text"
                                        label="Descrição da transação"
                                        placeholder={typeTransaction == "gain" ? "Ex: salário" : "Ex: fatura cartão"}
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
                            <Button 
                                bg="green.500" 
                                p="5" 
                                alignItems="center" 
                                rounded="md" 
                                shadow="10" 
                                onPress={handleSubmit(handleConfirmTransaction, e => console.log(e))} 
                                isLoading={isSubmitting} 
                                _loading={{ bg:"gray.500:alpha.100", _spinner: { color: 'gray.600', size:"lg" } }}
                            >
                                <Text color="white" fontSize="2xl">Confirmar</Text>
                            </Button>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        )
    }
)
