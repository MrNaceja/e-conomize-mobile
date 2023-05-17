import { Box, HStack, Heading, Text, VStack } from "native-base";

import LogoSvg from 'assets/logo-economize.svg'

export default function Header() {
    return (
        <HStack alignItems="center" justifyContent="space-between" px="5">
           <VStack>
                <Text color="gray.600" fontSize="md">Bom dia,</Text>
                <Heading fontSize="2xl">Eduardo</Heading>
           </VStack>
           <Box size="sm" h="10" alignItems="center">
                <LogoSvg height="100%"/>
           </Box>
        </HStack>
    )
}