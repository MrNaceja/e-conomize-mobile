import { extendTheme, theme } from "native-base";
const { colors } = theme

export const THEME = extendTheme({
  shadows: {
    '10': {
      shadowColor: colors.gray[400],
      elevation: 30,
    }
  }
});