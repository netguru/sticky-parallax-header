import * as React from 'react';

import type { Tab } from '../../common/SharedProps';
import type { TabsProps } from '../components/Tabs';
import { Tabs } from '../components/Tabs';

export function useRenderTabs(tabsProps: Omit<TabsProps, 'tabs'> & { tabs?: Tab[] }) {
  const {
    activeTab,
    onTabPressed,
    scrollValue,
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
        onTabPressed={onTabPressed}
        scrollValue={scrollValue}
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
    onTabPressed,
    scrollValue,
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
