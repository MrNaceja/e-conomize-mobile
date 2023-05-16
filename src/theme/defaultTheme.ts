import { extendTheme } from "native-base";

export const defaultTheme = extendTheme({
    shadows: {
      10: {
        shadowColor: 'gray.800',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: .5,
        elevation: 2
      }
    }
});