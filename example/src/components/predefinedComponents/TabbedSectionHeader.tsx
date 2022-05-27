import type { FC } from 'react';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { SectionType } from '../../assets/data/tabbedSections';
import { colors } from '../../constants';

import { TABBED_SECTION_ITEM_HEIGHT } from './TabbedSectionItem';

export const TabbedSectionHeader: FC<SectionType> = ({ title }) => {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: colors.secondaryGreen,
    elevation: 1.4,
    height: TABBED_SECTION_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 15,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1.4 },
    shadowOpacity: 0.8,
    shadowRadius: 2.2,
  },
  sectionTitle: {
    color: colors.purpleishBlue,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
