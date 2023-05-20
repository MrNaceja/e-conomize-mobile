import { IIconButtonProps, Icon, IconButton } from "native-base";
import { Entypo } from '@expo/vector-icons'
import { forwardRef } from 'react';

interface IButtonCircularProps extends IIconButtonProps{
    iconName: keyof typeof Entypo.glyphMap
}
export const ButtonCircular = forwardRef<IIconButtonProps, IButtonCircularProps>(({iconName, size, ...iconButtonProps}, ref) => {
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
            ref={ref}
            icon={
                <Icon as={Entypo} name={iconName} size="3xl" color="white"/>
            }
            {...iconButtonProps}
        />
    )
})