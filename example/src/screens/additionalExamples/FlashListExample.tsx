import type { FlashListProps, ViewToken } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import type { FC } from 'react';
import { forwardRef } from 'react';
import { useCallback, useState } from 'react';
import React from 'react';
import type { LayoutChangeEvent, NativeScrollEvent } from 'react-native';
import { Platform, RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStickyHeaderProps } from 'react-native-sticky-parallax-header';

import { Foreground } from '../../../../src/predefinedComponents/TabbedHeader/components/HeaderForeground';
import { Tabs } from '../../../../src/predefinedComponents/TabbedHeader/components/Tabs';
import { HeaderWrapper } from '../../../../src/predefinedComponents/common/components/HeaderWrapper';
import { debounce } from '../../../../src/predefinedComponents/common/utils/debounce';
import type { ItemType, SectionType } from '../../assets/data/tabbedSections';
import { FLASHLIST_TABBED_SECTIONS } from '../../assets/data/tabbedSections';
import { TabbedSectionHeader } from '../../components/predefinedComponents/TabbedSectionHeader';
import { TabbedSectionItem } from '../../components/predefinedComponents/TabbedSectionItem';
import { colors, screenStyles } from '../../constants';

import { tabbedHeaderTestIDs } from './testIDs';

function isNotEmpty<T>(item: T | null): item is T {
  return item !== null;
}

function isSection(item: SectionType | ItemType): item is SectionType {
  return typeof (item as SectionType).tabTestID === 'string';
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

const wait = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const data = FLASHLIST_TABBED_SECTIONS;

const stickyHeaderIndices = data
  .map((item, index) => {
    return isSection(item) ? index : null;
  })
  .filter(isNotEmpty);

const tabs = data
  .map((item) => {
    return isSection(item) ? item : null;
  })
  .filter(isNotEmpty);

const DEFAULT_HEADER_HEIGHT = 100;
const PARALLAX_HEIGHT = 100;
const VELOCITY_THRESHOLD = 7;

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<SectionType | ItemType>>(FlashList);

export const FlashListExample: FC = () => {
  const scrollValue = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<FlashList<SectionType | ItemType>>();
  const [activeSection, setActiveSection] = useState(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const ignoreViewabilityItemsChangedEvent = useSharedValue(false);
  const [tabsHeight, setTabsHeight] = useState(0);

  const onTabPressed = useCallback(
    (sectionIndex: number) => {
      scrollViewRef.current?.scrollToIndex({
        animated: true,
        index: stickyHeaderIndices[sectionIndex],
        viewPosition: 0,
        viewOffset: tabsHeight,
      });
      setActiveSection(sectionIndex);
    },
    [scrollViewRef, tabsHeight]
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (
        !viewableItems.length ||
        ignoreViewabilityItemsChangedEvent.value ||
        !isNotEmpty(viewableItems[0].index)
      ) {
        return;
      }

      let newActiveSection: number | undefined;

      for (let i = 0; i < stickyHeaderIndices.length; i++) {
        const firstIdx = stickyHeaderIndices[i];

        if (i === stickyHeaderIndices.length - 1) {
          if (viewableItems[0].index >= firstIdx) {
            newActiveSection = i;
            i = stickyHeaderIndices.length;
          }
        } else {
          const secondIdx = stickyHeaderIndices[i + 1];

          if (viewableItems[0].index >= firstIdx && viewableItems[0].index < secondIdx) {
            newActiveSection = i;
            i = stickyHeaderIndices.length;
          }
        }
      }

      if (typeof newActiveSection === 'number') {
        setActiveSection(newActiveSection);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const scrollHeight = Math.max(PARALLAX_HEIGHT, DEFAULT_HEADER_HEIGHT * 2);

  function snapToTop() {
    scrollViewRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }

  function snapToBottom() {
    scrollViewRef.current?.scrollToOffset({ animated: true, offset: scrollHeight });
  }

  const onSnapToEdge = useWorkletCallback(
    (e: NativeScrollEvent) => {
      const scrollToHeight = scrollHeight;
      const snapToEdgeThreshold = scrollHeight / 2;

      const currentVal = scrollValue.value;
      const velocity = e.velocity?.y ?? 0;

      const dragsToTop = velocity >= 0;
      const dragsToBottom = !dragsToTop;
      const dragsQuickToBottom = dragsToBottom && velocity <= -VELOCITY_THRESHOLD;
      const dragsQuickToTop = dragsToTop && velocity >= VELOCITY_THRESHOLD;

      const isUnderSnapToEdgeThresholdAndDragIsSlow =
        currentVal > 0 && currentVal < snapToEdgeThreshold && !dragsQuickToBottom;
      const isUnderSnapToEdgeThresholdAndDragIsQuick =
        currentVal >= snapToEdgeThreshold / 2 &&
        currentVal < snapToEdgeThreshold &&
        dragsQuickToBottom;
      const isOverSnapToEdgeThresholdAndDragIsSlow =
        currentVal >= snapToEdgeThreshold && currentVal < scrollToHeight && !dragsQuickToTop;
      const isOverSnapToEdgeThresholdAndDragIsQuick =
        currentVal >= snapToEdgeThreshold && currentVal < scrollToHeight / 2 && dragsQuickToTop;

      if (true) {
        // TODO: when react-native-web will support onMomentumScrollEnd & onScrollEndDrag events
        // handle web snap scroll
        if (isUnderSnapToEdgeThresholdAndDragIsSlow || isOverSnapToEdgeThresholdAndDragIsQuick) {
          runOnJS(snapToTop)();
        } else if (
          isOverSnapToEdgeThresholdAndDragIsSlow ||
          isUnderSnapToEdgeThresholdAndDragIsQuick
        ) {
          runOnJS(snapToBottom)();
        }
      }
    },
    [scrollHeight, scrollValue]
  );

  const onMomentumScrollEndInternal = useWorkletCallback((e: NativeScrollEvent) => {
    ignoreViewabilityItemsChangedEvent.value = false;
    onSnapToEdge(e);
  }, []);
  const debouncedIgnoreViewabilityItemsChangedCallback = debounce(() => {
    ignoreViewabilityItemsChangedEvent.value = false;
  }, 100);
  const onScrollInternal = useWorkletCallback((e: NativeScrollEvent) => {
    if (Platform.OS === 'web') {
      // On web there is no onMomentumScrollEnd
      runOnJS(debouncedIgnoreViewabilityItemsChangedCallback)();
    }

    scrollValue.value = e.contentOffset.y;
  }, []);
  const onScrollEndDragInternal = useWorkletCallback((e: NativeScrollEvent) => {
    if (Platform.OS === 'android' || Math.abs(e.velocity?.y ?? 0) > 0) {
      return;
    }

    onSnapToEdge(e);
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <HeaderWrapper
        backgroundColor={colors.coralPink}
        hasBorderRadius={false}
        parallaxHeight={PARALLAX_HEIGHT}
        scrollHeight={scrollHeight}
        scrollValue={scrollValue}
        tabsContainerBackgroundColor={colors.coralPink}>
        <Foreground
          height={PARALLAX_HEIGHT}
          scrollValue={scrollValue}
          foregroundImage={{
            uri: 'https://foodish-api.herokuapp.com/images/samosa/samosa9.jpg',
          }}
          title={'Food delivery app'}
          titleStyle={screenStyles.text}
          titleTestID={tabbedHeaderTestIDs.title}
        />
      </HeaderWrapper>
    );
  }, [scrollHeight, scrollValue]);

  const renderTabs = useCallback(() => {
    return (
      <Tabs
        tabs={tabs}
        activeTab={activeSection}
        onTabPressed={onTabPressed}
        scrollValue={scrollValue}
        tabTextStyle={screenStyles.text}
        tabTextContainerActiveStyle={{ backgroundColor: colors.activeOrange }}
        tabsContainerBackgroundColor={colors.coralPink}
      />
    );
  }, [activeSection, onTabPressed, scrollValue]);

  return (
    <View style={[screenStyles.stretchContainer, { backgroundColor: colors.coralPink }]}>
      <SafeAreaView edges={['left', 'top', 'right']} style={screenStyles.stretch} />
      <StickyFlashList
        ref={scrollViewRef}
        data={data}
        renderItem={({ item }) => {
          if (isSection(item)) {
            return <TabbedSectionHeader title={item.title} tabTestID={item.tabTestID} />;
          }

          return <TabbedSectionItem {...item} />;
        }}
        getItemType={(item) => {
          return isSection(item) ? 'sectionHeader' : 'row';
        }}
        estimatedItemSize={46}
        stickyHeaderIndices={stickyHeaderIndices}
        renderHeader={renderHeader}
        renderTabs={renderTabs}
        onScroll={onScrollInternal}
        onScrollEndDrag={onScrollEndDragInternal}
        onMomentumScrollEnd={onMomentumScrollEndInternal}
        {...(Platform.OS !== 'web' && {
          refreshControl: (
            <RefreshControl
              //  z Index is required on IOS, to refresh indicator be visible
              style={styles.refreshControl}
              refreshing={refreshing}
              titleColor={colors.white}
              tintColor={colors.white}
              title="Refreshing"
              onRefresh={onRefresh}
            />
          ),
        })}
        onTabsLayout={(e) => setTabsHeight(e.nativeEvent.layout.height)}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    </View>
  );
};

const StickyFlashList = forwardRef<
  FlashList<SectionType | ItemType>,
  Omit<
    FlashListProps<SectionType | ItemType>,
    'onScroll' | 'onScrollEndDrag' | 'onMomentumScrollEnd'
  > & {
    onMomentumScrollEnd: (e: NativeScrollEvent) => void;
    onScroll: (e: NativeScrollEvent) => void;
    onScrollEndDrag: (e: NativeScrollEvent) => void;
    onTabsLayout: (e: LayoutChangeEvent) => void;
    renderHeader: () => React.ReactNode;
    renderTabs: () => React.ReactNode;
  }
>(
  (
    {
      onScroll,
      onScrollEndDrag,
      onMomentumScrollEnd,
      onTabsLayout,
      renderHeader,
      renderTabs,
      ...rest
    },
    ref
  ) => {
    const {
      contentContainerPaddingTop,
      headerAnimatedStyle,
      headerHeight,
      listPaddingTop,
      onHeaderLayoutInternal,
      onTabsLayoutInternal,
      scrollHandler,
      tabsHeight,
    } = useStickyHeaderProps({
      sections: [],
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      onTabsLayout,
    });

    return (
      <View style={screenStyles.stretchContainer}>
        <Animated.View pointerEvents="box-none" style={[styles.header, headerAnimatedStyle]}>
          <View pointerEvents="box-none" onLayout={onHeaderLayoutInternal}>
            {renderHeader()}
          </View>
          <View pointerEvents="box-none" onLayout={onTabsLayoutInternal}>
            {renderTabs()}
          </View>
        </Animated.View>
        <View style={screenStyles.stretchContainer}>
          <AnimatedFlashList
            ref={ref}
            {...rest}
            contentContainerStyle={{
              paddingBottom: tabsHeight,
              paddingTop: headerHeight + contentContainerPaddingTop + tabsHeight + listPaddingTop,
            }}
            onScroll={scrollHandler}
            onScrollBeginDrag={NOOP}
            onScrollEndDrag={NOOP}
            onMomentumScrollBegin={NOOP}
            onMomentumScrollEnd={NOOP}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
  },
  refreshControl: {
    zIndex: 1,
  },
});
