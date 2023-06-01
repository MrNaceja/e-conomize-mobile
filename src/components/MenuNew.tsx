import { useNavigation, findFocusedRoute } from "@react-navigation/native";
import { Icon, Menu, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons"

import { ButtonCircular } from "./ButtonCircular";

import { TMainRoutesScreens } from "routes/main.routes";
import useManagerModal from "hooks/useManagerModal";

/**
 * Menu de Interações para novos dados.
 */
export default function MenuNew() {
    const nav = useNavigation()
    const { openModal } = useManagerModal()
    const routeInFocus = (findFocusedRoute(nav.getState())?.name || "home") as keyof TMainRoutesScreens

    return (
        <Menu 
            trigger={triggerProps => (
                <ButtonCircular iconName="plus" size="20" mb="10" shadow="10" ref={triggerProps.ref} {...triggerProps}/>
            )}
            placement="top"
            shadow="10"
            rounded="2xl"
            _backdrop={{bg:"gray.500"}}
        >
            <Menu.Group title={routeInFocus == "home" ? "Transações" : "Contas"}>
                {
                    routeInFocus == "home" 
                    ?
                        <>
                            <Menu.Item onPress={() => openModal("gain")}>
                                <Icon as={Ionicons} name="trending-up" size="8" color="green.500"/>
                                <Text fontSize="md">Novo Ganho</Text>
                            </Menu.Item>
                            <Menu.Item onPress={() => openModal("expense")}>
                                <Icon as={Ionicons} name="trending-down" size="8" color="red.500"/>
                                <Text fontSize="md">Nova Despesa</Text>
                            </Menu.Item>
                        </> 
                    :
                        <>
                            <Menu.Item onPress={() => openModal("account")}>
                                <Icon as={Ionicons} name="wallet" size="8" color="gray.700"/>
                                <Text fontSize="md">Nova Conta</Text>
                            </Menu.Item>
                        </>
                   
                }
            </Menu.Group>
        </Menu>
    )
}
