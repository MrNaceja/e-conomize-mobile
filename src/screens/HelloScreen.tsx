import { Center, Heading, Input, Text, VStack } from "native-base";

import Logo from 'assets/logo-economize.svg'

/**
 * Tela de Boas Vindas do App.
 */
export default function HelloScreen() {
    return (
        <VStack bg="gray.100" flex={1} justifyContent="center" px="5">
            <Center>
                <Logo />
            </Center>
            <Heading color="gray.900" fontSize="4xl">Bora economizar?</Heading>
            <Text color="gray.500" textAlign="left">
                Por aqui você pode gerenciar melhor suas finanças, se programar e conseguir alcançar suas metas
            </Text>
            <Input 
                placeholder="seu lindo nome"
                fontSize="lg"
                borderWidth="0"
                bg="white"
                shadow="10"
                p="5"
            />
        </VStack>
    )
}