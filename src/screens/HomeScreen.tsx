import { Box, FlatList, Heading, ScrollView, useTheme, Text } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard                                                   from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView                                          from "components/TransactionsListView";
import ModalNewTransaction                                           from "components/ModalNewTransaction";

import useAccount     from "hooks/useAccount";

import { TAccount } from "utils/interfaces/AccountDTO";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useEffect, useState } from "react";
import { TTransaction } from "utils/interfaces/TransactionDTO";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen() {
    const { sizes }                                                                      = useTheme()
    const { accounts, changeAccountSelected, accountSelected, getTransactionsByAccount } = useAccount()
    const [loadingTransactions, setLoadingTransactions]                                  = useState(true)
    const [accountGains, setAccountGains]                                                = useState<TTransaction[]>([])
    const [accountExpenses, setAccountExpenses]                                          = useState<TTransaction[]>([])
    
    function handleSwipeChangeActiveAccount(e : NativeSyntheticEvent<NativeScrollEvent>) {
        const indexSwiped = parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0))
        if (accountSelected && accounts[indexSwiped].id != accountSelected) {
            const accountSwiped = accounts.find((account, index) => index == indexSwiped)
            if (accountSwiped) {
                changeAccountSelected(accountSwiped.id)
            }
        }
    }

    async function loadTransactions() {
        setLoadingTransactions(true)
        if (accountSelected) {
            const [gains, expenses] = await getTransactionsByAccount(accountSelected)
            setAccountGains(gains)
            setAccountExpenses(expenses)
            setLoadingTransactions(false)
        }
    }
    
    useEffect(() => {
        loadTransactions()
    }, [ accountSelected ])
    return (
        <Screen>
            <Heading pl="5" color="gray.800" fontSize="lg" mb="2">Suas contas</Heading>
            <FlatList
                _contentContainerStyle={{gap: sizes["0.5"], px: SCREEN_HORIZONTAL_SPACING} as Partial<IFlatListProps<TAccount>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]}
                data={accounts}
                keyExtractor={account => account.id}
                renderItem={({ item: account }) => (
                    <AccountCard account={ account } />
                )}
                onScroll={handleSwipeChangeActiveAccount}
                snapToInterval={(SCREEN_CONTAINER_WIDTH + (4 * sizes["0.5"]))}
            />
            <Box px={SCREEN_HORIZONTAL_SPACING} mt="2" flex={1}>
                {
                    loadingTransactions ? <Text fontSize="lg" color="red.400"> Carregando... </Text>
                    : <ScrollView horizontal snapToInterval={SCREEN_CONTAINER_WIDTH} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
                    <TransactionsListView title="Seus Ganhos"   type="gain"    transactions={accountGains}    loading={loadingTransactions}/>
                    <TransactionsListView title="Suas Despesas" type="expense" transactions={accountExpenses} loading={loadingTransactions}/>
                </ScrollView>
                }
                
            </Box>
            <ModalNewTransaction />
        </Screen>
    )
}