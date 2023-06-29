import { NavigationContainer } from "@react-navigation/native";
import StartRoutes from "./start.routes";
import MainRoutes from "./main.routes";
import useUser from "hooks/useUser";

export default function RoutesNavigator() {
    const { user } = useUser()
    return (
        <NavigationContainer>
            { user ? <MainRoutes /> : <StartRoutes/> }
        </NavigationContainer>
    )
}