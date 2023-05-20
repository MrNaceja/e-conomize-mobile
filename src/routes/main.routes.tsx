import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Header from 'components/Header';
import { useTheme } from 'native-base';

import AccountsScreen from 'screens/AccountsScreen';
import HomeScreen from 'screens/HomeScreen';

export type TMainRoutesScreens = {
    home: undefined;
    accounts: undefined
}
export type TMainRoutesNavigationProps = BottomTabNavigationProp<TMainRoutesScreens>

/**
 * Rotas da pagina principal do App.
*/
export default function MainRoutes() {
    const TabNavigation = createBottomTabNavigator<TMainRoutesScreens>()
    const { colors, sizes } = useTheme()
    return (
        <TabNavigation.Navigator 
            initialRouteName='home'
            screenOptions={{
                header: () => <Header />
            }}
        >
            <TabNavigation.Screen 
                name='home'
                component={HomeScreen}
            />
            <TabNavigation.Screen 
                name='accounts'
                component={AccountsScreen}
            />
        </TabNavigation.Navigator>
    )
}