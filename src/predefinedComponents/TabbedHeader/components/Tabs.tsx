import * as React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { I18nManager, Platform, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import { commonStyles } from '../../../constants';
import type { Tab, TabsConfig } from '../../common/SharedProps';
import { parseAnimatedColorProp } from '../../common/utils/parseAnimatedColorProp';

import { TabItem } from './TabItem';

export interface TabsProps extends TabsConfig {
  activeTab: number;
  horizontalScrollValue: Animated.SharedValue<number>;
  onTabPressed: (index: number) => void;
}

const UNDERLINE_PADDING = 20;

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  horizontalScrollValue,
  onTabPressed,
  tabsContainerBackgroundColor,
  tabsContainerStyle,
  tabTextContainerStyle,
  tabTextContainerActiveStyle,
  tabWrapperStyle,
  tabUnderlineColor,
  tabTextActiveStyle,
  tabTextStyle,
  tabsContainerHorizontalPadding,
}) => {
  const { width } = useWindowDimensions();
  const horizontalScrollRef = React.useRef<ScrollView>(null);

  const currentPositionX = React.useRef(0);
  const [tabsWidth, setTabsWidth] = React.useState(tabs.map((_) => 0));

  const isInvertedAndroid = Platform.OS === 'android' ? I18nManager.isRTL : undefined;
  const isInvertedIOS = Platform.OS === 'ios' ? I18nManager.isRTL : undefined;

  const adjustPrevious = React.useCallback(
    (page: number) => {
      const lastHidden = Math.floor(currentPositionX.current / (width * 0.3));

      if (page <= lastHidden) {
        currentPositionX.current = width * 0.3 * page;
        horizontalScrollRef.current?.scrollTo({ animated: true, x: currentPositionX.current });
      }
    },
    [width]
  );

  const adjustNext = React.useCallback(
    (page: number) => {
      const invisibleX = width + currentPositionX.current - width * 0.3 * (page + 1);

      if (invisibleX < 0) {
        currentPositionX.current = currentPositionX.current - invisibleX;
        horizontalScrollRef.current?.scrollTo?.({ animated: true, x: currentPositionX.current });
      }
    },
    [width]
  );

  const scrollToTab = React.useCallback(
    (page: number) => {
      if (tabs.length > 3) {
        if (page === 0) {
          horizontalScrollRef.current?.scrollTo({ animated: true, x: 0 });
          currentPositionX.current = 0;
        } else if (page !== tabs.length - 1) {
          adjustPrevious(page - 1);
          adjustNext(page + 1);
        } else {
          horizontalScrollRef.current?.scrollToEnd?.({ animated: true });
          currentPositionX.current = width * 0.3 * tabs.length - width;
        }
      }
    },
    [adjustNext, adjustPrevious, tabs.length, width]
  );

  const scrollToTabRef = React.useRef(scrollToTab);

  React.useEffect(() => {
    scrollToTabRef.current = scrollToTab;
  }, [scrollToTab]);

  React.useEffect(() => {
    scrollToTabRef.current(activeTab);
    // Scroll also on width change to handle scrolling
    // when device orientation changes from landscape to portrait,
    // so that active tab is visible;
  }, [activeTab, width]);

  React.useEffect(() => {
    horizontalScrollRef.current?.scrollTo({ x: 1 });
    horizontalScrollRef.current?.scrollTo({ x: 0 });
  }, []);

  const onTabLayout = React.useCallback(
    (page: number) => (e: LayoutChangeEvent) => {
      const tabWidth = e.nativeEvent.layout.width;

      setTabsWidth((prevTabsWidth) => {
        const newTabsWidth = prevTabsWidth.slice();

        newTabsWidth[page] = tabWidth;

        return newTabsWidth;
      });
    },
    []
  );

  const onTabPress = React.useCallback(
    (page: number) => {
      return function () {
        scrollToTab(page);
        onTabPressed(page);
      };
    },
    [onTabPressed, scrollToTab]
  );

  const renderIcon = React.useCallback(
    (icon: Tab['icon'], page: number) => {
      const isActive = activeTab === page;

      if (typeof icon === 'function') {
        return icon(isActive);
      }

      return icon;
    },
    [activeTab]
  );

  const HORIZONTAL_PADDINGS = tabsContainerHorizontalPadding ?? UNDERLINE_PADDING;
  const allSizes = tabsWidth.every((it) => !!it) && tabsWidth.length > 0 && !!tabUnderlineColor;

  const { inputRange, translateXOutputRange, widthOutputRange } = React.useMemo(() => {
    const inRange = allSizes ? [0] : [0, 1];
    const translateXOutRange = allSizes ? [HORIZONTAL_PADDINGS] : [HORIZONTAL_PADDINGS, 100];
    const widthOutRange = translateXOutRange.slice();

    if (tabUnderlineColor) {
      tabsWidth.reduce((accTabWidth, tabWidth, index) => {
        if (allSizes) {
          widthOutRange[index] = tabWidth;

          if (index > 0) {
            inRange[index] = width * index;
            translateXOutRange[index] = accTabWidth;
          }

          return accTabWidth + tabWidth;
        }

        return accTabWidth;
      }, HORIZONTAL_PADDINGS);
    }

    return {
      inputRange: inRange,
      translateXOutputRange: translateXOutRange,
      widthOutputRange: widthOutRange,
    };
  }, [tabsWidth, tabUnderlineColor, HORIZONTAL_PADDINGS, allSizes, width]);

  const tabUnderlineAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(horizontalScrollValue.value, inputRange, translateXOutputRange);

    return {
      backgroundColor: parseAnimatedColorProp(tabUnderlineColor),
      transform: [
        {
          translateX: isInvertedIOS ? translateX * -1 : translateX,
        },
      ],
      width: interpolate(horizontalScrollValue.value, inputRange, widthOutputRange),
    };
  }, [
    horizontalScrollValue,
    inputRange,
    isInvertedIOS,
    tabUnderlineColor,
    translateXOutputRange,
    widthOutputRange,
  ]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: parseAnimatedColorProp(tabsContainerBackgroundColor),
    };
  }, [tabsContainerBackgroundColor]);

  return (
    <LinearGradient
      colors={['#060A57', '#2566C7']}
      style={styles.gradientContainer}
      useAngle
      angle={74}
      locations={[0.2, 0.94]}
      angleCenter={{x: 0.5, y: 0.5}}>
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <ScrollView
          ref={horizontalScrollRef}
          bounces={false}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS === 'android'
              ? I18nManager.isRTL
                ? commonStyles.rowReverse
                : commonStyles.row
              : null,
            tabsContainerStyle,
            styles.noMargins,
            { paddingHorizontal: HORIZONTAL_PADDINGS },
          ]}
          horizontal
          onScrollEndDrag={(event) => (currentPositionX.current = event.nativeEvent.contentOffset.x)}
          showsHorizontalScrollIndicator={false}
          style={[styles.nestedStyle, isInvertedAndroid && styles.inversionStyle]}>
          {tabs.map((tab, page) => (
            <TabItem
              key={page}
              tab={tab}
              page={page}
              activeTab={activeTab}
              renderIcon={renderIcon}
              onTabLayout={onTabLayout(page)}
              onTabPress={onTabPress(page)}
              tabTextActiveStyle={tabTextActiveStyle}
              tabTextContainerActiveStyle={tabTextContainerActiveStyle}
              tabTextContainerStyle={tabTextContainerStyle}
              tabTextStyle={tabTextStyle}
              tabWrapperStyle={tabWrapperStyle}
            />
          ))}
          {tabUnderlineColor ? (
            <Animated.View style={[styles.tabUnderlineStyles, tabUnderlineAnimatedStyle]} />
          ) : null}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inversionStyle: {
    transform: [{ scaleX: -1 }],
  },
  nestedStyle: {
    alignSelf: 'stretch',
  },
  noMargins: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  tabUnderlineStyles: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: 7
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    height:'100%',
    flexDirection: 'row',
    paddingTop: '12.5%'
  }
});