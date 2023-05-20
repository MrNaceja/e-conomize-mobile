import { Icon, Menu, Text } from "native-base";
import { ButtonCircular } from "./ButtonCircular";

import { Ionicons } from "@expo/vector-icons"
import { useNavigation, findFocusedRoute } from "@react-navigation/native";
import { TMainRoutesScreens } from "routes/main.routes";

/**
 * Menu de Interações para novos dados.
 */
export default function MenuNew() {
    const nav = useNavigation()
    const routeInFocus = (findFocusedRoute(nav.getState())?.name || "home") as keyof TMainRoutesScreens

    return (
        <Menu 
            trigger={(triggerProps) => (
                <ButtonCircular iconName="plus" size="20" mb="10" shadow="10" ref={triggerProps.ref} {...triggerProps}/>
            )}
            placement="top"
            shadow="10"
            rounded="2xl"
        >
            <Menu.Group title={`Nova ${routeInFocus == "home" ? "Transação" : "Conta"}`}>
                {
                    routeInFocus == "home" 
                    ?
                        <>
                            <Menu.Item>
                                <Icon as={Ionicons} name="trending-up" size="8" color="green.500"/>
                                <Text fontSize="md">Novo Ganho</Text>
                            </Menu.Item>
                            <Menu.Item >
                                <Icon as={Ionicons} name="trending-down" size="8" color="red.500"/>
                                <Text fontSize="md">Nova Despesa</Text>
                            </Menu.Item>
                        </> 
                    :
                        <>
                            <Menu.Item>
                                <Icon as={Ionicons} name="wallet" size="8" color="gray.700"/>
                                <Text fontSize="md">Nova Conta</Text>
                            </Menu.Item>
                        </>
                   
                }
            </Menu.Group>
        </Menu>
    )
}
