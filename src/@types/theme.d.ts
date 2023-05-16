import { defaultTheme } from "theme/defaultTheme";

export type TTheme = typeof defaultTheme

declare module 'native-base' {
    interface TTheme extends CustomThemeType {};
}