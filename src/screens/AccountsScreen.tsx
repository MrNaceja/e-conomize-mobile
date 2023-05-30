import { HStack, Heading, Icon, Pressable, Popover, useTheme, Text } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { Alert } from 'react-native'

import Screen, { SCREEN_CONTAINER_WIDTH, SCREEN_HORIZONTAL_SPACING } from "components/Screen";
import AccountCard from "components/AccountCard";

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ButtonCircular } from "components/ButtonCircular";

export default function AccountsScreen() {
    const { sizes } = useTheme()

    function handleDeleteAccount() {
        Alert.alert('Deletar Conta', 'Você tem certeza que deseja deletar a conta NOME DA CONTA?')
    }

    function handleEditAccount() {

    }
    
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
                data={[1,2,3,4, 5, 6]}
                keyExtractor={item => item.toString()}
                renderItem={() => <AccountCard />}
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
                    paddingHorizontal: sizes[SCREEN_HORIZONTAL_SPACING]
                }}
                showsVerticalScrollIndicator={false}
                leftActivationValue={SCREEN_CONTAINER_WIDTH / 2}
                onLeftAction={handleDeleteAccount}
            />
        </Screen>
    )
}