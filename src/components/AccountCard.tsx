import { useEffect, useState } from "react";
import { Box, HStack, Heading, Icon, Skeleton, Text, VStack, useTheme, ISkeletonProps } from "native-base";
import { Ionicons } from "@expo/vector-icons"
import { ISkeletonTextProps } from "native-base/lib/typescript/components/composites";

import { SCREEN_CONTAINER_WIDTH } from "./Screen";

import useAccount from "hooks/useAccount";
import useMainScreens from "hooks/useMainScreens";

import { TAccount } from "utils/interfaces/AccountDTO";
import { TTransaction } from "utils/interfaces/TransactionDTO";

import { formatMonetary } from "utils/scripts/formatMonetary";

interface IAccountCardProps {
    account: TAccount
}
export default function AccountCard({ account } : IAccountCardProps) {
    const { sizes }                                     = useTheme()
    const { getTransactionsByAccount, accountSelected } = useAccount()
    const { displayedScreen }                           = useMainScreens()
    const [ loading, setLoading ]                 = useState(true)
    const [ accountGains, setAccountGains ]       = useState<TTransaction[]>([])
    const [ accountExpenses, setAccountExpenses ] = useState<TTransaction[]>([])

    let { total }    = account
    let totalGain    = 0;
    let totalExpense = 0;

    if (!loading) {
        totalGain    = accountGains   .reduce((total, gain)    => total += gain.value   , 0)
        totalExpense = accountExpenses.reduce((total, expense) => total += expense.value, 0)
        total       += totalGain - totalExpense
    }

    const hardlightColor        = account.color + ".500"
    const hardlightColorOpacity = account.color + ".600"

    const skeletonDefinition : Partial<ISkeletonProps & ISkeletonTextProps> = {
        startColor: hardlightColor,
        endColor: hardlightColorOpacity,
        isLoaded: !loading,
    }

    
    async function loadTransactions() {
        const isAccountSelected = account.id == accountSelected
        const isAccountsScreen  = displayedScreen == "accounts"
        if (isAccountSelected || isAccountsScreen) {
            setLoading(true)
                const [accountGains, accountExpenses] = await getTransactionsByAccount(account.id)
                setAccountGains(accountGains)
                setAccountExpenses(accountExpenses)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTransactions()
    }, [ accountSelected ])
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