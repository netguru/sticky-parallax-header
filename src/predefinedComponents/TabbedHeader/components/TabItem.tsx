import * as React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { I18nManager, Platform, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors } from '../../../constants';
import type { Tab, TabsConfig } from '../../common/SharedProps';

interface TabItemProps
  extends Pick<
    TabsConfig,
    | 'tabTextActiveStyle'
    | 'tabTextContainerActiveStyle'
    | 'tabTextContainerStyle'
    | 'tabTextStyle'
    | 'tabWrapperStyle'
  > {
  tab: Tab;
  page: number;
  activeTab: number;
  onTabLayout?: (event: LayoutChangeEvent) => void;
  onTabPress?: () => void;
  renderIcon: (icon: Tab['icon'], page: number) => React.ReactElement | null | undefined;
}

export const TabItem: React.FC<TabItemProps> = ({
  tab,
  page,
  onTabLayout,
  onTabPress,
  tabWrapperStyle,
  tabTextActiveStyle,
  tabTextContainerActiveStyle,
  tabTextContainerStyle,
  tabTextStyle,
  activeTab,
  renderIcon,
}) => {
  const isInvertedAndroid = Platform.OS === 'android' ? I18nManager.isRTL : undefined;
  const isTabActive = activeTab === page;
  const tabKey = tab.title || `tab ${page}`;
  const tabTestID = tab.testID || `${tabKey}TestID`;

  return (
    <Pressable
      accessibilityLabel={tabKey}
      accessibilityRole="button"
      key={tabKey}
      onLayout={onTabLayout}
      onPress={onTabPress}
      style={({ pressed }) => [
        isInvertedAndroid && styles.inversionStyle,
        styles.tabsWrapper,
        tabWrapperStyle,
        styles.noMargins,
        pressed && styles.pressed,
      ]}
      testID={tabTestID}>
      <Animated.View
        style={[
          styles.tabContainer,
          styles.tabTextContainerStyle,
          tabTextContainerStyle,
          isTabActive && styles.tabTextContainerActiveStyle,
          isTabActive && tabTextContainerActiveStyle,
        ]}>
        {renderIcon(tab.icon, page)}
        {tab.title ? (
          <Animated.Text style={[styles.tabText, tabTextStyle, isTabActive && tabTextActiveStyle]}>
            {tab.title}
          </Animated.Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inversionStyle: {
    transform: [{ scaleX: -1 }],
  },
  noMargins: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  pressed: {
    opacity: 0.9,
  },
  tabContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.white,
    textAlign: 'left',
  },
  tabsWrapper: {
    flex: 1,
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: colors.transparent,
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: colors.transparent,
  },
});
