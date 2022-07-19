import { useNavigation } from '@react-navigation/native';
import type { VFC } from 'react';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../constants';
import { ROUTES } from '../../navigation/routes';
import type { RootStackNavigationProp } from '../../navigation/types';

import { homeScreenTestIDs } from './testIDs';

interface ExampleLinkProps {
  routeName: typeof ROUTES[keyof typeof ROUTES];
  label: string;
  testID: string;
}

export const EXAMPLES: Array<ExampleLinkProps> = [
  {
    routeName: ROUTES.YODA,
    label: 'Pager with Tabs and custom header bar (Yoda)',
    testID: homeScreenTestIDs.yodaLink,
  },
  {
    routeName: ROUTES.SIMS,
    label: 'Custom sticky header component (Sims - AppStore)',
    testID: homeScreenTestIDs.simsLink,
  },
  {
    routeName: ROUTES.STICKY_HEADER_FLATLIST,
    label: 'New StickyHeaderFlatList',
    testID: homeScreenTestIDs.stickyHeaderFlatListLink,
  },
  {
    routeName: ROUTES.STICKY_HEADER_SCROLLVIEW,
    label: 'New StickyHeaderScrollView',
    testID: homeScreenTestIDs.stickyHeaderScrollViewLink,
  },
  {
    routeName: ROUTES.STICKY_HEADER_SECTIONLIST,
    label: 'New StickyHeaderSectionList',
    testID: homeScreenTestIDs.stickyHeaderSectionListLink,
  },
  {
    routeName: ROUTES.TABBED_HEADER_LIST,
    label: 'List with tabs',
    testID: homeScreenTestIDs.tabbedHeaderListLink,
  },
  {
    routeName: ROUTES.TABBED_HEADER_PAGER,
    label: 'Pager with Tabs and logo',
    testID: homeScreenTestIDs.tabbedHeaderPagerLink,
  },
  {
    routeName: ROUTES.AVATAR_HEADER_FLATLIST,
    label: 'User Modal (FlatList)',
    testID: homeScreenTestIDs.avatarHeaderFlatListLink,
  },
  {
    routeName: ROUTES.AVATAR_HEADER_SCROLLVIEW,
    label: 'User Modal (ScrollView)',
    testID: homeScreenTestIDs.avatarHeaderScrollViewLink,
  },
  {
    routeName: ROUTES.AVATAR_HEADER_SECTIONLIST,
    label: 'User Modal (SectionList)',
    testID: homeScreenTestIDs.avatarHeaderSectionListLink,
  },
  {
    routeName: ROUTES.DETAILS_HEADER_FLATLIST,
    label: 'Card Screen (FlatList)',
    testID: homeScreenTestIDs.detailsHeaderFlatListLink,
  },
  {
    routeName: ROUTES.DETAILS_HEADER_SCROLLVIEW,
    label: 'Card Screen (ScrollView)',
    testID: homeScreenTestIDs.detailsHeaderScrollViewLink,
  },
  {
    routeName: ROUTES.DETAILS_HEADER_SECTIONLIST,
    label: 'Card Screen (SectionList)',
    testID: homeScreenTestIDs.detailsHeaderSectionListLink,
  },
  {
    routeName: ROUTES.TABBED_HEADER_WITH_SECTION_LISTS,
    label: 'Tabbed Header with SectionList tabs',
    testID: homeScreenTestIDs.tabbedHeaderWithSectionLists,
  },
];

export const ExampleLink: VFC<ExampleLinkProps> = ({ routeName, label, testID }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const navigateTo = useCallback(
    (route: typeof ROUTES[keyof typeof ROUTES]) => {
      return () => {
        navigation.navigate(route);
      };
    },
    [navigation]
  );

  return (
    <TouchableOpacity onPress={navigateTo(routeName)} testID={testID}>
      <Text style={styles.linkLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkLabel: {
    color: colors.purplishBlue,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 20,
    padding: 10,
  },
});
