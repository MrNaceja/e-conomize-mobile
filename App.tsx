import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'
import { THEME } from 'theme';

import RoutesNavigator from 'routes';
import AppContextProvider from 'contexts/AppContextProvider';
import StorageThemeColorMode from 'services/StorageThemeColorModel';
import { useMemo } from 'react';

/*
 * Ponto Inicial da Aplicação.
 */
export default function App() {
  const themeManager = useMemo(() => StorageThemeColorMode(), [])
  return (
    <NativeBaseProvider theme={THEME} colorModeManager={themeManager}>
      <AppContextProvider>
        <RoutesNavigator />
      </AppContextProvider>
    </NativeBaseProvider>
  );
}
