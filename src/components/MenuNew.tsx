import { Icon, Menu, Text } from "native-base";
import { ButtonCircular } from "./ButtonCircular";

import { Ionicons } from "@expo/vector-icons"

/**
 * Menu de Interações para novos dados.
 */
export default function MenuNew() {
    return (
        <Menu 
            trigger={(triggerProps) => (
                <ButtonCircular iconName="plus" size="20" mb="10" ref={triggerProps.ref} {...triggerProps}/>
            )}
            placement="top"
            shadow="none"
        >
            <Menu.Group title="Transações">
                <Menu.Item>
                    <Icon as={Ionicons} name="trending-up" size="8" color="green.500"/>
                    <Text fontSize="md">Novo Ganho</Text>
                </Menu.Item>
                <Menu.Item >
                    <Icon as={Ionicons} name="trending-down" size="8" color="red.500"/>
                    <Text fontSize="md">Nova Despesa</Text>
                </Menu.Item>
            </Menu.Group>
            <Menu.Group title="Contas">
                <Menu.Item>
                    <Icon as={Ionicons} name="wallet" size="8" color="gray.700"/>
                    <Text fontSize="md">Nova Conta</Text>
                </Menu.Item>
            </Menu.Group>
        </Menu>
    )
}
