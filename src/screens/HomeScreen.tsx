import { Box, FlatList, Heading, ScrollView, useTheme, Text, Spinner, HStack } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard                                                   from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView                                          from "components/TransactionsListView";
import ModalNewTransaction                                           from "components/ModalNewTransaction";

import useAccount  from "hooks/useAccount";

import { TAccount } from "utils/interfaces/AccountDTO";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useEffect, useState } from "react";
import { TTransaction } from "utils/interfaces/TransactionDTO";
import useTransaction from "hooks/useTransaction";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen() {
    const { sizes }                                       = useTheme()
    const { read: readAccounts }                          = useAccount()
    const { read: readTransactions }                      = useTransaction()
    const [accounts, setAccounts]                         = useState<TAccount[]>([])
    const [indexAccountSelected, setIndexAccountSelected] = useState<number>(0)
    const [accountGains, setAccountGains]                 = useState<TTransaction[]>([])
    const [accountExpenses, setAccountExpenses]           = useState<TTransaction[]>([])
    const [loading, setLoading]                           = useState(true)
    
    const accountSelected = accounts[indexAccountSelected]

    function handleSwipeAccount(e : NativeSyntheticEvent<NativeScrollEvent>) {
        const indexSwiped = parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0))
        if (indexSwiped != indexAccountSelected) {
            console.log(indexSwiped)
            if (accounts[indexSwiped]) {
                setIndexAccountSelected(indexSwiped)
            }
        }
    }

    async function loadTransactions() {
        if (accountSelected) {
            const [gains, expenses] = await readTransactions(accountSelected.id)
            setAccountGains(gains)
            setAccountExpenses(expenses)
            setLoading(false)
        }
    }

    async function loadAccounts() {
        const accounts = await readAccounts()
        setAccounts(accounts)
        setLoading(false)
    }

    useEffect(() => {
        loadTransactions()
    }, [ loading ])
    useEffect(() => {
        loadAccounts()
    }, [])
    useEffect(() => {
        setLoading(true)
    }, [ indexAccountSelected ])
    return (
        <Screen>
            <Heading pl="5" color="gray.800" fontSize="lg" mb="2">Suas contas</Heading>
            <FlatList
                _contentContainerStyle={{gap: sizes["0.5"], px: SCREEN_HORIZONTAL_SPACING } as Partial<IFlatListProps<TAccount>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                scrollEnabled={!loading}
                maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]}
                data={accounts}
                keyExtractor={account => account.id}
                renderItem={({ item: account }) => {
                    const isAccountSelected = accountSelected && accountSelected.id == account.id && !loading
                    return <AccountCard account={ isAccountSelected ? account : null } />
                }}
                onMomentumScrollEnd={handleSwipeAccount}
                decelerationRate="fast"
                snapToInterval={(SCREEN_CONTAINER_WIDTH + (4 * sizes["0.5"]))}
                // ListEmptyComponent={<Spinner color="gray.300" size="lg" width={SCREEN_CONTAINER_WIDTH} />}
                ListEmptyComponent={
                    <HStack flex={1} space="2">
                        {[...Array(2)].map((__, i) => <AccountCard account={ null } key={i}/>)}
                    </HStack>
                }
            />
            <Box px={SCREEN_HORIZONTAL_SPACING} mt="2" flex={1}>
                <ScrollView horizontal snapToInterval={SCREEN_CONTAINER_WIDTH} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
                    <TransactionsListView title="Seus Ganhos"   type="gain"    transactions={accountGains}    loading={loading} />
                    <TransactionsListView title="Suas Despesas" type="expense" transactions={accountExpenses} loading={loading} />
                </ScrollView>
            </Box>
            <ModalNewTransaction />
        </Screen>
    )
}