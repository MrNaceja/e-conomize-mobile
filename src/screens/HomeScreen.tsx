import { Box, FlatList, Heading, ScrollView, useTheme, HStack } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard                                                   from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView                                          from "components/TransactionsListView";
import ModalTransaction                                              from "components/ModalTransaction";

import useAccount  from "hooks/useAccount";

import { TAccount } from "utils/interfaces/AccountDTO";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useCallback, useEffect, useState } from "react";
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
    const { 
        read: readAccounts,
        reading: loadingAccounts,
        accounts
    } = useAccount()
    const { 
        read: readTransactions,
        reading: loadingTransactions,
        gains: accountGains,
        expenses: accountExpenses
    } = useTransaction()

    let accountSelected = accounts[indexAccountSelected]

    const handleSwipeAccount = useCallback((e : NativeSyntheticEvent<NativeScrollEvent>) => {
        const indexSwiped = parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0))
        if (indexSwiped != indexAccountSelected) {
            if (accounts[indexSwiped]) {
                setIndexAccountSelected(indexSwiped)
            }
        }
    }, [ indexAccountSelected, accounts ])

    const loadAccounts = useCallback(async () => {
        try {
            console.log('buscando contas...')
            const accountsReaded = await readAccounts()
            console.log(accountsReaded.length + ' contas encontradas')
            if (accountsReaded.length == 0) {
                return navigation.navigate('accounts')
            }
        }
        catch (error) {
            throw error
        }
    }, [])

    const loadTransactions = useCallback(async () => {
        console.log('contas => ' + accounts)
        console.log('conta selecionada => ' + accountSelected)
        try {
            if (accountSelected) {
                console.log('buscando transacoes para a conta ' + accountSelected.name)
                await readTransactions(accountSelected.id)
                console.log('transações carregadas')
            }
        }
        catch (error) {
            throw error
        }
    }, [ accounts, indexAccountSelected ])

    useFocusEffect(useCallback(() => {
        loadAccounts()
    }, []))
    useEffect(() => {
        if (accounts.length > 0) {
            loadTransactions()
        }
    },[ indexAccountSelected, accounts ])
    console.log('home is render :: acount selected => ', accountSelected)
    return (
        <Screen>
            <Heading pl="5" color="gray.800" fontSize="lg" mb="2">Suas contas</Heading>
            <FlatList
                _contentContainerStyle={{gap: sizes["0.5"], px: SCREEN_HORIZONTAL_SPACING } as Partial<IFlatListProps<TAccount>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                scrollEnabled={!loadingAccounts}
                maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]}
                data={accounts}
                keyExtractor={account => account.id}
                renderItem={({ item: account }) => {
                    const shouldRender = accountSelected.id == account.id && !loadingAccounts && !loadingTransactions
                    return <AccountCard account={ shouldRender ? accountSelected : null } refresh={loadingTransactions}/>
                }}
                extraData={loadingTransactions}
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
                    <TransactionsListView 
                        title="Seus Ganhos" 
                        type="gain"    
                        transactions={ accountGains } 
                        loading={ loadingTransactions } 
                        accountSelected={ accountSelected } 
                        onMutation={ loadTransactions }
                    />
                    <TransactionsListView 
                        title="Suas Despesas" 
                        type="expense" 
                        transactions={ accountExpenses } 
                        loading={ loadingTransactions } 
                        accountSelected={ accountSelected } 
                        onMutation={ loadTransactions }
                    />
                </ScrollView>
            </Box>
            {
                accountSelected && <ModalTransaction accountSelected={ accountSelected } onMutation={ loadTransactions } />
            }
        </Screen>
    )
}