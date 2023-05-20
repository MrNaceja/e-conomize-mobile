import { NavigationContainer } from "@react-navigation/native";
import StartRoutes from "./start.routes";
import MainRoutes from "./main.routes";

export default function RoutesNavigator() {
    return (
        <NavigationContainer>
            <MainRoutes />
        </NavigationContainer>
    )
}