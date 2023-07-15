import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { HStack, Heading, Icon, Pressable, useTheme, useToast, VStack } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";

import Screen, { SCREEN_CONTAINER_WIDTH, SCREEN_HORIZONTAL_SPACING } from "components/Screen";
import AccountCard from "components/AccountCard";

import { TAccount } from "utils/interfaces/AccountDTO";

import { MaterialCommunityIcons } from '@expo/vector-icons'

import ModalAccount       from "components/ModalAccount";

import useAccount      from "hooks/useAccount";
import useManagerModal from "hooks/useManagerModal";
import Hint from "components/Hint";

/**
 * Tela de gerenciamento de contas.
 */
export default function AccountsScreen() {
    const [recalcResumeTransactions, setRecalcResumeTransactions] = useState(false)
    const { sizes }     = useTheme()
    const { openModal } = useManagerModal()
    const Message       = useToast()
    const { 
        accounts, 
        removeAccount, 
        hasAccounts,
        loadingAccounts
    } = useAccount()
    
    /**
     * Ao deslizar da esquerda para direita deleta a conta
     */
    const handleSwipeDeleteAccount = useCallback(async (accountId : TAccount['id']) => {
        if (accounts.length == 1) {
            return Message.show({
                title: 'Ao menos uma conta deve estar criada',
                placement: "bottom",
                bg: "red.500"
            })
        }
        await removeAccount(accountId)
        Message.show({
            title: "Conta deletada com sucesso",
            bg: "green.500"
        })
    }, [ accounts ])

    /**
     * Ao deslizar da direita para esquerda abre o modal para edição da conta
     */
    const handleSwipeEditAccount = useCallback((accountId : TAccount['id']) => {
        openModal('account', accounts.find(account => account.id == accountId))
    }, [ accounts ])
    
    useFocusEffect(useCallback(() => {
        setRecalcResumeTransactions(state => !state)
        if (!hasAccounts) {
            Alert.alert('Boas vindas ao e-conomize!', 'Você ainda não tem nenhuma conta, vamos criar uma?', [
                {
                    text: 'Criar',
                    onPress: () => openModal('account')
                }
            ], { cancelable: false })
        }
    }, [ hasAccounts ]))
    return (
        <Screen space="2">
            <HStack px={SCREEN_HORIZONTAL_SPACING} alignItems="center" space="2">
                <Heading color="gray.800">Suas contas</Heading>
                <Hint
                    title="Ações nas contas utilizando gestos"
                    lineMessage={[
                        'Deslize para 👆👉 para deletar 🗑 uma conta',
                        'Deslize para 👈👆 para editar 📝 uma conta'
                    ]}
                />
            </HStack>
            <SwipeListView 
                useFlatList
                data={accounts}
                keyExtractor={account => account.id}
                extraData={recalcResumeTransactions}
                renderItem={({ item: account }) => <AccountCard account={ !loadingAccounts ? account : null } refresh={recalcResumeTransactions} />}
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
                                name="playlist-edit"
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
            <ModalAccount />
        </Screen>
    )
}