import { Box, HStack, Heading, Icon, Text, VStack, useTheme } from "native-base";

import { Ionicons } from "@expo/vector-icons"

import { SCREEN_CONTAINER_WIDTH } from "./Screen";
import { TAccount } from "utils/interfaces/AccountDTO";
import { formatMonetary } from "utils/scripts/formatMonetary";
import useTransaction from "hooks/useTransaction";
import { TTransaction } from 'utils/interfaces/TransactionDTO';
import { useMemo } from "react";


interface IAccountCardProps {
    account: TAccount
}
export default function AccountCard({ account } : IAccountCardProps) {
    const { sizes } = useTheme()
    const { transactionsGain, transactionsExpense } = useTransaction()

    const getTotalByTransactionsOnAccount = (transactions : TTransaction[]) => transactions.reduce((state, transaction) => (transaction.accountId == account.id) ? state += transaction.value : state, 0)

    const totalGain    = useMemo(() => getTotalByTransactionsOnAccount(transactionsGain)   , [transactionsGain])
    const totalExpense = useMemo(() => getTotalByTransactionsOnAccount(transactionsExpense), [transactionsExpense])

    const total = (account.total + totalGain) - totalExpense

    return (
        <VStack bg={account.color + '.500'} maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]} rounded="2xl" w={SCREEN_CONTAINER_WIDTH} px="3" py="5" space="3">
            <Heading textTransform="uppercase" color="white" fontSize="md">{account.instituition}</Heading>
            <Box>
                <Text color="gray.100" fontWeight="light" fontSize="md">total acumulado</Text>
                <Heading fontSize="5xl" color="white">{ formatMonetary(total) }</Heading>
            </Box>
            <HStack justifyContent="center" bg={account.color + '.600'} space="10" p="1" rounded="lg">
                <HStack alignItems="center" space="2">
                    <Icon 
                        as={Ionicons}
                        name="trending-up"
                        color="white"
                        size="md"
                    />
                    <VStack>
                        <Text color="gray.100" textTransform="uppercase" fontSize="2xs">ganhos</Text>
                        <Text color="gray.100" fontWeight="bold">{ formatMonetary(totalGain) }</Text>
                    </VStack>
                </HStack>
                <HStack alignItems="center" space="2">
                    <Icon 
                        as={Ionicons}
                        name="trending-down"
                        color="white"
                        size="md"
                    />
                    <VStack>
                        <Text color="gray.100" textTransform="uppercase" fontSize="2xs">despesas</Text>
                        <Text color="gray.100" fontWeight="bold">{ formatMonetary(totalExpense) }</Text>
                    </VStack>
                </HStack>
            </HStack>
        </VStack>
    )
}