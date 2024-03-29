import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Header from 'components/Header';
import { useColorModeValue, useTheme } from 'native-base';

import AccountsScreen from 'screens/AccountsScreen';
import HomeScreen from 'screens/HomeScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons'
import MenuNew from 'components/MenuNew';
import useAccount from 'hooks/useAccount';

export type TMainRoutesScreens = {
    home: undefined,
    accounts: undefined,
    new: undefined
}
export type TMainRoutesNavigationProps = BottomTabNavigationProp<TMainRoutesScreens>

/**
 * Rotas da pagina principal do App.
*/
export default function MainRoutes() {
    const TabNavigation     = createBottomTabNavigator<TMainRoutesScreens>()
    const { colors, sizes } = useTheme()
    const { hasAccounts }   = useAccount()
    const tabBarBgTheme = useColorModeValue(colors.white, colors.gray[800])
    const tabBarIconInactiveBgTheme = useColorModeValue(colors.gray["300"], colors.gray["500"])
    return (
        <TabNavigation.Navigator 
            initialRouteName={hasAccounts ? "home" : "accounts"}
            screenOptions={{
                header: () => <Header />,
                tabBarActiveTintColor: colors.green["500"],
                tabBarInactiveTintColor: tabBarIconInactiveBgTheme,
                tabBarShowLabel: false,
                tabBarStyle: {
                    elevation: 0,
                    borderTopColor: "transparent",
                    backgroundColor: tabBarBgTheme,
                    height: sizes["16"]
                },
            }}
        >
            <TabNavigation.Screen 
                name="home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
                }}
            />
            <TabNavigation.Screen 
                name="new"
                component={HomeScreen}
                options={() => ({
                    tabBarIcon: () => <MenuNew />
                })}
                listeners={() => ({
                    tabPress: (e) => {
                      e.preventDefault();
                    },
                })}
            />
            <TabNavigation.Screen 
                name="accounts"
                component={AccountsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="wallet" color={color} size={size} />
                }}
            />
        </TabNavigation.Navigator>
    )
}