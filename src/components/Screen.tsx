import { VStack } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";

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