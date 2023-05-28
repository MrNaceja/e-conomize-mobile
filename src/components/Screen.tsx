import { VStack } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { Dimensions } from "react-native";

import { theme } from 'native-base'

/**
 * Largura total do dispositivo
 */
export const SCREEN_WIDTH = Dimensions.get('window').width

/**
 * Largura do dispositivo reduzindo o espaçamento horizontal
 */
export const SCREEN_CONTAINER_WIDTH = SCREEN_WIDTH - theme.sizes["10"] 

interface IScreenProps extends IVStackProps {
    showHeader?: boolean
}
export default function Screen(props : IScreenProps) {
    return (
        <VStack bg="gray.100" flex={1} space="2" pt="5">
            <VStack flex={1} {...props}/>
        </VStack>
    )
}