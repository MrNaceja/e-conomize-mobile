import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'
import { THEME } from 'theme';

import HelloScreen from './src/screens/HelloScreen';
import HomeScreen from 'screens/HomeScreen';

export default function App() {

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="auto"/>
      {/* <HelloScreen /> */}
      <HomeScreen />
    </NativeBaseProvider>
  );
}
