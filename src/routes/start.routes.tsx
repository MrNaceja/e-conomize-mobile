import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import HelloScreen from 'screens/HelloScreen'
import MainRoutes from './main.routes'

export type TStartRoutesScreens = {
    hello: undefined,
    main: undefined
}
export type TStartRoutesNavigationProps = NativeStackNavigationProp<TStartRoutesScreens>

/**
 *  Rotas da primeira vez no App.
 */
export default function StartRoutes() {
    const Stack = createNativeStackNavigator<TStartRoutesScreens>()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="hello" component={HelloScreen}/>
            <Stack.Screen name="main" component={MainRoutes}/>
        </Stack.Navigator>
    )
}