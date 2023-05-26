import { useState } from "react";
import { Box, FlatList, Heading, ScrollView, useTheme } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";

import AccountCard, { ACCOUNT_CARD_WIDTH } from "components/AccountCard";
import Screen from "components/Screen";
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
                _contentContainerStyle={{gap: sizes["0.5"], px: "5"} as Partial<IFlatListProps<number>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                maxH={ACCOUNT_CARD_WIDTH / 2 + sizes["5"]}
                data={[1,2,3,4, 5, 6]}
                keyExtractor={item => item.toString()}
                renderItem={() => <AccountCard />}
                onScroll={e => setCurrentAccount(parseInt((e.nativeEvent.contentOffset.x / ACCOUNT_CARD_WIDTH).toFixed(0)))}
                decelerationRate="fast"
                snapToInterval={(ACCOUNT_CARD_WIDTH + (4 * sizes["0.5"]))}
            />
            <Box px="5" mt="2" flex={1}>
                <ScrollView horizontal snapToInterval={320} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
                    <TransactionsListView title="Seus Ganhos" type="gain" transactionsList={gainTransactions} />
                    <TransactionsListView title="Suas Despesas" type="expense" transactionsList={expenseTransactions} />
                </ScrollView>
            </Box>
        </Screen>
    )
}