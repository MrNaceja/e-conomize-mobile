import { Box, Button, Center, HStack, Heading, Icon, Modal, Pressable, Spinner, Text, VStack, useTheme, useToast} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { memo, useCallback, useEffect, useMemo } from "react";

import useManagerModal from "hooks/useManagerModal";
import { zodResolver } from '@hookform/resolvers/zod'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { TSchemaTransaction, schemaTransaction } from "utils/schemas/Transaction.schemas";

import CampoForm from "./CampoForm";
import { ETransactionTypes, TTransaction } from "utils/interfaces/TransactionDTO";
import { TManagerModalType } from "utils/interfaces/ReducerManagerModalDTO";
import moment from "moment";
import uuid from 'react-native-uuid';
import { TAccount } from "utils/interfaces/AccountDTO";
import useTransaction from "hooks/useTransaction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/**
 *  Modal de Transação.
 */
interface IModalTransactionProps {
    accountSelected: TAccount
    onMutation: () => Promise<void>
}
export default memo(
    function ModalTransaction({accountSelected, onMutation} : IModalTransactionProps) {
        const { opened, modalType, closeModal, param : transactionToEdit}   = useManagerModal<TTransaction>()
        const { create, update }                                            = useTransaction()
        const { colors }                                                    = useTheme()
        const Message                                                       = useToast()

        const isEdition = !!transactionToEdit
        const typeTransaction = isEdition ? transactionToEdit.type : modalType
        const modalOpen = opened && ([ETransactionTypes.GAIN, ETransactionTypes.EXPENSE] as TManagerModalType[]).includes(typeTransaction)

        const defaultValues : TSchemaTransaction = {
            description: isEdition ? transactionToEdit.description : "",
            value      : isEdition ? transactionToEdit.value       : 0,
            type       : typeTransaction == "gain" ? ETransactionTypes.GAIN : ETransactionTypes.EXPENSE
        }

        const { 
            control, 
            handleSubmit, 
            reset, 
            formState: { isSubmitting } 
        } = useForm<TSchemaTransaction>({ defaultValues, resolver: zodResolver(schemaTransaction) })
        
        const titleByTypeTransaction = useMemo(() => {
            switch (typeTransaction) {
                case ETransactionTypes.EXPENSE:
                    return `${isEdition ? "Editar" : "Nova"} Despesa`
                case ETransactionTypes.GAIN:
                default:
                    return `${isEdition ? "Editar" : "Novo"} Ganho`
            }
        }, [transactionToEdit, typeTransaction])
    
        const handleCloseModal = useCallback(() => {
            if (isSubmitting) {
                return 
            }
            reset()
            closeModal()
        }, [isSubmitting])
    
        const handleConfirmTransaction = async (transactionFormData : TSchemaTransaction) => {
            const transactionToSave : TTransaction = isEdition 
                                    ? { ...transactionToEdit, ...transactionFormData}
                                    : {
                                        ...transactionFormData,
                                        createdAt: moment().format('DD/MM/YYYY'),
                                        id: uuid.v4() as string,
                                        account: accountSelected.id
                                    }
           try {
                if (isEdition) {
                    await update(transactionToSave)
                } else {
                    await create(transactionToSave)
                }
                Message.show({
                    title: `Transação ${isEdition ? 'alterada' : 'criada'} com sucesso`,
                    bg: "green.500"
                })
                onMutation()
           } catch (error) {
                Message.show({
                    title: `Não foi possível ${isEdition ? 'editar' : 'criar'} a transação`,
                    bg: "red.500"
                })
           }
           finally {
                handleCloseModal()
           }
        }

        useEffect(() => {
            reset(defaultValues)
        }, [ transactionToEdit, typeTransaction ])
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
                    <KeyboardAwareScrollView style={{ width: '100%', backgroundColor: colors.gray[100]}} enableOnAndroid>
                        <Modal.Body bg="white">
                            <VStack space="4">
                                <Controller 
                                    control={control}
                                    name="description"
                                    render={({ field: { onChange, value}, fieldState: { error } }) => (
                                        <CampoForm 
                                            isReadOnly={isSubmitting}
                                            isRequired
                                            type="text"
                                            label="Descrição da transação"
                                            placeholder={typeTransaction == "gain" ? "Ex: salário" : "Ex: fatura cartão"}
                                            onChangeText={onChange}
                                            value={value}
                                            errorMsg={error?.message}
                                        />
                                    )}  
                                />
                                <Controller 
                                    control={control}
                                    name="value"
                                    render={({ field: { onChange, value},  fieldState: { error } }) => (
                                        <CampoForm
                                            isReadOnly={isSubmitting}
                                            type="monetary"
                                            label="Valor da transação"
                                            onChangeText={onChange}
                                            value={value.toString()}
                                            errorMsg={error?.message}
                                        />
                                    )}  
                                />
                                <Button 
                                    bg="green.500" 
                                    p="5" 
                                    alignItems="center" 
                                    rounded="md" 
                                    shadow="10" 
                                    onPress={handleSubmit(handleConfirmTransaction)} 
                                    isLoading={isSubmitting} 
                                    _pressed={{ bg: "green.600" }}
                                    _loading={{ bg:"gray.400:alpha.100", _spinner: { color: 'gray.600', size:"lg" } }}
                                >
                                    <Text color="white" fontSize="2xl">Confirmar</Text>
                                </Button>
                            </VStack>
                        </Modal.Body>
                    </KeyboardAwareScrollView>
                </Modal.Content>
            </Modal>
        )
    }
)
