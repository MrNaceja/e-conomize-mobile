import { VStack } from "native-base";

import Logo from '@assets/logo-economize.svg'

/**
 * Tela de Boas Vindas do App.
 */
export default function HelloScreen() {
    return (
        <VStack bg="gray.200">
            <Logo />
        </VStack>
    )
}