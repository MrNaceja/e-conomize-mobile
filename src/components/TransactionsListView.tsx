import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, Pressable, SectionList, VStack, Text, useTheme } from "native-base";

import { TTransaction, TTransactionType, TTransactionsByDate } from "utils/interfaces/TransactionDTO";

import { SCREEN_CONTAINER_WIDTH } from "./Screen";

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ITransactionsListViewProps {
    transactionsList: TTransactionsByDate[],
    type: TTransactionType,
    title: string
}
export default function TransactionsListView({ transactionsList, title, type }: ITransactionsListViewProps) {
    const { sizes } = useTheme()
    const [selectionedTransactions, setSelectionedTransactions] = useState<TTransaction[]>([])

    const isSelection = selectionedTransactions.length > 0

    function handlePressTransaction(transactionPressed: TTransaction, transactions: TTransaction[]) {
        setSelectionedTransactions(transactionsSelectedState => {
            if (transactionsSelectedState.find(transactionSelectioned => transactionSelectioned.id == transactionPressed.id)) {
                return [...transactionsSelectedState.filter(transactionSelectioned => transactionSelectioned.id != transactionPressed.id)]
            }
            return [...transactionsSelectedState, ...transactions.filter(item => item.id == transactionPressed.id)]
        })
    }

    function handlePressToEdit() {

    }

    function clearSelectionedTransactions() {
        setSelectionedTransactions([])
    }

    return (
        <VStack space="1" w={SCREEN_CONTAINER_WIDTH} >
            <HStack justifyContent="space-between" alignItems="center" h="10">
                <Heading color="white" fontSize="lg" bg={(type == "gain") ? "green.500" : "red.500"} p="1.5" rounded="md">{title}</Heading>
                <HStack space="3" alignItems="center" display={isSelection ? "flex" : "none"}>
                    <Pressable bg="red.100" p="2" rounded="md" flexDir="row" alignItems="center" style={{ gap: sizes["1"] }}>
                        <Icon
                            as={MaterialCommunityIcons}
                            name="delete"
                            color="red.500"
                            size="sm"
                        />
                        <Text color="red.500" fontWeight="bold" fontSize="sm">Deletar</Text>
                    </Pressable>
                    <Pressable bg="gray.200" p="2" rounded="md" flexDir="row" alignItems="center" style={{ gap: sizes["1"] }} onPress={clearSelectionedTransactions}>
                        <Icon
                            as={MaterialCommunityIcons}
                            name="block-helper"
                            color="gray.500"
                            size="sm"
                        />
                        <Text color="gray.500" fontWeight="bold" fontSize="sm">Cancelar</Text>
                    </Pressable>
                </HStack>
            </HStack>
            <Pressable onPress={clearSelectionedTransactions}>
                <SectionList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: sizes["3"], paddingBottom: sizes["20"], paddingTop: sizes["2"] }}
                    keyExtractor={item => item.id}
                    sections={transactionsList}
                    renderSectionHeader={({ section: { title } }) => <Heading fontSize="sm" color="gray.400">{title}</Heading>}
                    renderItem={({ item, section }) => {
                        const selected = selectionedTransactions.find(selectioned => selectioned.id == item.id)
                        return (
                           <HStack alignItems="center" space="1">
                                <Icon
                                    as={MaterialCommunityIcons}
                                    name={selected ? "check-circle" : "circle-outline"}
                                    color={selected ? "green.500" : "gray.300"}
                                    size="2xl"
                                    display={isSelection ? "flex" : "none"}
                                />
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onLongPress={() => handlePressTransaction(item, section.data)} 
                                    onPress={() => isSelection && handlePressTransaction(item, section.data)}>
                                    <HStack
                                        bg="white"
                                        h="16"
                                        p="3"
                                        rounded="lg"
                                        alignItems="center"
                                        space="5"
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
                                        <Pressable onPress={() => !isSelection && handlePressToEdit()}>
                                            <Icon
                                                as={MaterialCommunityIcons}
                                                name="dots-vertical"
                                                color="gray.400"
                                                size="lg"
                                            />
                                    </Pressable>
                                    </HStack>
                                </TouchableOpacity>
                           </HStack>
                        )
                    }}
                />
            </Pressable>
        </VStack>
    )
}