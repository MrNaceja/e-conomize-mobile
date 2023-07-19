import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Box, FlatList, Heading, ScrollView, useTheme, HStack } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard                                                   from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView                                          from "components/TransactionsListView";
import ModalTransaction                                              from "components/ModalTransaction";

import { TAccount } from "utils/interfaces/AccountDTO";

import useAccount     from "hooks/useAccount";
import useTransaction from "hooks/useTransaction";
import Hint from "components/Hint";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen() {
    const [indexAccountSelected, setIndexAccountSelected] = useState<number>(0)
    const [refreshTransactions, setRefreshTransactions]   = useState(false)
    const { sizes }                                       = useTheme()
    const { accounts }                                    = useAccount()
    const { 
        read: readTransactions,
        reading: loadingTransactions,
        gains: accountGains,
        expenses: accountExpenses
    } = useTransaction()

    /**
     * Conta selecionada no momento
     */
    let accountSelected = accounts[indexAccountSelected]

    /**
     * Deslize de contas
     */
    const handleSwipeAccount = useCallback((e : NativeSyntheticEvent<NativeScrollEvent>) => {
        const indexSwiped = parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0))
        if (indexSwiped != indexAccountSelected) {
            if (accounts[indexSwiped]) {
                setIndexAccountSelected(indexSwiped)
            }
        }
    }, [ indexAccountSelected, accounts ])

    /**
     * Carrega as transações de ganho e despesa para a conta atual selecionada
     */
    const loadTransactions = useCallback(async () => {
        try {
            if (accountSelected) {
                await readTransactions(accountSelected.id)
            }
        }
        catch (error) {
            throw error
        }
    }, [ indexAccountSelected ])

    /**
     * Ao mudar o estado das transações atualiza a listagem e o resumo no card de conta
     */
    const onMutationTransactions = useCallback(() => {
        loadTransactions()
        setRefreshTransactions(state => !state)
    }, [loadTransactions])

    useEffect(() => {
        loadTransactions()
    },[ indexAccountSelected, accounts ])
    return (
        <Screen>
            <HStack space="2">
                <Heading 
                    pl="5" 
                    fontSize="lg" 
                    mb="2"
                    _light={{ color:"gray.800" }}
                    _dark={{ color:"gray.200" }}
                >
                    Suas contas
                </Heading>
                <Hint 
                    title="Navegar entre contas utilizando gestos"
                    lineMessage={[
                        'Deslize 👈👆👉 para navegar entre as contas'
                    ]}
                />
            </HStack>
            <FlatList
                _contentContainerStyle={{gap: sizes["0.5"], px: SCREEN_HORIZONTAL_SPACING } as Partial<IFlatListProps<TAccount>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                scrollEnabled={!loadingTransactions}
                maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]}
                data={accounts}
                keyExtractor={account => account.id}
                renderItem={({ item: account }) => {
                    const shouldRender = accountSelected.id == account.id
                    return <AccountCard account={ shouldRender ? accountSelected : null } refresh={refreshTransactions}/>
                }}
                refreshing={refreshTransactions}
                onMomentumScrollEnd={handleSwipeAccount}
                decelerationRate="fast"
                snapToInterval={(SCREEN_CONTAINER_WIDTH + (4 * sizes["0.5"]))}
                ListEmptyComponent={
                    <HStack flex={1} space="2">
                        {[...Array(2)].map((__, i) => <AccountCard account={ null } key={i} />)}
                    </HStack>
                }
            />
            <Box px={SCREEN_HORIZONTAL_SPACING} mt="2" flex={1}>
                <ScrollView 
                    horizontal 
                    snapToInterval={SCREEN_CONTAINER_WIDTH} 
                    decelerationRate="fast" 
                    showsHorizontalScrollIndicator={false}
                >
                    <TransactionsListView 
                        title="Seus Ganhos" 
                        type="gain"    
                        transactions={ accountGains } 
                        loading={ loadingTransactions } 
                        accountSelected={ accountSelected } 
                        onMutation={ onMutationTransactions }
                    />
                    <TransactionsListView 
                        title="Suas Despesas" 
                        type="expense" 
                        transactions={ accountExpenses } 
                        loading={ loadingTransactions } 
                        accountSelected={ accountSelected } 
                        onMutation={ onMutationTransactions }
                    />
                </ScrollView>
            </Box>
            {
                accountSelected && <ModalTransaction accountSelected={ accountSelected } onMutation={ onMutationTransactions } />
            }
        </Screen>
    )
}