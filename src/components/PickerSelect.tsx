import { useColorModeValue, useTheme } from "native-base";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { StyleSheet } from "react-native";

interface IPickerSelectProps<DataType> extends DropdownProps<DataType> {

}
export default function PickerSelect<DataType>({data, placeholderStyle, selectedTextStyle, style, ...dropdownProps} : IPickerSelectProps<DataType>) {
    const { fontSizes, colors, radii, sizes } = useTheme()
    const bgTheme = useColorModeValue(colors.gray[100], colors.gray[700])
    const itemPressedBgTheme = useColorModeValue(colors.gray[200], colors.gray[600])
    return (
        <Dropdown
            mode="default"
            data={data}
            placeholder="Selecione..."
            placeholderStyle={StyleSheet.flatten([{ 
                color: colors.gray[400],
                textTransform: "uppercase", 
                fontSize: fontSizes.sm, 
                fontWeight: "500",
            }, placeholderStyle])}
            selectedTextStyle={StyleSheet.flatten([{
                color: colors.gray[400],
                textTransform: "uppercase", 
                fontSize: fontSizes.sm, 
                fontWeight: "500"
            }, selectedTextStyle])}
            containerStyle={{
                backgroundColor: bgTheme, 
                borderRadius:radii.lg, 
                marginTop: sizes[0.5], 
                marginBottom: sizes[5],
                borderColor: bgTheme,
                overflow: "hidden",
            }}  
            style={StyleSheet.flatten([{
                backgroundColor: bgTheme, 
                padding: sizes[3], 
                borderRadius: radii.lg
            }, style])}
            activeColor={itemPressedBgTheme}
            iconColor={colors.gray[400]}
            inputSearchStyle={{borderRadius: radii.sm}}
            renderRightIcon={() => null}
            {...dropdownProps}
        />
    )
}