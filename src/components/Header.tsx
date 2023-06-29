import { Box, HStack, Heading, Text, VStack } from "native-base";
import { StatusBar } from 'react-native'
import LogoSvg from 'assets/logo-economize.svg'
import useUser from "hooks/useUser";
import moment from "moment";
import { useMemo } from "react";

export default function Header() {
    const { user } = useUser()

    const greeting = useMemo(() => {
        const currentDate = moment().locale('pt-br');
        switch (true) {
            case currentDate.isBefore(moment('12:00', 'HH:mm')):
                return 'Bom dia,'
            case currentDate.isBefore(moment('18:00', 'HH:mm')):
                return 'Boa tarde,'
            default: 
                return 'Boa noite,'
        }
    }, [])
    
    return (
        <HStack alignItems="center" justifyContent="space-between" px="5" style={{marginTop: StatusBar.currentHeight}}>
           <VStack>
                <Text color="gray.600" fontSize="md">{ greeting }</Text>
                <Heading fontSize="2xl">{ user }</Heading>
           </VStack>
           <Box size="sm" h="10" alignItems="center">
                <LogoSvg height="100%"/>
           </Box>
        </HStack>
    )
}