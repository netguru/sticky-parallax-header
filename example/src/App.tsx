import * as Font from 'expo-font';
import * as React from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [loaded, setLoaded] = React.useState(false);

  const loadFonts = React.useCallback(async () => {
    await Font.loadAsync({
      'AvertaStd-Semibold': require('./assets/fonts/AvertaStd-Semibold.otf'),
      'AvertaStd-Regular': require('./assets/fonts/AvertaStd-Regular.otf'),
    });
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    loadFonts();
    I18nManager.allowRTL(true);
  }, [loadFonts]);

  return <SafeAreaProvider>{loaded ? <AppNavigator /> : <></>}</SafeAreaProvider>;
}
