import { VStack } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { Dimensions } from "react-native";

import { theme } from 'native-base'

/**
 * Largura total do dispositivo
 */
export const SCREEN_WIDTH = Dimensions.get('window').width

export const SCREEN_HORIZONTAL_SPACING = 5

/**
 * Largura do dispositivo reduzindo o espaçamento horizontal
 */
export const SCREEN_CONTAINER_WIDTH = SCREEN_WIDTH - (theme.sizes[SCREEN_HORIZONTAL_SPACING] * 2)

interface IScreenProps extends IVStackProps {
}
export default function Screen(props : IScreenProps) {
    return (
        <VStack
            _light={{ bg: "gray.100" }} 
            _dark={{ bg: "gray.800" }} 
            flex={1} 
            space="2" 
            pt="5"
        >
            <VStack flex={1} {...props}/>
        </VStack>
    )
}