import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Header from 'components/Header';
import { useTheme } from 'native-base';

import AccountsScreen from 'screens/AccountsScreen';
import HomeScreen from 'screens/HomeScreen';

import { Entypo } from '@expo/vector-icons'
import MenuNew from 'components/MenuNew';

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
    const TabNavigation = createBottomTabNavigator<TMainRoutesScreens>()
    const { colors, sizes } = useTheme()
    return (
        <TabNavigation.Navigator 
            initialRouteName='home'
            screenOptions={{
                header: () => <Header />,
                tabBarActiveTintColor: colors.green["500"],
                tabBarInactiveTintColor: colors.gray["300"],
                tabBarShowLabel: false,
                tabBarStyle: {
                    elevation: 0,
                    borderTopColor: "transparent",
                    backgroundColor: colors.white,
                    height: sizes["16"]
                },
            }}
        >
            <TabNavigation.Screen 
                name='home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size}/>
                }}
            />
            <TabNavigation.Screen 
                name='new'
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <MenuNew />
                    )
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                      e.preventDefault(); // Impede a mudança de tela
                    //   openModal(); // Abre o modal
                    },
                })}
            />
            <TabNavigation.Screen 
                name='accounts'
                component={AccountsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="wallet" color={color} size={size}/>
                }}
            />
        </TabNavigation.Navigator>
    )
}