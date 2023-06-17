import { useState } from "react";
import { Box, FlatList, Heading, ScrollView, useTheme } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard                                                   from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView                                          from "components/TransactionsListView";
import ModalNewTransaction                                           from "components/ModalNewTransaction";

import useAccount     from "hooks/useAccount";
import useTransaction from "hooks/useTransaction";
import { TAccount } from "utils/interfaces/AccountDTO";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen() {
    const { sizes }                                 = useTheme()
    const { accounts }                              = useAccount()
    const { transactionsGain, transactionsExpense } = useTransaction()
    const [currentAccount, setCurrentAccount]       = useState(0)

    return (
        <Screen>
            <Heading pl="5" color="gray.800" fontSize="lg" mb="2">Suas contas</Heading>
            <FlatList
                _contentContainerStyle={{gap: sizes["0.5"], px: SCREEN_HORIZONTAL_SPACING} as Partial<IFlatListProps<TAccount>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]}
                data={accounts}
                keyExtractor={item => item.id}
                renderItem={({ item: account }) => <AccountCard account={account}/>}
                onScroll={e => setCurrentAccount(parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0)))}
                decelerationRate="fast"
                snapToInterval={(SCREEN_CONTAINER_WIDTH + (4 * sizes["0.5"]))}
            />
            <Box px={SCREEN_HORIZONTAL_SPACING} mt="2" flex={1}>
                <ScrollView horizontal snapToInterval={SCREEN_CONTAINER_WIDTH} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
                    <TransactionsListView title="Seus Ganhos"   type="gain"    transactions={transactionsGain} />
                    <TransactionsListView title="Suas Despesas" type="expense" transactions={transactionsExpense} />
                </ScrollView>
            </Box>
            <ModalNewTransaction />
        </Screen>
    )
}