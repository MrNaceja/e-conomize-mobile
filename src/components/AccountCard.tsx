import { Box, HStack, Heading, Icon, Skeleton, Text, VStack, useTheme, ISkeletonProps } from "native-base";

import { Ionicons } from "@expo/vector-icons"

import { SCREEN_CONTAINER_WIDTH } from "./Screen";
import { TAccount } from "utils/interfaces/AccountDTO";
import { formatMonetary } from "utils/scripts/formatMonetary";
import useTransaction from "hooks/useTransaction";
import { TTransaction } from 'utils/interfaces/TransactionDTO';
import { useMemo } from "react";
import { ISkeletonTextProps } from "native-base/lib/typescript/components/composites";


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

    const hardlightColor        = account.color + ".500"
    const hardlightColorOpacity = account.color + ".600"

    const skeletonDefinition : Partial<ISkeletonProps & ISkeletonTextProps> = {
        startColor: hardlightColor,
        endColor: hardlightColorOpacity,
        isLoaded: true,
    }

    return (
        <VStack bg={hardlightColor} maxH={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]} rounded="2xl" w={SCREEN_CONTAINER_WIDTH} p="3" space="2">
            <Skeleton.Text lines={2} w="1/3" {...skeletonDefinition}>
                <VStack>
                    <Text textTransform="uppercase" color="white" fontSize="2xs">{account.instituition}</Text>
                    <Heading color="white" fontSize="md">{account.name}</Heading>
                </VStack>
            </Skeleton.Text>
            <Skeleton h="16" rounded="md"  {...skeletonDefinition}>
                <Box>
                    <Text color="gray.100" fontWeight="light" fontSize="md">total acumulado</Text>
                    <Heading fontSize="5xl" color="white">{ formatMonetary(total) }</Heading>
                </Box>
            </Skeleton>
            <Skeleton h="10" rounded="md" {...skeletonDefinition}>
                <HStack justifyContent="center" bg={hardlightColorOpacity} space="10" p="1" rounded="lg">
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
            </Skeleton>
        </VStack>
    )
}