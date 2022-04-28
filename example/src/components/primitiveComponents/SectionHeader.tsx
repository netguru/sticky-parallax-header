import type { FC } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SectionHeader: FC = () => {
  return <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionHeaderLabel}>Section header</Text>
  </View>;
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'springgreen',
    elevation: 2.5,
    shadowColor: 'seagreen',
    shadowOffset: { height: 0, width: 2.5 },
    shadowOpacity: 0.8,
    shadowRadius: 0.8,
    padding: 20,
  },
  sectionHeaderLabel: {
    color: 'darkgreen',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});
