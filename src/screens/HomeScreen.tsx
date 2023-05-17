import AccountCard, { ACCOUNT_CARD_WIDTH } from "components/AccountCard";
import Screen from "components/Screen";
import { FlatList, useTheme } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";
import { useState } from "react";
import { Dimensions } from "react-native";

/**
 * Tela de Inicio do App.
 */
export default function HomeScreen() {
    const { sizes } = useTheme()
    const [currentAccount, setCurrentAccount] = useState(0)
    return (
        <Screen>
            <FlatList
                _contentContainerStyle={{gap: sizes["0.5"], px: "5"} as Partial<IFlatListProps<number>>}
                showsHorizontalScrollIndicator={false} 
                horizontal
                maxH={ACCOUNT_CARD_WIDTH / 2}
                data={[1,2,3,4, 5, 6]}
                keyExtractor={item => item.toString()}
                renderItem={() => <AccountCard />}
                onScroll={e => setCurrentAccount(parseInt((e.nativeEvent.contentOffset.x / ACCOUNT_CARD_WIDTH).toFixed(0)))}
                decelerationRate="fast"
                snapToInterval={(ACCOUNT_CARD_WIDTH + (4 * sizes["0.5"]))}
            />
        </Screen>
    )
}