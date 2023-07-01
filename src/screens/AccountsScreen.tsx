import { HStack, Heading, Icon, Pressable, Popover, useTheme, Text, useToast, VStack } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";

import Screen, { SCREEN_CONTAINER_WIDTH, SCREEN_HORIZONTAL_SPACING } from "components/Screen";
import AccountCard from "components/AccountCard";

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ButtonCircular } from "components/ButtonCircular";
import useAccount from "hooks/useAccount";
import { TAccount } from "utils/interfaces/AccountDTO";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import ModalAccount from "components/ModalAccount";
import useManagerModal from "hooks/useManagerModal";
import { Alert } from "react-native";

/**
 * Tela de gerenciamento de contas.
 */
export default function AccountsScreen() {
    const { sizes }     = useTheme()
    const { openModal } = useManagerModal()
    const Message       = useToast()
    const { 
        read: readAccounts, 
        remove: deleteAccount, 
        update: updateAccount,
        accounts  
    } = useAccount()

    async function handleSwipeDeleteAccount(accountId : TAccount['id']) {
        if (accounts.length == 1) {
            return Message.show({
                title: 'Ao menos uma conta deve estar criada',
                placement: "bottom",
                bg: "red.500"
            })
        }
        await deleteAccount(accountId)
        Message.show({
            title: "Conta deletada com sucesso",
            bg: "green.500"
        })
    }

    function handleSwipeEditAccount(accountId : TAccount['id']) {
        openModal('account', accounts.find(account => account.id == accountId))
    }

    const load = useCallback(async () => {
        try {
            const accountsReaded = await readAccounts()
            if (accountsReaded.length == 0) {
                return Alert.alert('Boas vindas ao e-conomize!', 'Você ainda não tem nenhuma conta, vamos criar uma?', [
                    {
                        text: 'Criar',
                        onPress: () => openModal('account')
                    }
                ], { cancelable: false })
            }
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    useFocusEffect(useCallback(() => { load() }, []))
    return (
        <Screen space="2">
            <HStack px={SCREEN_HORIZONTAL_SPACING} alignItems="center" space="2">
                <Heading color="gray.800">Suas contas</Heading>
                <Popover 
                    trigger={triggerProps => (
                        <ButtonCircular {...triggerProps} iconName="info" iconSize="xs" size={sizes["1"]}/>
                    )}
                    placement="bottom"
                >
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Header>
                            <Heading fontSize="md">Ações nas contas utilizando gestos</Heading>
                        </Popover.Header>
                        <Popover.Body>
                            <Text>Deslize para direita para deletar uma conta</Text>
                            <Text>Deslize para esquerda para editar uma conta</Text>
                        </Popover.Body>
                    </Popover.Content>
                </Popover>
            </HStack>
            <SwipeListView 
                useFlatList
                data={accounts}
                keyExtractor={account => account.id}
                renderItem={({ item: account }) => <AccountCard account={ account } />}
                renderHiddenItem={() => (
                    <HStack justifyContent="space-between" h="full">
                        <Pressable p="5" justifyContent="center">
                            <Icon
                                as={MaterialCommunityIcons}
                                name="delete"
                                color="red.500"
                                size="6xl"
                            />
                        </Pressable>
                        <Pressable h="full" p="5" justifyContent="center">
                            <Icon
                                as={MaterialCommunityIcons}
                                name="dots-vertical"
                                color="gray.500"
                                size="6xl"
                            />
                        </Pressable>
                    </HStack>
                )}
                contentContainerStyle={{
                    gap: sizes["3"],
                    paddingBottom: sizes["10"],
                    paddingHorizontal: sizes[SCREEN_HORIZONTAL_SPACING],
                    justifyContent: accounts.length == 0 ? "center" : "flex-start"
                }}
                showsVerticalScrollIndicator={false}
                leftActivationValue={SCREEN_CONTAINER_WIDTH / 2}
                rightActivationValue={SCREEN_CONTAINER_WIDTH / 2}
                onLeftAction={handleSwipeDeleteAccount}
                onRightAction={handleSwipeEditAccount}
                ListEmptyComponent={
                    <VStack flex={1} space="3">
                        {[...Array(3)].map((__, i) => <AccountCard account={ null } key={i}/>)}
                    </VStack>
                }
            />
            <ModalAccount onMutation={ load } onClose={ load }/>
        </Screen>
    )
}