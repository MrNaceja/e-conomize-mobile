import { Heading, Popover, Text, useTheme } from "native-base";
import { ButtonCircular, IButtonCircularProps } from "./ButtonCircular";
import { InterfacePopoverProps } from "native-base/lib/typescript/components/composites/Popover/types";
import { SCREEN_HORIZONTAL_SPACING } from "./Screen";

/**
 * Componente de Hint
 */
interface IHintProps {
    title: string
    lineMessage: string[]
    _triggerProps?: Partial<IButtonCircularProps>
    placementInfo?: InterfacePopoverProps['placement'] 
}
export default function Hint({title, lineMessage, placementInfo = "bottom", _triggerProps} : IHintProps) {
    const { sizes } = useTheme()
    return (
        <Popover 
            trigger={triggerProps => (
                <ButtonCircular 
                    iconName="info" 
                    iconSize="xs"
                    size="1" 
                    {..._triggerProps}
                    {...triggerProps} 
                />
            )}
            placement={placementInfo}
            crossOffset={sizes[SCREEN_HORIZONTAL_SPACING]}
        >
            <Popover.Content>
                <Popover.Arrow />
                <Popover.Header p="2" alignItems="center">
                    <Heading fontSize="sm">{title}</Heading>
                </Popover.Header>
                <Popover.Body>
                    {
                        lineMessage.map((lineMsg, line) => <Text fontSize="xs" key={line}>{lineMsg}</Text>)
                    }
                </Popover.Body>
            </Popover.Content>
        </Popover>
    )
}