import { extendTheme, theme, Skeleton } from 'native-base';
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
    },
    Skeleton: {
      baseStyle: {
        startColor: "gray.200",
        endColor: "gray.300"
      }
    }
  }
});