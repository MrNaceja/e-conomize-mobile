import { FormControl, IInputProps, Input } from "native-base";
import { formatMonetary } from "utils/scripts/formatMonetary";

interface ICampoFormProps extends Omit<IInputProps, 'type'> {
    label?: string,
    errorMsg?: string,
    type?: 'text' | 'password' | 'monetary',
    onChangeText?: (value: string) => void,
    _renderComponent?: () => JSX.Element
}
/*
 * Componente de Campo de Formulário
 */
export default function CampoForm({ label, errorMsg, type, onChangeText = text => text, value = '0', keyboardType, _renderComponent, isRequired, isInvalid, ...inputProps } : ICampoFormProps) {
    const invalidState = !!errorMsg || isInvalid
    return (
        <FormControl isRequired={isRequired} isInvalid={invalidState}>
            <FormControl.Label _text={{
                fontSize: "sm",
                color: "gray.400",
                textTransform: "uppercase"
            }}>
                { label }
            </FormControl.Label>
            {
                _renderComponent
                ? _renderComponent()
                : (
                    <Input 
                        bg="gray.100"
                        borderColor="transparent"
                        color="gray.400"
                        p="3"
                        borderRadius="lg"
                        fontSize={type == "monetary" ? "5xl" : "xl"}
                        _focus={{
                            bg:"gray.100",
                            borderColor:"gray.200"
                        }}
                        keyboardType={type == "monetary" ? "number-pad" : keyboardType}
                        onChangeText={text => {
                            if (type == "monetary") {
                                text = formatMonetary(text.replace('R$', ''))
                            }
                            return onChangeText(text)
                        }}
                        value={type == "monetary" ? formatMonetary(value.toString()) : value}
                        type={type == "monetary" ? "text" : type}
                        {...inputProps}
                    />
                )
            }
            <FormControl.ErrorMessage color="red.500">{errorMsg}</FormControl.ErrorMessage>
        </FormControl>
    )
}