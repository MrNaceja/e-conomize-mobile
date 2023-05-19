import { NavigationContainer } from "@react-navigation/native";
import StartRoutes from "./start.routes";

export default function RoutesNavigator() {
    return (
        <NavigationContainer>
            <StartRoutes />
        </NavigationContainer>
    )
}