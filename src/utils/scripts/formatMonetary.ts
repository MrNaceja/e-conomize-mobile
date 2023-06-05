import { formatNumber } from "react-native-currency-input";

export const formatMonetary = (value : string) => {

    const textNumericValue = value.replace(/\D+/g, '');
    
    const precision = 2

    const numberValue = Number(textNumericValue) * 1;

    const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;

    let newValue: number | null;

    if (!textNumericValue || (!numberValue && zerosOnValue === precision)) {
        newValue = 0;
    } else {
        newValue = numberValue / 10 ** precision;
    }
    return formatNumber(newValue, {
        delimiter: ".",
        separator: ",",
        precision: 2,
        prefix: "R$",
    })
}
