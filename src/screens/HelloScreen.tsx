import { Box, Center, Heading, Input, Text, VStack } from "native-base";

import Logo from 'assets/logo-economize.svg'
import ButtonCircular from "components/ButtonCircular";

/**
 * Tela de Boas Vindas do App.
 */
export default function HelloScreen() {
    return (
        <VStack bg="gray.100" flex={1} justifyContent="center" px="5">
            <VStack space="5">
                <Center> <Logo /> </Center>
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
                />
            </VStack>
            <ButtonCircular alignSelf="center" mt="10" />
        </VStack>
    )
}