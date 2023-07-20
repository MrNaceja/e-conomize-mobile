import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorMode, StorageManager } from 'native-base'
import { THEME_COLOR_MODE_STORAGE_KEY } from 'utils/keys/storageKeys';

export default function StorageThemeColorMode() : StorageManager {
    return {
        get: async () => {
          try {
            let val = await AsyncStorage.getItem(THEME_COLOR_MODE_STORAGE_KEY);
            return val === 'dark' ? 'dark' : 'light';
          } catch (error) {
            return 'light';
          }
        },
        set: async (value : ColorMode) => {
          try {
            await AsyncStorage.setItem(THEME_COLOR_MODE_STORAGE_KEY, value ?? 'light');
          } catch (error) {
            throw error
          }
        },
      }
}