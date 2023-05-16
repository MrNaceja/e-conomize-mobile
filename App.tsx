import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'
import HelloScreen from './src/screens/HelloScreen';
import { THEME } from 'theme';



export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="auto" />
      <HelloScreen />
    </NativeBaseProvider>
  );
}
