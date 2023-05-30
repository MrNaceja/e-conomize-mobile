import { IIconButtonProps, Icon, IconButton } from "native-base";
import { Entypo } from '@expo/vector-icons'
import { forwardRef } from 'react';
import { ThemeComponentSizeType } from "native-base/lib/typescript/components/types";

interface IButtonCircularProps extends IIconButtonProps{
    iconName: keyof typeof Entypo.glyphMap,
    iconSize?: ThemeComponentSizeType<"Icon">
}
export const ButtonCircular = forwardRef<IIconButtonProps, IButtonCircularProps>(({iconName, size, iconSize = "3xl", ...iconButtonProps}, ref) => {
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
                <Icon as={Entypo} name={iconName} size={iconSize} color="white"/>
            }
            {...iconButtonProps}
        />
    )
})