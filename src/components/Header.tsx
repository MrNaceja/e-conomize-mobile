import { HStack, Heading, Icon, Text, VStack, useColorMode, useColorModeValue, Pressable } from "native-base";
import { StatusBar } from 'react-native'

import LogoEconomizeLightSvg from 'assets/LogoEconomizeLight.svg'
import LogoEconomizeDarkSvg from 'assets/LogoEconomizeDark.svg'

import useUser from "hooks/useUser";
import moment from "moment";
import { useMemo } from "react";

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Header() {
    const { user } = useUser()
    const { toggleColorMode } = useColorMode()
    const iconToggleTheme = useColorModeValue("moon-waxing-crescent", "weather-sunny")
    const LogoEconomizeSvg = useColorModeValue(LogoEconomizeLightSvg, LogoEconomizeDarkSvg)
    
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
        <HStack 
            alignItems="center" 
            justifyContent="space-between" 
            px="5" 
            style={{marginTop: StatusBar.currentHeight}}
            _light={{ bg: "gray.100" }}
            _dark={{ bg: "gray.800" }}
        >
           <VStack>
                <Text
                    _light={{ color: "gray.600" }}
                    _dark={{ color: "gray.400" }}
                    fontSize="md"
                >
                    { greeting }
                </Text>
                <Heading fontSize="2xl">{ user }</Heading>
           </VStack>
           <HStack space="3" h="full" alignItems="center" justifyContent="flex-end">
                <LogoEconomizeSvg width="55%" height="100%" />
                <Pressable
                    onPress={toggleColorMode}
                    h="8"
                    w="8"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                    bg="red.500"
                    _light={{ bg: "gray.800" }}
                    _dark={{ bg: "gray.600" }}
                >
                    <Icon 
                        as={MaterialCommunityIcons}
                        name={iconToggleTheme}
                        size="lg"
                        color="yellow.500"
                    />
                </Pressable>
           </HStack>
        </HStack>
    )
}