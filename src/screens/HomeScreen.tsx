import { Box, FlatList, Heading, ScrollView, useTheme, HStack } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard                                                   from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView                                          from "components/TransactionsListView";
import ModalTransaction                                              from "components/ModalTransaction";

import useAccount  from "hooks/useAccount";

import { TAccount } from "utils/interfaces/AccountDTO";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useCallback, useMemo, useState } from "react";
import useTransaction from "hooks/useTransaction";
import { TMainRoutesScreens } from "routes/main.routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen({ navigation } : NativeStackScreenProps<TMainRoutesScreens>) {
    const { sizes }                                       = useTheme()
    const [indexAccountSelected, setIndexAccountSelected] = useState<number>(0)
    const [loading, setLoading]                           = useState(true)
    const { 
        read: readAccounts,
        reading: readingAccounts,
        accounts
    } = useAccount()
    const { 
        read: readTransactions,
        reading: readingTransactions,
        reduceType
    } = useTransaction()

    const accountSelected = accounts[indexAccountSelected]
    const [accountGains, accountExpenses] = useMemo(reduceType, [readingTransactions])
    
    function handleSwipeAccount(e : NativeSyntheticEvent<NativeScrollEvent>) {
        const indexSwiped = parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0))
        if (indexSwiped != indexAccountSelected) {
            if (accounts[indexSwiped]) {
                setIndexAccountSelected(indexSwiped)
            }
        }
    }

    const load = useCallback(async () => {
        setLoading(true)
        console.log('carregando')
        try {
            if (!readingAccounts) {
                console.log('buscando contas...')
                const accountsReaded = await readAccounts()
                console.log(accountsReaded.length + ' contas encontradas')
                if (accountsReaded.length == 0) {
                    return navigation.navigate('accounts')
                }
                setLoading(false)
            }
            if (accountSelected) {
                console.log('buscando transacoes para a conta ' + accountSelected.name)
                await readTransactions(accountSelected.id)
                console.log('transações carregadas')
                setLoading(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }, [ indexAccountSelected, accounts ])

    useFocusEffect(useCallback(() => { load() }, [ indexAccountSelected, accounts ]))
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
                    const shouldRender = accountSelected.id == account.id && !loading
                    return <AccountCard account={ shouldRender ? accountSelected : null } />
                }}
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
                <ScrollView horizontal snapToInterval={SCREEN_CONTAINER_WIDTH} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
                    <TransactionsListView title="Seus Ganhos"   type="gain"    transactions={accountGains}    loading={loading} accountSelected={accountSelected} onMutation={load}/>
                    <TransactionsListView title="Suas Despesas" type="expense" transactions={accountExpenses} loading={loading} accountSelected={accountSelected} onMutation={load}/>
                </ScrollView>
            </Box>
            <ModalTransaction accountSelected={accountSelected} onMutation={load} />
        </Screen>
    )
}