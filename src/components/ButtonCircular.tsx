import { IIconButtonProps, Icon, IconButton } from "native-base";
import { Entypo } from '@expo/vector-icons'

interface IButtonCircularProps extends IIconButtonProps{
    iconName: keyof typeof Entypo.glyphMap
}
export default function ButtonCircular({iconName, size, ...iconButtonProps} : IButtonCircularProps) {
    return (
        <IconButton 
            bg="green.500"
            h={size}
            w={size}
            variant="solid"
            _pressed={{
                bg: "green.600"
            }}
            rounded="full"
            icon={
                <Icon as={Entypo} name={iconName} size="3xl" color="white"/>
            }
            {...iconButtonProps}
        />
    )
}