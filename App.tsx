import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'
import { THEME } from 'theme';

import RoutesNavigator from 'routes';
import AppContextProvider from 'contexts/AppContextProvider';

/*
 * Ponto Inicial da Aplicação.
 */
export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="dark"/>
      <AppContextProvider>
        <RoutesNavigator />
      </AppContextProvider>
    </NativeBaseProvider>
  );
}
