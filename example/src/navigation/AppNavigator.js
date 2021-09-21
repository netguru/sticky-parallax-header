import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, CardScreen } from '../screens';
import YodaScreen from '../screens/additionalExamples/YodaScreen';
import AppStoreHeader from '../screens/additionalExamples/SimsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Card" component={CardScreen} />
      <Stack.Screen name="AppStore" component={AppStoreHeader} />
      <Stack.Screen name="Yoda" component={YodaScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
