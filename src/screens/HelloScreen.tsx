import { useState } from "react";
import { Box, Center, FormControl, Heading, Input, Text, VStack } from "native-base";

import LogoSvg from 'assets/logo-economize.svg'

import ButtonCircular from "components/ButtonCircular";
import Screen from "components/Screen";

/**
 * Tela de Boas Vindas do App.
 */
export default function HelloScreen() {
    const [userName, setUserName] = useState('')
    return (
        <Screen showHeader={false} justifyContent="center">
            <VStack space="5">
                <Center> 
                    <LogoSvg /> 
                </Center>
                <Box>
                    <Heading color="gray.900" fontSize="4xl">Bora economizar?</Heading>
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
                <ButtonCircular alignSelf="center" mt="10" isDisabled={userName == ''}/>
            </VStack>
        </Screen>
    )
}