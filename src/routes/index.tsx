import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import StartRoutes from "./start.routes";
import MainRoutes from "./main.routes";
import useUser from "hooks/useUser";
import LoadingScreen from "screens/LoadingScreen";
import { StatusBar } from "expo-status-bar";
import { useColorModeValue, useTheme } from "native-base";

export default function RoutesNavigator() {
    const { user, loadingUser }    = useUser()
    const { colors }               = useTheme()
    const statusBarStyleTheme      = useColorModeValue('dark', 'light')
    DefaultTheme.colors.background = useColorModeValue(colors.gray[100], colors.gray[900])
    
    return (
        <NavigationContainer theme={DefaultTheme}>
            <StatusBar style={statusBarStyleTheme} translucent/>
            { loadingUser ? <LoadingScreen /> : (user ? <MainRoutes /> : <StartRoutes />) }
        </NavigationContainer>
    )
}