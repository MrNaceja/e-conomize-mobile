import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, Pressable, SectionList, VStack, Text, useTheme } from "native-base";

import { TTransaction, TTransactionType, TTransactionsByDate } from "utils/interfaces/TransactionDTO";

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ITransactionsListViewProps {
    transactionsList: TTransactionsByDate[],
    type: TTransactionType,
    title: string
}
export default function TransactionsListView({ transactionsList, title, type }: ITransactionsListViewProps) {
    const { sizes } = useTheme()
    const [isSelection, setIsSelection] = useState(false)
    const [selectionedTransactions, setSelectionedTransactions] = useState<TTransaction[]>([])

    function handleOnLongPressTransaction() {
        setIsSelection(true)
    }
console.log(selectionedTransactions)
    function handlePressTransaction(transactionPressed: TTransaction, transactions: TTransaction[]) {
        setSelectionedTransactions(transactionsSelectedState => {
            if (transactionsSelectedState.find(transactionSelectioned => transactionSelectioned.id == transactionPressed.id)) {
                return [...transactionsSelectedState.filter(transactionSelectioned => transactionSelectioned.id != transactionPressed.id)]
            }
            return [...transactionsSelectedState, ...transactions.filter(item => item.id == transactionPressed.id)]
        })
    }

    return (
        <VStack>
            <Heading color={type == 'gain' ? 'green.500' : 'red.500'} fontSize="2xl">{title}</Heading>
            <SectionList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: 320, gap: sizes["3"], paddingBottom: sizes["10"], paddingTop: sizes["2"] }}
                keyExtractor={item => item.id}
                sections={transactionsList}
                renderSectionHeader={({ section: { title } }) => <Heading fontSize="sm" color="gray.400">{title}</Heading>}
                renderItem={({ item, section }) => {
                    const selected = selectionedTransactions.find(selectioned => selectioned.id == item.id)
                    return (
                        <TouchableOpacity onLongPress={handleOnLongPressTransaction} onPress={() => isSelection && handlePressTransaction(item, section.data)}>
                            <HStack
                                bg="white"
                                h="16"
                                p="3"
                                rounded="lg"
                                alignItems="center"
                                space="5"
                                borderWidth="1"
                                borderColor={isSelection ? (selected ? "green.500" : "gray.300") : "transparent"}
                            >
                                <Icon
                                    as={MaterialCommunityIcons}
                                    name={type == 'gain' ? 'trending-up' : 'trending-down'}
                                    color={type == 'gain' ? 'green.500' : 'red.500'}
                                    size="2xl"
                                />
                                <VStack flex={1}>
                                    <Heading color="gray.800" fontSize="lg">R$ {item.value.toFixed(2)}</Heading>
                                    <Text color="gray.500" fontSize="md">{item.description}</Text>
                                </VStack>
                                <HStack space="3">
                                    <Pressable>
                                        <Icon
                                            as={MaterialCommunityIcons}
                                            name="delete"
                                            color="gray.400"
                                            size="lg"
                                        />
                                    </Pressable>
                                    <Pressable>
                                        <Icon
                                            as={MaterialCommunityIcons}
                                            name="dots-vertical"
                                            color="gray.400"
                                            size="lg"
                                        />
                                    </Pressable>
                                </HStack>
                            </HStack>
                        </TouchableOpacity>
                    )
                }}
            />
        </VStack>
    )
}