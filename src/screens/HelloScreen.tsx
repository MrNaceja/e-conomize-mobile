import { useState } from "react";
import { Box, Center, Heading, Input, Text, VStack } from "native-base";

import LogoEconomizeLightSvg from 'assets/LogoEconomizeLight.svg'

import {ButtonCircular} from "components/ButtonCircular";
import Screen from "components/Screen";

import { TStartRoutesScreens } from "routes/start.routes";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useUser from "hooks/useUser";

/**
 * Tela de Boas Vindas do App.
 */
export default function HelloScreen({ navigation } : NativeStackScreenProps<TStartRoutesScreens>) {
    const [userName, setUserName] = useState('')
    const { setUser } = useUser()

    function handleGrantUser() {
        setUser(userName)
        navigation.navigate("main")
    }

    return (
        <Screen justifyContent="center">
            <VStack space="5" px="5">
                <Center> 
                    <LogoEconomizeLightSvg width="80%" /> 
                </Center>
                <Box>
                    <Heading 
                        _light={{ color: "gray.900" }}
                        _dark={{ color: "gray.100" }}
                        fontSize="4xl"
                    >
                        Bora economizar?
                    </Heading>
                    <Text color="gray.500" textAlign="left">
                        Por aqui você pode gerenciar melhor suas finanças, se programar e conseguir alcançar suas metas
                    </Text>
                </Box>
                <Input 
                    placeholder="seu lindo nome"
                    fontSize="lg"
                    bg="white"
                    shadow="10"
                    borderWidth="1"
                    borderColor="transparent"
                    _focus={{
                        bg: "white",
                        borderColor: "green.500"
                    }}
                    p="5"
                    onChangeText={setUserName}
                    value={userName}
                />
                <ButtonCircular 
                    alignSelf="center" 
                    iconName="forward"
                    size="32"
                    shadow="10"
                    mt="10"
                    isDisabled={userName == ''}
                    onPress={handleGrantUser}
                />
            </VStack>
        </Screen>
    )
}