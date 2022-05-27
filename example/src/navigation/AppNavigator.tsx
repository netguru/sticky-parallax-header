import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { CardScreen, HomeScreen, SimsScreen, YodaScreen } from '../screens';
import {
  AvatarHeaderFlatListExample,
  AvatarHeaderScrollViewExample,
  AvatarHeaderSectionListExample,
  DetailsHeaderFlatListExample,
  DetailsHeaderScrollViewExample,
  DetailsHeaderSectionListExample,
  StickyHeaderFlatListExample,
  StickyHeaderScrollViewExample,
  StickyHeaderSectionListExample,
  TabbedHeaderListExample,
  TabbedHeaderPagerExample,
} from '../screens/additionalExamples';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Card" component={CardScreen} />
      <Stack.Screen name="Sims" component={SimsScreen} />
      <Stack.Screen name="Yoda" component={YodaScreen} />
      <Stack.Screen name="StickyHeaderFlatList" component={StickyHeaderFlatListExample} />
      <Stack.Screen name="StickyHeaderScrollView" component={StickyHeaderScrollViewExample} />
      <Stack.Screen name="StickyHeaderSectionList" component={StickyHeaderSectionListExample} />
      <Stack.Screen name="TabbedHeaderList" component={TabbedHeaderListExample} />
      <Stack.Screen name="TabbedHeaderPager" component={TabbedHeaderPagerExample} />
      <Stack.Screen name="AvatarHeaderFlatList" component={AvatarHeaderFlatListExample} />
      <Stack.Screen name="AvatarHeaderScrollView" component={AvatarHeaderScrollViewExample} />
      <Stack.Screen name="AvatarHeaderSectionList" component={AvatarHeaderSectionListExample} />
      <Stack.Screen name="DetailsHeaderFlatList" component={DetailsHeaderFlatListExample} />
      <Stack.Screen name="DetailsHeaderScrollView" component={DetailsHeaderScrollViewExample} />
      <Stack.Screen name="DetailsHeaderSectionList" component={DetailsHeaderSectionListExample} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
