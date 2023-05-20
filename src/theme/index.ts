import { extendTheme, theme, Menu } from 'native-base';
const { colors } = theme

export const THEME = extendTheme({
  shadows: {
    '10': {
      shadowColor: colors.gray[400],
      elevation: 30,
    }
  },
  components: {
    MenuItem: {
      baseStyle: {
        _pressed: {
          bg: "gray.100"
        }
      }
    }
  }
});