import React, { memo, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, Pressable, SectionList, VStack, Text, useTheme, Center, Skeleton } from "native-base";

import { TTransaction, TTransactionType, TTransactionsByDate } from "utils/interfaces/TransactionDTO";

import { SCREEN_CONTAINER_WIDTH } from "./Screen";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import useManagerModal from "hooks/useManagerModal";
import useTransaction from "hooks/useTransaction";
import { TAccount } from "utils/interfaces/AccountDTO";

import moment from 'moment';
import 'moment/locale/pt-br';
import Hint from "./Hint";
moment.locale('pt-br');


interface ITransactionsListViewProps {
    accountSelected: TAccount
    transactions: TTransaction[]
    type: TTransactionType
    title: string
    loading: boolean
    onMutation: () => void
}
export default memo(
    function TransactionsListView({ accountSelected, transactions, title, type, loading, onMutation }: ITransactionsListViewProps) {
        const { sizes } = useTheme()
        const { remove } = useTransaction()
        const { openModal } = useManagerModal()
        const [selectionedTransactions, setSelectionedTransactions] = useState<TTransaction[]>([])
        const isSelection = selectionedTransactions.length > 0
    
        /**
         * Formatando as transações para listagem por data
         */
        const transactionsByDate = useMemo(() => (
            transactions.reduce((sections, item) => {
                const dateCreated = item.createdAt
                let section = sections.find(section => section.title == dateCreated)
                if (!section) {
                    section = { title: dateCreated, data: []}
                    sections = [...sections, section]
                }
                section.data = [item, ...section.data]
                return sections.sort((sectionA, sectionB) => {
                    const dataA = moment(sectionA.title, 'DD/MM/YYYY');
                    const dataB = moment(sectionB.title, 'DD/MM/YYYY');
                    return dataA.isAfter(dataB) ? -1 : 1
                });
            }, [] as TTransactionsByDate[])
        ), [transactions])
    
        function handlePressTransaction(transactionPressed: TTransaction, transactions: TTransaction[]) {
            setSelectionedTransactions(transactionsSelectedState => {
                if (transactionsSelectedState.find(transactionSelectioned => transactionSelectioned.id == transactionPressed.id)) {
                    return [...transactionsSelectedState.filter(transactionSelectioned => transactionSelectioned.id != transactionPressed.id)]
                }
                return [...transactionsSelectedState, ...transactions.filter(item => item.id == transactionPressed.id)]
            })
        }
    
        function handlePressToEdit(transactionPressed : TTransaction) {
            openModal(transactionPressed.type, transactionPressed)
        }

        async function handleRemoveSelectioned() {
            if (selectionedTransactions.length > 0) {
                await remove(accountSelected.id, ...selectionedTransactions.map(transaction => transaction.id))
                onMutation()
            }
        }
    
        function clearSelectionedTransactions() {
            setSelectionedTransactions([])
        }
    
        useEffect(() => {
            clearSelectionedTransactions()
        }, [ loading ])
        return (
            <VStack space="1" w={SCREEN_CONTAINER_WIDTH} >
                <HStack justifyContent="space-between" alignItems="center" h="10">
                    <HStack alignItems="center" space="2">
                        <Heading color="white" fontSize="md" bg={(type == "gain") ? "green.500" : "red.500"} p="1.5" rounded="md">{title}</Heading>
                        <Hint
                            title="Visualizar tipos de transação utilizando gestos"
                            lineMessage={[
                                'Deslize para 👆👉 para ver as despesas 💔 na conta',
                                'Deslize para 👈👆 para ver os ganhos 💚 na conta'
                            ]}
                            _triggerProps={{
                                _light: { bg: "gray.400" },
                                _dark: { bg: "gray.700" },
                                _pressed: {
                                    _light: { bg: "gray.400" },
                                    _dark: { bg: "gray.600" },
                                }
                            }}
                        />
                    </HStack>
                    <HStack space="3" alignItems="center" display={isSelection ? "flex" : "none"}>
                        <Pressable 
                            _light={{ bg: "red.100" }}
                            _dark={{ bg: "red.900" }}  
                            p="2" 
                            rounded="md" 
                            flexDir="row" 
                            alignItems="center" 
                            style={{ gap: sizes["1"] }} 
                            onPress={handleRemoveSelectioned}
                        >
                            <Icon
                                as={MaterialCommunityIcons}
                                name="delete"
                                _light={{ color: "red.500" }}
                                _dark={{ color: "red.400" }} 
                                size="sm"
                            />
                            <Text 
                                _light={{ color: "red.500" }}
                                _dark={{ color: "red.400" }}  
                                fontWeight="bold" 
                                fontSize="sm"
                            >
                                Deletar
                            </Text>
                        </Pressable>
                        <Pressable
                            _light={{ bg: "gray.200" }}
                            _dark={{ bg: "gray.700" }} 
                            p="2" 
                            rounded="md" 
                            flexDir="row" 
                            alignItems="center" 
                            style={{ gap: sizes["1"] }} 
                            onPress={clearSelectionedTransactions}
                        >
                            <Icon
                                as={MaterialCommunityIcons}
                                name="block-helper"
                                _light={{ color: "gray.500" }}
                                _dark={{ color: "gray.400" }} 
                                size="sm"
                            />
                            <Text 
                                _light={{ color: "gray.500" }}
                                _dark={{ color: "gray.400" }} 
                                fontWeight="bold" 
                                fontSize="sm"
                            >
                                Cancelar
                            </Text>
                        </Pressable>
                    </HStack>
                </HStack>
                {
                    loading
                    ?(
                        <VStack space="5">
                           <VStack space="1">
                            <Skeleton.Text lines={1} w="32" />
                                <Skeleton h="16" rounded="md"/>
                                <Skeleton h="16" rounded="md"/>
                           </VStack>
                            <VStack space="1">
                                <Skeleton.Text lines={1} w="32"/>
                                <Skeleton h="16" rounded="md"/>
                                <Skeleton h="16" rounded="md"/>
                            </VStack>
                        </VStack>
                    )
                    :(
                        <Pressable onPress={clearSelectionedTransactions} flex={1}>
                            <SectionList
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ gap: sizes["3"], paddingBottom: sizes["20"], paddingTop: sizes["2"] }}
                                keyExtractor={item => item.id}
                                sections={transactionsByDate}
                                renderSectionHeader={({ section: { title } }) => (
                                    <Heading fontSize="sm" color="gray.400">
                                        {moment(title, "DD/MM/AAAA").format('dddd, D [de] MMMM [de] YYYY')}
                                    </Heading>
                                )}
                                renderItem={({ item: transaction, section }) => {
                                    const selected = selectionedTransactions.find(selectioned => selectioned.id == transaction.id)
                                    return (
                                        <HStack alignItems="center" space="1" >
                                            <Icon
                                                as={MaterialCommunityIcons}
                                                name={selected ? "check-circle" : "circle-outline"}
                                                color={selected ? "green.500" : "gray.300"}
                                                size="2xl"
                                                display={isSelection ? "flex" : "none"}
                                            />
                                            <TouchableOpacity
                                                style={{ flex: 1 }}
                                                onLongPress={() => handlePressTransaction(transaction, section.data)} 
                                                onPress={() => isSelection && handlePressTransaction(transaction, section.data)}>
                                                <HStack
                                                    _light={{ bg: "white" }}
                                                    _dark={{ bg: "dark.100" }}
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
                                                        <Heading 
                                                            _light={{ color: "gray.800" }} 
                                                            _dark={{ color: "gray.100" }} 
                                                            fontSize="lg"
                                                        >
                                                            R$ {transaction.value.toFixed(2)}
                                                        </Heading>
                                                        <Text 
                                                            _light={{ color: "gray.800" }} 
                                                            _dark={{ color: "gray.400" }} 
                                                            fontSize="md"
                                                        >
                                                            {transaction.description}
                                                        </Text>
                                                    </VStack>
                                                    <Pressable onPress={() => !isSelection && handlePressToEdit(transaction)}>
                                                        <Icon
                                                            as={MaterialCommunityIcons}
                                                            name="playlist-edit"
                                                            color="gray.400"
                                                            size="lg"
                                                        />
                                                </Pressable>
                                                </HStack>
                                            </TouchableOpacity>
                                        </HStack>
                                    )
                                }}
                                ListEmptyComponent={
                                    <Center mt="20">
                                        <Icon 
                                            as={MaterialCommunityIcons}
                                            name='block-helper'
                                            size='6xl'
                                            _light={{ color: "gray.300" }}
                                            _dark={{ color: "gray.500" }}
                                            mb="5"
                                            key={type + "_empty_icon"}
                                        />
                                        <Text color="gray.400" fontSize="lg" key={type + "_empty_text"}>Nenhuma transação encontrada</Text>
                                    </Center>
                                }
                            />
                        </Pressable>
                    )
                }
            </VStack>
        )
    }
)