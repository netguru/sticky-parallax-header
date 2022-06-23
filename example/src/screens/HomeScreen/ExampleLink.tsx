import { useNavigation } from '@react-navigation/native';
import type { VFC } from 'react';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../constants';
import { ROUTES } from '../../navigation/routes';
import type { RootStackNavigationProp } from '../../navigation/types';

interface ExampleLinkProps {
  routeName: typeof ROUTES[keyof typeof ROUTES];
  label: string;
}

export const EXAMPLES: Array<ExampleLinkProps> = [
  {
    routeName: ROUTES.YODA,
    label: 'Pager with Tabs and custom header bar (Yoda)',
  },
  {
    routeName: ROUTES.SIMS,
    label: 'Custom sticky header component (Sims - AppStore)',
  },
  {
    routeName: ROUTES.STICKY_HEADER_FLATLIST,
    label: 'New StickyHeaderFlatList',
  },
  {
    routeName: ROUTES.STICKY_HEADER_SCROLLVIEW,
    label: 'New StickyHeaderScrollView',
  },
  {
    routeName: ROUTES.STICKY_HEADER_SECTIONLIST,
    label: 'New StickyHeaderSectionList',
  },
  {
    routeName: ROUTES.TABBED_HEADER_LIST,
    label: 'List with tabs',
  },
  {
    routeName: ROUTES.TABBED_HEADER_PAGER,
    label: 'Pager with Tabs and logo',
  },
  {
    routeName: ROUTES.AVATAR_HEADER_FLATLIST,
    label: 'User Modal (FlatList)',
  },
  {
    routeName: ROUTES.AVATAR_HEADER_SCROLLVIEW,
    label: 'User Modal (ScrollView)',
  },
  {
    routeName: ROUTES.AVATAR_HEADER_SECTIONLIST,
    label: 'User Modal (SectionList)',
  },
  {
    routeName: ROUTES.DETAILS_HEADER_FLATLIST,
    label: 'Card Screen (FlatList)',
  },
  {
    routeName: ROUTES.DETAILS_HEADER_SCROLLVIEW,
    label: 'Card Screen (ScrollView)',
  },
  {
    routeName: ROUTES.DETAILS_HEADER_SECTIONLIST,
    label: 'Card Screen (SectionList)',
  },
];

export const ExampleLink: VFC<ExampleLinkProps> = ({ routeName, label }) => {
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
    <TouchableOpacity onPress={navigateTo(routeName)}>
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
