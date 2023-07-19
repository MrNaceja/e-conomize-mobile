import { memo, useEffect, useMemo } from "react";
import { Image, Box, HStack, Heading, Icon, Skeleton, Text, VStack, useTheme, ISkeletonProps, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons"
import { ISkeletonTextProps } from "native-base/lib/typescript/components/composites";

import { SCREEN_CONTAINER_WIDTH } from "./Screen";

import { TAccount } from "utils/interfaces/AccountDTO";

import { formatMonetary } from "utils/scripts/formatMonetary";
import useTransaction from "hooks/useTransaction";
import { INSTITUITIONS } from "utils/interfaces/InstituitionDTO";

interface IAccountCardProps {
    account: TAccount | null
    refresh?: boolean
}
export default memo(
    function AccountCard({ account, refresh = false } : IAccountCardProps) {
        const { sizes } = useTheme()
        const { 
            read: readTransactions, 
            reading: readingTransactions,
            gains: accountGains,
            expenses: accountExpenses
        } = useTransaction()
        const { colorMode } = useColorMode()
        let total        = account ? account.total : 0
        let totalGain    = 0;
        let totalExpense = 0;
    
        if (!readingTransactions && account) {
            totalGain    = accountGains   .reduce((total, gain)    => total += gain.value   , 0)
            totalExpense = accountExpenses.reduce((total, expense) => total += expense.value, 0)
            total       += totalGain - totalExpense
        }
    
        const hardlightColor        = (account ? account.color + ".500" : colorMode == "light" ? "gray.300" : "gray.600") 
        const hardlightColorOpacity = (account ? account.color + ".600" : colorMode == "light" ? "gray.200" : "gray.500") 
    
        const skeletonDefinition : Partial<ISkeletonProps & ISkeletonTextProps> = {
            startColor: hardlightColor,
            endColor: hardlightColorOpacity,
            isLoaded: !readingTransactions && !!account,
        }

        const accountInstituitionLogo = INSTITUITIONS.find(inst => inst.name == account?.instituition)?.logo
    
        useEffect(() => {
            if (account || (account && refresh)) {
                readTransactions(account.id)
            }
        }, [ account, refresh ])
        return (
            <VStack bg={hardlightColor} h={SCREEN_CONTAINER_WIDTH / 2 + sizes["5"]} rounded="2xl" w={SCREEN_CONTAINER_WIDTH} p="3" space="2">
                <Skeleton.Text lines={2} w="1/3" {...skeletonDefinition}>
                    <HStack justifyContent="space-between">
                        <VStack>
                            <Text textTransform="uppercase" color="white" fontSize="xs">{account?.instituition}</Text>
                            <Heading color="white" fontSize="md">{account?.name}</Heading>
                        </VStack>
                        {
                            accountInstituitionLogo && 
                            <Image 
                                source={accountInstituitionLogo}
                                resizeMode="cover"
                                size="2xs"
                                rounded="sm"
                                alt="Logo da instituição"
                            />
                        }
                    </HStack>
                </Skeleton.Text>
                <Skeleton h="16" flex={1} rounded="md"  {...skeletonDefinition}>
                    <Box flex={1} justifyContent="center">
                        <Text color="gray.100" fontWeight="light" fontSize="lg">total acumulado</Text>
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
                                size="lg"
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
                                size="lg"
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
)
