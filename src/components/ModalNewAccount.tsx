import useManagerModal from "hooks/useManagerModal"
import { useCallback, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"

import { Text, HStack, Heading, Icon, Modal, Pressable, VStack, Image, useTheme, Box, KeyboardAvoidingView } from "native-base"
import CampoForm from "./CampoForm"
import PickerSelect from "./PickerSelect"

import { zodResolver } from "@hookform/resolvers/zod"

import { TSchemaAccount, schemaAccount } from "utils/schemas/Account.schemas"
import { TManagerModalType } from "utils/interfaces/ManagerModalDTO"
import { INSTITUITIONS, TAccountColorHighlight } from "utils/interfaces/AccountDTO"

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ModalNewAccount() {
    const { opened, modalType, closeModal} = useManagerModal()
    const { colors } = useTheme()
    
    const { control, handleSubmit, reset, watch } = useForm<TSchemaAccount>({
        defaultValues:{
            name: "",
            instituition: "",
            total: 0,
            color: "green"
        },
        resolver: zodResolver(schemaAccount)
    })

    const handleCloseModal = useCallback(() => {
        reset()
        closeModal()
    }, [])

    console.log('render')

    const modalOpen = opened && (['account'] as TManagerModalType[]).includes(modalType)

    const instituitionSelected = useMemo(() => (
        INSTITUITIONS.find(item => item.name == watch('instituition'))
    ), [watch('instituition')])

    const ACCOUNT_COLORS_HIGHLIGHT = useMemo(() => (
        Object
            .keys(colors)
            .filter(highLightColor => {
                let currentHighLightColor = colors[highLightColor as keyof typeof colors]
                return currentHighLightColor instanceof Object
            })
            .map(color => ({color} as {color: TAccountColorHighlight}))
    ), [])

    return (
        <Modal isOpen={modalOpen} onClose={handleCloseModal} size="xl" _backdrop={{bg:"gray.900"}}>
            <KeyboardAvoidingView behavior="position" w="full">
                <Modal.Content alignSelf="center">
                    <Modal.CloseButton _icon={{ color: "gray.400" }} _pressed={{bg: "transparent"}}/>
                    <Modal.Header>
                        <HStack space="2" alignItems="center">
                            <Icon 
                                as={MaterialCommunityIcons}
                                name="wallet"
                                color="gray.400"
                                size="2xl"
                            />
                            <Heading color="gray.500">
                                Nova Conta
                            </Heading>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        <VStack space="4">
                            <Controller 
                                control={control}
                                name="name"
                                render={({ field: { onChange, value} }) => (
                                    <CampoForm 
                                        type="text"
                                        label="Nome da Conta"
                                        placeholder="Ex: Conta Salário"
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}  
                            />
                            <Controller 
                                control={control}
                                name="instituition"
                                render={({ field: { onChange, value: instituitionSelectedName} }) => (
                                    <CampoForm  
                                        label="Instituição"
                                        _renderComponent={() => (
                                            <PickerSelect 
                                                mode="modal"
                                                search
                                                data={INSTITUITIONS}
                                                labelField="name"
                                                valueField="name"
                                                searchField="name"
                                                searchPlaceholder="Buscar instituição..."
                                                renderLeftIcon={() => 
                                                    !instituitionSelected 
                                                    ? <Icon as={MaterialCommunityIcons} name="bank" mr="2" color="gray.400" size="lg" />
                                                    : (
                                                    <Image 
                                                        src={instituitionSelected.logo}
                                                        resizeMode="cover"
                                                        size="xs"
                                                        mr="2"
                                                        rounded="lg"
                                                        alt={`Logo ${instituitionSelected.name}`}
                                                    />
                                                )}
                                                renderItem={instituition => (
                                                    <HStack space="2" alignItems="center" p="2">
                                                        <Image 
                                                            src={instituition.logo}
                                                            resizeMode="cover"
                                                            size="xs"
                                                            rounded="lg"
                                                            alt="Logo da instituição"
                                                        />
                                                        <Text color="gray.400" fontSize="lg">{instituition.name}</Text>
                                                    </HStack>
                                                )}
                                                onChange={instituitionSelected => onChange(instituitionSelected.name)}
                                                value={instituitionSelectedName}
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller 
                                control={control}   
                                name="color"
                                render={({ field: { onChange, value: highLightColor} }) => (
                                    <CampoForm  
                                        label="Cor Destaque"
                                        _renderComponent={() => {
                                            return (
                                            <PickerSelect 
                                                search={false}
                                                mode="modal"
                                                data={ACCOUNT_COLORS_HIGHLIGHT}
                                                labelField="color"
                                                valueField="color"
                                                style={{backgroundColor: colors[highLightColor][100]}}
                                                selectedTextStyle={{ color: colors[highLightColor][500] }}
                                                renderLeftIcon={() => <Box p="5" bg={`${highLightColor}.500`} rounded="lg" mr="2" />}
                                                renderItem={({ color }) => (
                                                    <HStack space="2" alignItems="center" p="2">
                                                    <Box rounded="lg" bg={`${color}.500`} p="5" />
                                                        <Text color={`${color}.500`} fontSize="lg">{color}</Text>
                                                    </HStack>
                                                )}
                                                value={highLightColor}
                                                onChange={colorsSelected => onChange(colorsSelected.color)}
                                            />
                                        )}}
                                    />
                                )}
                            />
                            <Controller 
                                control={control}
                                name="total"
                                render={({ field: { onChange, value} }) => (
                                    <CampoForm 
                                        type="monetary"
                                        label="Valor Inicial"
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
            </KeyboardAvoidingView>
        </Modal>
    )
}