import { Box, HStack, Heading, Text, VStack, theme, useTheme } from "native-base";
import { Dimensions } from 'react-native';

export const ACCOUNT_CARD_WIDTH = Dimensions.get('window').width - theme.sizes["10"]

export default function AccountCard() {
    return (
        <VStack bg="indigo.500" h="full" rounded="2xl" w={ACCOUNT_CARD_WIDTH} p="3">
            <Heading textTransform="uppercase" color="white">Nubank</Heading>
            <Box>
                <Text>total acumulado</Text>
                <Heading fontSize="5xl">R$ 1.200,89</Heading>
            </Box>
            <HStack>

            </HStack>
        </VStack>
    )
}