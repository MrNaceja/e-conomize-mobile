import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'
import HelloScreen from './src/screens/HelloScreen';
import { defaultTheme } from 'theme/defaultTheme';


export default function App() {
  return (
    <NativeBaseProvider theme={defaultTheme}>
      <StatusBar style="auto" />
      <HelloScreen />
    </NativeBaseProvider>
  );
}
