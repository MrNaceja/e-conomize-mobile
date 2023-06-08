import { FormControl, IInputProps, Input } from "native-base";
import { formatMonetary } from "utils/scripts/formatMonetary";

interface ICampoFormProps extends Omit<IInputProps, 'type'> {
    label?: string,
    type?: 'text' | 'password' | 'monetary',
    onChangeText?: (value: string) => void,
    _renderComponent?: () => JSX.Element
}
/*
 * Componente de Campo de Formulário
 */
export default function CampoForm({ label, type, onChangeText = text => text, value = '0', keyboardType, _renderComponent,...inputProps } : ICampoFormProps) {
    return (
        <FormControl>
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
                        color="gray.500"
                        p="5"
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
            
        <FormControl.ErrorMessage></FormControl.ErrorMessage>
    </FormControl>
    )
}