import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'
import HelloScreen from './src/screens/HelloScreen';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <HelloScreen />
    </NativeBaseProvider>
  );
}
