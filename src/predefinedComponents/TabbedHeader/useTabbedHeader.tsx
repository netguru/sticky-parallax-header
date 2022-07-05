import React, { useCallback, useState } from 'react';
import type { NativeScrollEvent, ScrollView, SectionList, ViewToken } from 'react-native';
import { Platform } from 'react-native';
import { runOnJS, useSharedValue, useWorkletCallback } from 'react-native-reanimated';

import type { ScrollComponent, Tab } from '../common/SharedProps';
import { HeaderWrapper } from '../common/components/HeaderWrapper';
import { usePredefinedHeader } from '../common/hooks/usePredefinedHeader';
import { debounce } from '../common/utils/debounce';

import type { TabbedHeaderListProps, TabbedHeaderPagerProps } from './TabbedHeaderProps';
import { Foreground } from './components/HeaderForeground';
import type { TabsProps } from './components/Tabs';
import { Tabs } from './components/Tabs';

function useRenderTabs(tabsProps: Omit<TabsProps, 'tabs'> & { tabs?: Tab[] }) {
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

  return useCallback(() => {
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

function useTabbedHeader<T extends ScrollComponent>(props: TabbedHeaderPagerProps) {
  const {
    contentBackgroundColor,
    innerScrollHeight,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = usePredefinedHeader<T>(props);
  const {
    backgroundColor,
    backgroundImage,
    foregroundImage,
    hasBorderRadius,
    tabsContainerBackgroundColor,
    title,
    titleStyle,
    titleTestID,
  } = props;

  const renderHeader = useCallback(() => {
    return (
      <HeaderWrapper
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        contentBackgroundColor={contentBackgroundColor}
        hasBorderRadius={hasBorderRadius}
        parallaxHeight={parallaxHeight}
        scrollHeight={scrollHeight}
        scrollValue={scrollValue}
        tabsContainerBackgroundColor={tabsContainerBackgroundColor}>
        <Foreground
          height={parallaxHeight}
          scrollValue={scrollValue}
          foregroundImage={foregroundImage}
          title={title}
          titleStyle={titleStyle}
          titleTestID={titleTestID}
        />
      </HeaderWrapper>
    );
  }, [
    backgroundColor,
    backgroundImage,
    contentBackgroundColor,
    foregroundImage,
    hasBorderRadius,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    tabsContainerBackgroundColor,
    title,
    titleStyle,
    titleTestID,
  ]);

  return {
    innerScrollHeight,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  };
}

export function useTabbedHeaderPager(props: TabbedHeaderPagerProps) {
  const {
    innerScrollHeight,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useTabbedHeader<ScrollView>(props);
  const { backgroundColor, initialPage, tabsContainerBackgroundColor } = props;
  const [currentPage, setCurrentPage] = useState(initialPage ?? 0);

  const goToPage = useCallback((pageNumber: number) => {
    setCurrentPage((prev) => {
      if (prev !== pageNumber) {
        return pageNumber;
      }

      return prev;
    });
  }, []);

  const renderTabs = useRenderTabs({
    ...props,
    activeTab: currentPage,
    onTabPressed: goToPage,
    scrollValue,
    tabsContainerBackgroundColor: tabsContainerBackgroundColor ?? backgroundColor,
  });

  return {
    currentPage,
    goToPage,
    innerScrollHeight,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    renderTabs,
    scrollHeight,
    scrollValue,
    scrollViewRef,
    setCurrentPage,
  };
}

export function useTabbedHeaderList<
  ItemT,
  SectionT,
  T extends SectionList<ItemT, SectionT> = SectionList<ItemT, SectionT>
>(props: TabbedHeaderListProps<ItemT, SectionT>) {
  const ignoreViewabilityItemsChangedEvent = useSharedValue(false);
  const {
    innerScrollHeight,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollValue,
    scrollViewRef,
  } = useTabbedHeader<T>(props);
  const onMomentumScrollEndInternal = useWorkletCallback(
    (e: NativeScrollEvent) => {
      ignoreViewabilityItemsChangedEvent.value = false;
      onMomentumScrollEnd?.(e);
    },
    [onMomentumScrollEnd]
  );
  const debouncedIgnoreViewabilityItemsChangedCallback = debounce(() => {
    ignoreViewabilityItemsChangedEvent.value = false;
  }, 100);
  const onScrollInternal = useWorkletCallback(
    (e: NativeScrollEvent) => {
      if (Platform.OS === 'web') {
        // On web there is no onMomentumScrollEnd
        runOnJS(debouncedIgnoreViewabilityItemsChangedCallback)();
      }

      onScroll?.(e);
    },
    [onScroll]
  );

  const { backgroundColor, sections, tabsContainerBackgroundColor } = props;

  const [activeSection, setActiveSection] = useState(0);

  const goToSection = useCallback((sectionIndex: number) => {
    ignoreViewabilityItemsChangedEvent.value = true;
    scrollViewRef.current?.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex,
      viewPosition: 0,
    });
    setActiveSection(sectionIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (!viewableItems.length || ignoreViewabilityItemsChangedEvent.value) {
        return;
      }

      const newActiveSection = sections.findIndex(
        (section) => section.key === viewableItems[0].section?.key
      );

      if (newActiveSection !== -1) {
        setActiveSection(newActiveSection);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sections]
  );

  const renderTabs = useRenderTabs({
    ...props,
    activeTab: activeSection,
    onTabPressed: goToSection,
    scrollValue,
    tabsContainerBackgroundColor: tabsContainerBackgroundColor ?? backgroundColor,
  });

  return {
    goToSection,
    innerScrollHeight,
    onMomentumScrollEnd: onMomentumScrollEndInternal,
    onScroll: onScrollInternal,
    onScrollEndDrag,
    onViewableItemsChanged,
    renderHeader,
    renderTabs,
    scrollValue,
    scrollViewRef,
  };
}
