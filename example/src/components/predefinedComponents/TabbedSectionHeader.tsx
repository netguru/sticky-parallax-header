import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { SectionType } from '../../assets/data/tabbedSections';
import { colors } from '../../constants';

export const TabbedSectionHeader: React.FC<SectionType> = ({ title }) => {
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
    backgroundColor: colors.activeOrange,
    elevation: 1.4,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1.4 },
    shadowOpacity: 0.8,
    shadowRadius: 2.2,
  },
  sectionTitle: {
    color: colors.white,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
