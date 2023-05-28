import { Box, HStack, Heading, Icon, Text, VStack } from "native-base";

import { Ionicons } from "@expo/vector-icons"

import { SCREEN_CONTAINER_WIDTH } from "./Screen";

export default function AccountCard() {
    return (
        <VStack bg="indigo.500" h="full" rounded="2xl" w={SCREEN_CONTAINER_WIDTH} px="3" py="5" space="3">
            <Heading textTransform="uppercase" color="white" fontSize="md">Nubank</Heading>
            <Box>
                <Text color="gray.100" fontWeight="light" fontSize="md">total acumulado</Text>
                <Heading fontSize="5xl" color="white">R$ 1.200,89</Heading>
            </Box>
            <HStack justifyContent="center" bg="indigo.600" space="10" p="1" rounded="lg">
                <HStack alignItems="center" space="2">
                    <Icon 
                        as={Ionicons}
                        name="trending-up"
                        color="white"
                        size="md"
                    />
                    <VStack>
                        <Text color="gray.100" textTransform="uppercase" fontSize="2xs">ganhos</Text>
                        <Text color="gray.100" fontWeight="bold">R$ 310,76</Text>
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
                        <Text color="gray.100" fontWeight="bold">R$ 128,00</Text>
                    </VStack>
                </HStack>
            </HStack>
        </VStack>
    )
}