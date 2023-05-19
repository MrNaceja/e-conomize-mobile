import { MaterialBottomTabNavigationProp, createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons'

import AccountsScreen from 'screens/AccountsScreen';
import HomeScreen from 'screens/HomeScreen';

export type TMainRoutesScreens = {
    home: undefined;
    accounts: undefined
}
export type TMainRoutesNavigationProps = MaterialBottomTabNavigationProp<TMainRoutesScreens>

/**
 * Rotas da pagina principal do App.
*/
export default function MainRoutes() {
    const TabNavigation = createMaterialBottomTabNavigator<TMainRoutesScreens>()
    const { colors } = useTheme()
    return (
        <TabNavigation.Navigator 
            initialRouteName='home'
            // labeled={false}
            shifting
            barStyle={{
                backgroundColor: colors.white,
            }}
            activeColor={ colors.green["500"] }
            inactiveColor={ colors.gray["300"] }
        >
            <TabNavigation.Screen 
                name='home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" color={color}/>,
                    tabBarColor: colors.blue["500"]
                }}
            />
            <TabNavigation.Screen 
                name='accounts'
                component={AccountsScreen}
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="wallet" color={color}/>
                }}
            />
        </TabNavigation.Navigator>
    )
}