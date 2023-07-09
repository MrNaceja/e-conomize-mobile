import { NavigationContainer } from "@react-navigation/native";
import StartRoutes from "./start.routes";
import MainRoutes from "./main.routes";
import useUser from "hooks/useUser";
import LoadingScreen from "screens/LoadingScreen";

export default function RoutesNavigator() {
    const { user, loadingUser } = useUser()
    return (
        <NavigationContainer>
            { loadingUser ? <LoadingScreen /> : (user ? <MainRoutes /> : <StartRoutes />) }
        </NavigationContainer>
    )
}