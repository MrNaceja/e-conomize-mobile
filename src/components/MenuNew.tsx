import { Icon, Menu, Text, useTheme } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { ButtonCircular } from "./ButtonCircular";

import useManagerModal from "hooks/useManagerModal";
import useMainScreens from "hooks/useMainScreens";

/**
 * Menu de Interações para novos dados.
 */
export default function MenuNew() {
    const { openModal }       = useManagerModal()
    const { displayedScreen } = useMainScreens()
    const { shadows, colors } = useTheme()
    return (
        <Menu 
            trigger={triggerProps => (
                <ButtonCircular iconName="plus" size="20" mb="10" shadow="10" ref={triggerProps.ref} {...triggerProps}/>
            )}
            placement="top"
            _light={{
                style: {...shadows[10], shadowColor: colors.gray[400]}
            }}
            _dark={{
                style: {...shadows[10], shadowColor: colors.gray[900]}
            }}
            rounded="2xl"
            overflow="hidden"
            _backdrop={{
                _light: { bg:"gray.800" },
                _dark: { bg:"gray.500" }
            }}
        >
            <Menu.Group title={displayedScreen == "home" ? "Transações" : "Contas"}>
                {
                    displayedScreen == "home" 
                    ?
                        <>
                            <Menu.Item onPress={() => openModal("gain")} _pressed={{ _dark: { bg: "gray.700" } }}>
                                <Icon as={MaterialCommunityIcons} name="trending-up" size="8" color="green.500"/>
                                <Text fontSize="md">Novo Ganho</Text>
                            </Menu.Item>
                            <Menu.Item onPress={() => openModal("expense")} _pressed={{ _dark: { bg: "gray.700" } }}>
                                <Icon as={MaterialCommunityIcons} name="trending-down" size="8" color="red.500"/>
                                <Text fontSize="md">Nova Despesa</Text>
                            </Menu.Item>
                        </> 
                    :
                        <>
                            <Menu.Item onPress={() => openModal("account")} _pressed={{ _dark: { bg: "gray.700" } }}>
                                <Icon 
                                    as={MaterialCommunityIcons} 
                                    name="wallet" 
                                    size="8" 
                                    _light={{color:"gray.700"}}
                                    _dark={{color:"gray.500"}}
                                    />
                                <Text fontSize="md">Nova Conta</Text>
                            </Menu.Item>
                        </>
                }
            </Menu.Group>
        </Menu>
    )
}
