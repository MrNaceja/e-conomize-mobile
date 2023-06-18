import { findFocusedRoute, useNavigation } from "@react-navigation/native";
import { TMainRoutesScreens } from "routes/main.routes";

export default function useMainScreens() {
    const nav = useNavigation()
    const routeInFocus = (findFocusedRoute(nav.getState())?.name || "home") as keyof TMainRoutesScreens
    return { displayedScreen: routeInFocus}
}