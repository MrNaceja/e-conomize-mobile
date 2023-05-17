import { VStack } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import Header from "./Header";

interface IScreenProps extends IVStackProps {
    showHeader?: boolean
}
export default function Screen({showHeader = true, ...vStackProps} : IScreenProps) {
    return (
        <VStack bg="gray.100" flex={1} pt="10">
            { showHeader && <Header /> }
            <VStack flex={1} {...vStackProps}/>
        </VStack>
    )
}