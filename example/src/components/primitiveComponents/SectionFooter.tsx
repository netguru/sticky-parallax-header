import type { FC } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SectionFooter: FC = () => {
  return <View style={styles.sectionFooterContainer}>
    <Text style={styles.sectionFooterLabel}>Section footer</Text>
  </View>;
};

const styles = StyleSheet.create({
  sectionFooterContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    padding: 12,
  },
  sectionFooterLabel: {
    color: 'lightgreen',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});
