import { useState } from "react";
import { Box, FlatList, Heading, ScrollView, useTheme } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

import AccountCard from "components/AccountCard";
import Screen, { SCREEN_HORIZONTAL_SPACING, SCREEN_CONTAINER_WIDTH } from "components/Screen";
import TransactionsListView from "components/TransactionsListView";

import { EXPENSE, GAIN, TTransactionsByDate } from "utils/interfaces/TransactionDTO";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen() {
    const { sizes } = useTheme()
    const [currentAccount, setCurrentAccount] = useState(0)
    const [gainTransactions, setGainTransactions] = useState<TTransactionsByDate[]>(GAIN)
    const [expenseTransactions, setExpenseTransactions] = useState<TTransactionsByDate[]>(EXPENSE)
    
    return (
        <Screen space="2">
            <Heading pl="5" color="gray.800" fontSize="lg">Suas contas</Heading>
            <FlatList
                _contentContainerStyle={{gap: sizes["0.5"], px: SCREEN_HORIZONTAL_SPACING} as Partial<IFlatListProps<number>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]}
                data={[1,2,3,4, 5, 6]}
                keyExtractor={item => item.toString()}
                renderItem={() => <AccountCard />}
                onScroll={e => setCurrentAccount(parseInt((e.nativeEvent.contentOffset.x / SCREEN_CONTAINER_WIDTH).toFixed(0)))}
                decelerationRate="fast"
                snapToInterval={(SCREEN_CONTAINER_WIDTH + (4 * sizes["0.5"]))}
            />
            <Box px={SCREEN_HORIZONTAL_SPACING} mt="2" flex={1}>
                <ScrollView horizontal snapToInterval={320} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
                    <TransactionsListView title="Seus Ganhos" type="gain" transactionsList={gainTransactions} />
                    <TransactionsListView title="Suas Despesas" type="expense" transactionsList={expenseTransactions} />
                </ScrollView>
            </Box>
        </Screen>
    )
}