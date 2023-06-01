import { Box, HStack, Heading, Text, VStack } from "native-base";
import { StatusBar } from 'react-native'
import LogoSvg from 'assets/logo-economize.svg'
import useUser from "hooks/useUser";

export default function Header() {
    const user = useUser()
    return (
        <HStack alignItems="center" justifyContent="space-between" px="5" style={{marginTop: StatusBar.currentHeight}}>
           <VStack>
                <Text color="gray.600" fontSize="md">Bom dia,</Text>
                <Heading fontSize="2xl">{ user }</Heading>
           </VStack>
           <Box size="sm" h="10" alignItems="center">
                <LogoSvg height="100%"/>
           </Box>
        </HStack>
    )
}