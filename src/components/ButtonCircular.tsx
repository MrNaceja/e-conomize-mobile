import { IIconButtonProps, Icon, IconButton } from "native-base";
import { Entypo } from '@expo/vector-icons'

interface IButtonCircularProps extends IIconButtonProps{

}
export default function ButtonCircular({...iconButtonProps} : IButtonCircularProps) {
    return (
        <IconButton 
            bg="green.500"
            h="24"
            w="24"
            rounded="full"
            icon={
                <Icon as={Entypo} name="forward" size="3xl" color="white"/>
            }
            {...iconButtonProps}
        />
    )
}