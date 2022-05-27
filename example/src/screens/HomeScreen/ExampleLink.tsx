import { useNavigation } from '@react-navigation/native';
import type { VFC } from 'react';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../constants';

interface ExampleLinkProps {
  routeName: string;
  label: string;
}

export const EXAMPLES: Array<ExampleLinkProps> = [
  {
    routeName: 'Yoda',
    label: 'Pager with Tabs and custom header bar (Yoda)',
  },
  {
    routeName: 'Sims',
    label: 'Custom sticky header component (Sims - AppStore)',
  },
  {
    routeName: 'StickyHeaderFlatList',
    label: 'New StickyHeaderFlatList',
  },
  {
    routeName: 'StickyHeaderScrollView',
    label: 'New StickyHeaderScrollView',
  },
  {
    routeName: 'StickyHeaderSectionList',
    label: 'New StickyHeaderSectionList',
  },
  {
    routeName: 'TabbedHeaderList',
    label: 'List with tabs',
  },
  {
    routeName: 'TabbedHeaderPager',
    label: 'Pager with Tabs and logo',
  },
  {
    routeName: 'AvatarHeaderFlatList',
    label: 'User Modal (FlatList)',
  },
  {
    routeName: 'AvatarHeaderScrollView',
    label: 'User Modal (ScrollView)',
  },
  {
    routeName: 'AvatarHeaderSectionList',
    label: 'User Modal (SectionList)',
  },
  {
    routeName: 'DetailsHeaderFlatList',
    label: 'Card Screen (FlatList)',
  },
  {
    routeName: 'DetailsHeaderScrollView',
    label: 'Card Screen (ScrollView)',
  },
  {
    routeName: 'DetailsHeaderSectionList',
    label: 'Card Screen (SectionList)',
  },
];

export const ExampleLink: VFC<ExampleLinkProps> = ({ routeName, label }) => {
  const navigation = useNavigation();

  const navigateTo = useCallback(
    (route: string) => {
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
