import * as React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

import { colors, screenStyles } from '../../constants';

export const Paragraph: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Pressable
      android_ripple={{
        borderless: false,
        color: colors.paleGrey,
      }}
      style={({ pressed }) => [styles.paragraphContainer, pressed && styles.pressedTab]}>
      <Text style={[screenStyles.text, styles.paragraph]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    color: colors.primaryGreen,
    fontSize: 18,
    textAlign: 'left',
  },
  paragraphContainer: {
    alignItems: 'flex-start',
    borderColor: colors.paleGrey,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    margin: 10,
    padding: 10,
    shadowColor: Platform.select({
      ios: colors.paleGrey,
      default: undefined,
    }),
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 0.8,
  },
  pressedTab: {
    opacity: Platform.select({
      android: 1,
      default: 0.4,
    }),
  },
});
