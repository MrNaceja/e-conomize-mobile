import { THEME } from "theme";

type TTheme = typeof THEME;

declare module 'native-base' {
  interface ICustomTheme extends TTheme {}
}