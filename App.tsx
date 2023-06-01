import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'
import { THEME } from 'theme';

import RoutesNavigator from 'routes';
import AppContextProvider from 'contexts/AppContextProvider';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="auto"/>
      <AppContextProvider>
        <RoutesNavigator />
      </AppContextProvider>
    </NativeBaseProvider>
  );
}
