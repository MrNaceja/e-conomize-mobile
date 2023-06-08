import useManagerModal from "hooks/useManagerModal"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"

import { Dropdown } from "react-native-element-dropdown"
import { Text, HStack, Heading, Icon, Modal, Pressable, VStack, Image, useTheme, useToken } from "native-base"
import CampoForm from "./CampoForm"

import { zodResolver } from "@hookform/resolvers/zod"

import { TSchemaAccount, schemaAccount } from "utils/schemas/Account.schemas"
import { TManagerModalType } from "utils/interfaces/ManagerModalDTO"
import { INSTITUITIONS } from "utils/interfaces/AccountDTO"

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ModalNewAccount() {
    const { opened, modalType, closeModal} = useManagerModal()
    const { colors, fontSizes, radii, sizes } = useTheme()
    
    const { control, handleSubmit, reset, watch } = useForm<TSchemaAccount>({
        defaultValues:{
            name: "",
            instituition: "",
            total: 0
        },
        resolver: zodResolver(schemaAccount)
    })

    const handleCloseModal = useCallback(() => {
        reset()
        closeModal()
    }, [])

    const modalOpen = opened && (['account'] as TManagerModalType[]).includes(modalType)

    const instituitionSelected = INSTITUITIONS.find(item => item.name == watch('instituition'))
    const [instituitionSelectedColor] = useToken('colors', [instituitionSelected ? instituitionSelected.color : "gray.400"])

    return (
        <Modal isOpen={modalOpen} onClose={handleCloseModal} size="xl" _backdrop={{bg:"gray.900"}} avoidKeyboard>
            <Modal.Content>
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
                                        <Dropdown
                                            mode="modal"
                                            search
                                            data={INSTITUITIONS}
                                            labelField="name"
                                            valueField="name"
                                            searchField="name"
                                            placeholder="Selecione..."
                                            placeholderStyle={{
                                                color: instituitionSelectedColor, 
                                                textTransform: "uppercase", 
                                                fontSize: fontSizes.sm, 
                                                fontWeight: "500"
                                            }}
                                            selectedTextStyle={{color: instituitionSelectedColor, textTransform: "uppercase", fontSize: fontSizes.sm, fontWeight: "500"}}
                                            containerStyle={{
                                                backgroundColor: colors.white, 
                                                borderRadius:radii.lg, 
                                                marginTop: sizes[0.5], 
                                                marginBottom: sizes[5],
                                            }}  
                                            style={{
                                                backgroundColor: instituitionSelected ? instituitionSelectedColor+"30" : colors.gray[100], 
                                                padding: sizes[5], 
                                                borderRadius: radii.lg
                                            }}
                                            iconColor={colors.gray[400]}
                                            searchPlaceholder="Buscar..."
                                            inputSearchStyle={{borderRadius: radii.sm}}
                                            renderLeftIcon={() => 
                                                !instituitionSelected 
                                                ? <Icon as={MaterialCommunityIcons} name="bank" mr="2" color="gray.400" size="lg" />
                                                : (
                                                <Image 
                                                    src={instituitionSelected.logo}
                                                    resizeMode="cover"
                                                    size="xs"
                                                    mr="2"
                                                    bg={instituitionSelected.color}
                                                    rounded="lg"
                                                    alt={`Logo ${instituitionSelected.name}`}
                                                />
                                            )}
                                            renderRightIcon={() => null}
                                            renderItem={instituition => (
                                                <HStack space="2" alignItems="center" p="2">
                                                    <Image 
                                                        src={instituition.logo}
                                                        resizeMode="cover"
                                                        size="xs"
                                                        bg={instituition.color}
                                                        rounded="lg"
                                                        alt="Logo da instituição"
                                                    />
                                                    <Text color={instituition.color} fontSize="lg">{instituition.name}</Text>
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
        </Modal>
    )
}