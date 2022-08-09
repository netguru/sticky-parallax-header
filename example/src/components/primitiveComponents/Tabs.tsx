import * as React from 'react';
import { PixelRatio, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, screenStyles } from '../../constants';

export const Tabs: React.FC = () => {
  return (
    <View style={styles.tabsContainer}>
      <Tab title="Tab 1" />
      <Tab title="Tab 2" />
      <Tab title="Tab 3" />
      <Tab title="Tab 4" />
      <Tab title="Tab 5" />
    </View>
  );
};

const Tab: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Pressable
      android_ripple={{
        borderless: false,
        color: colors.paleGrey,
      }}
      style={({ pressed }) => [styles.tab, pressed && styles.pressedTab]}>
      <Text style={[screenStyles.text, styles.tabTitle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressedTab: {
    opacity: Platform.select({
      android: 1,
      default: 0.4,
    }),
  },
  tab: {
    alignItems: 'flex-start',
    margin: 10 / PixelRatio.get(),
    padding: 10 / PixelRatio.get(),
  },
  tabTitle: {
    fontSize: 16 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    padding: 10 / PixelRatio.get(),
    textAlign: 'left',
  },
  tabsContainer: {
    alignItems: 'center',
    backgroundColor: colors.purpleishBlue,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    shadowColor: Platform.select({
      ios: 'gray',
      default: undefined,
    }),
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 0.8,
  },
});
