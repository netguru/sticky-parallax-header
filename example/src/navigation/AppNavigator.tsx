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
import { FlashListExample } from '../screens/additionalExamples/FlashListExample';
import { TabbedHeaderWithSectionListsExample } from '../screens/additionalExamples/TabbedHeaderWithSectionLists';

import { ROUTES } from './routes';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.CARD} component={CardScreen} />
      <Stack.Screen name={ROUTES.SIMS} component={SimsScreen} />
      <Stack.Screen name={ROUTES.YODA} component={YodaScreen} />
      <Stack.Screen name={ROUTES.STICKY_HEADER_FLATLIST} component={StickyHeaderFlatListExample} />
      <Stack.Screen
        name={ROUTES.STICKY_HEADER_SCROLLVIEW}
        component={StickyHeaderScrollViewExample}
      />
      <Stack.Screen
        name={ROUTES.STICKY_HEADER_SECTIONLIST}
        component={StickyHeaderSectionListExample}
      />
      <Stack.Screen name={ROUTES.TABBED_HEADER_LIST} component={TabbedHeaderListExample} />
      <Stack.Screen name={ROUTES.TABBED_HEADER_PAGER} component={TabbedHeaderPagerExample} />
      <Stack.Screen name={ROUTES.AVATAR_HEADER_FLATLIST} component={AvatarHeaderFlatListExample} />
      <Stack.Screen
        name={ROUTES.AVATAR_HEADER_SCROLLVIEW}
        component={AvatarHeaderScrollViewExample}
      />
      <Stack.Screen
        name={ROUTES.AVATAR_HEADER_SECTIONLIST}
        component={AvatarHeaderSectionListExample}
      />
      <Stack.Screen
        name={ROUTES.DETAILS_HEADER_FLATLIST}
        component={DetailsHeaderFlatListExample}
      />
      <Stack.Screen
        name={ROUTES.DETAILS_HEADER_SCROLLVIEW}
        component={DetailsHeaderScrollViewExample}
      />
      <Stack.Screen
        name={ROUTES.DETAILS_HEADER_SECTIONLIST}
        component={DetailsHeaderSectionListExample}
      />
      <Stack.Screen
        name={ROUTES.TABBED_HEADER_WITH_SECTION_LISTS}
        component={TabbedHeaderWithSectionListsExample}
      />
      <Stack.Screen name={ROUTES.FLASHLIST} component={FlashListExample} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
