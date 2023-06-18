import { Box, FlatList, Heading, ScrollView, useTheme } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard                                                   from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView                                          from "components/TransactionsListView";
import ModalNewTransaction                                           from "components/ModalNewTransaction";

import useAccount     from "hooks/useAccount";

import { TAccount } from "utils/interfaces/AccountDTO";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useMemo } from "react";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen() {
    const { sizes }                                                                 = useTheme()
    const { accounts, changeAccountSelected, accountSelected, getTransactionsByAccount} = useAccount()
    const [activeAccountGains, activeAccountExpenses] = useMemo(() => accountSelected ? getTransactionsByAccount(accountSelected) : [[],[]], [accountSelected])

    function handleSwipeChangeActiveAccount(e : NativeSyntheticEvent<NativeScrollEvent>) {
        const indexSwiped = parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0))
        if (accountSelected && accounts[indexSwiped].id != accountSelected) {
            const accountSwiped = accounts.find((account, index) => index == indexSwiped)
            if (accountSwiped) {
                changeAccountSelected(accountSwiped.id)
            }
        }
    }
    
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
                renderItem={({ item: account }) => {
                    return <AccountCard account={ account } active={ accountSelected ? account.id == accountSelected : false }/>
                }}
                onScroll={handleSwipeChangeActiveAccount}
                decelerationRate="fast"
                snapToInterval={(SCREEN_CONTAINER_WIDTH + (4 * sizes["0.5"]))}
            />
            <Box px={SCREEN_HORIZONTAL_SPACING} mt="2" flex={1}>
                <ScrollView horizontal snapToInterval={SCREEN_CONTAINER_WIDTH} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
                    <TransactionsListView title="Seus Ganhos"   type="gain"    transactions={activeAccountGains} />
                    <TransactionsListView title="Suas Despesas" type="expense" transactions={activeAccountExpenses} />
                </ScrollView>
            </Box>
            <ModalNewTransaction />
        </Screen>
    )
}