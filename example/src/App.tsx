import * as Font from 'expo-font';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'AvertaStd-Semibold': require('./assets/fonts/AvertaStd-Semibold.otf'),
      'AvertaStd-Regular': require('./assets/fonts/AvertaStd-Regular.otf'),
    });
    setLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  });

  return <SafeAreaProvider>{loaded ? <AppNavigator /> : <></>}</SafeAreaProvider>;
}
