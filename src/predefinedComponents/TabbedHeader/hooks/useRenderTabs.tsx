import * as React from 'react';
import type Animated from 'react-native-reanimated';

import type { Tab } from '../../common/SharedProps';
import type { TabsProps } from '../components/Tabs';
import { Tabs } from '../components/Tabs';

export function useRenderTabs(
  tabsProps: Omit<TabsProps, 'tabs'> & {
    tabs?: Tab[];
    horizontalScrollValue: Animated.SharedValue<number>;
  }
) {
  const {
    activeTab,
    horizontalScrollValue,
    onTabPressed,
    tabTextActiveStyle,
    tabTextContainerActiveStyle,
    tabTextContainerStyle,
    tabTextStyle,
    tabUnderlineColor,
    tabWrapperStyle,
    tabs,
    tabsContainerBackgroundColor,
    tabsContainerHorizontalPadding,
    tabsContainerStyle,
  } = tabsProps;

  return React.useCallback(() => {
    if (!tabs) {
      return null;
    }

    return (
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        horizontalScrollValue={horizontalScrollValue}
        onTabPressed={onTabPressed}
        tabTextActiveStyle={tabTextActiveStyle}
        tabTextContainerActiveStyle={tabTextContainerActiveStyle}
        tabTextContainerStyle={tabTextContainerStyle}
        tabTextStyle={tabTextStyle}
        tabUnderlineColor={tabUnderlineColor}
        tabWrapperStyle={tabWrapperStyle}
        tabsContainerBackgroundColor={tabsContainerBackgroundColor}
        tabsContainerHorizontalPadding={tabsContainerHorizontalPadding}
        tabsContainerStyle={tabsContainerStyle}
      />
    );
  }, [
    activeTab,
    horizontalScrollValue,
    onTabPressed,
    tabTextActiveStyle,
    tabTextContainerActiveStyle,
    tabTextContainerStyle,
    tabTextStyle,
    tabUnderlineColor,
    tabWrapperStyle,
    tabs,
    tabsContainerBackgroundColor,
    tabsContainerHorizontalPadding,
    tabsContainerStyle,
  ]);
}
