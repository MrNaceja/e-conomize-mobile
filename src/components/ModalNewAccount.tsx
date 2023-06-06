import useManagerModal from "hooks/useManagerModal"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"

import { Text, HStack, Heading, Icon, Modal, Pressable, VStack, Image, useTheme } from "native-base"
import CampoForm from "./CampoForm"

import { zodResolver } from "@hookform/resolvers/zod"

import { TSchemaAccount, schemaAccount } from "utils/schemas/Account.schemas"

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TManagerModalType } from "utils/interfaces/ManagerModalDTO"
import { Dropdown } from "react-native-element-dropdown"
import { TAccountInstituition } from "utils/interfaces/AccountDTO"

export default function ModalNewAccount() {
    const { opened, modalType, closeModal} = useManagerModal()
    const { colors, sizes } = useTheme()
    const { control, handleSubmit, reset } = useForm<TSchemaAccount>({
        defaultValues:{
            name: "",
            instituition: ""
        },
        resolver: zodResolver(schemaAccount)
    })

    const handleCloseModal = useCallback(() => {
        reset()
        closeModal()
    }, [])

    const modalOpen = opened && (['account'] as TManagerModalType[]).includes(modalType)

    const instituitions : TAccountInstituition[] = [
       {
        name: "Nubank",
        logo: "https://nubank.com.br/images/nu-icon.png?v=2",
        color: colors.purple["500"]
       },
       {
        name: "Mercado Pago",
        logo: "https://bucket.utua.com.br/img/2020/02/c46a4003-design-sem-nome-38-1.png",
        color: colors.lightBlue["500"]
       }
    ]

    return (
        <Modal isOpen={modalOpen} onClose={handleCloseModal} size="xl" _backdrop={{bg:"gray.900"}}>
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
                            render={({ field: { onChange, value} }) => (
                                <Dropdown
                                    data={instituitions}
                                    labelField="name"
                                    valueField="name"
                                    renderItem={account => (
                                        <HStack space="2" alignItems="center" p="2">
                                            <Image 
                                                src={account.logo}
                                                resizeMode="cover"
                                                size="sm"
                                                bg={account.color}
                                                rounded="lg"
                                                alt="Logo da instituição"
                                            />
                                            <Text color={account.color} fontSize="lg">{account.name}</Text>
                                        </HStack>
                                    )}
                                    {...{onChange, value}}
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