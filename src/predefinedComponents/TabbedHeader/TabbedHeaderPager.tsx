import * as React from 'react';
import type { NativeScrollEvent, ScrollView } from 'react-native';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useWorkletCallback } from 'react-native-reanimated';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../constants';
import { StickyHeaderScrollView } from '../../primitiveComponents/StickyHeaderScrollView';
import { parseAnimatedColorProp } from '../common/utils/parseAnimatedColorProp';

import type { TabbedHeaderPagerProps } from './TabbedHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { Pager } from './components/Pager';
import { useTabbedHeaderPager } from './hooks/useTabbedHeader';

export const TabbedHeaderPager = React.forwardRef<ScrollView, TabbedHeaderPagerProps>(
  (props, ref) => {
    const {
      backgroundColor,
      children,
      contentContainerStyle,
      disableScrollToPosition,
      decelerationRate = 'fast',
      enableSafeAreaTopInset = true,
      initialPage,
      logo,
      logoContainerStyle,
      logoResizeMode,
      logoStyle,
      nestedScrollEnabled = true,
      onChangeTab,
      overScrollMode = 'never',
      pagerProps,
      rememberTabScrollPosition,
      renderHeader,
      renderHeaderBar,
      scrollEventThrottle = 16,
      ...rest
    } = props;
    const {
      currentPage,
      innerScrollHeight,
      onHorizontalPagerScroll,
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      renderHeader: defaultRenderHeader,
      renderTabs,
      scrollHeight,
      scrollValue,
      scrollViewRef,
      setCurrentPage,
    } = useTabbedHeaderPager(props);

    React.useImperativeHandle(ref, () => scrollViewRef.current as ScrollView);

    const wrapperAnimatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: parseAnimatedColorProp(backgroundColor),
      };
    });

    const handleChangeTab = React.useCallback(
      (prevPage: number, newPage: number) => {
        setCurrentPage(newPage);
        onChangeTab?.(prevPage, newPage);
      },
      [onChangeTab, setCurrentPage]
    );

    const handleScroll = useWorkletCallback(
      (e: NativeScrollEvent) => {
        onHorizontalPagerScroll(e);
        pagerProps?.onScroll?.(e);
      },
      [onHorizontalPagerScroll, pagerProps?.onScroll]
    );

    return (
      <Animated.View style={[commonStyles.container, wrapperAnimatedStyle]}>
        {renderHeaderBar ? (
          renderHeaderBar()
        ) : logo ? (
          <HeaderBar
            backgroundColor={backgroundColor}
            enableSafeAreaTopInset={enableSafeAreaTopInset}
            logo={logo}
            logoContainerStyle={logoContainerStyle}
            logoResizeMode={logoResizeMode}
            logoStyle={logoStyle}
          />
        ) : (
          <SafeAreaView
            edges={['left', 'right', ...(enableSafeAreaTopInset ? ['top' as Edge] : [])]}
            style={commonStyles.stretch}
          />
        )}
        <View style={commonStyles.container}>
          <StickyHeaderScrollView
            ref={scrollViewRef}
            {...rest}
            contentContainerStyle={contentContainerStyle}
            decelerationRate={decelerationRate}
            nestedScrollEnabled={nestedScrollEnabled}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            onScroll={onScroll}
            overScrollMode={overScrollMode}
            renderHeader={renderHeader ?? defaultRenderHeader}
            renderTabs={renderTabs}
            scrollEventThrottle={scrollEventThrottle}>
            <Pager
              {...pagerProps}
              disableScrollToPosition={disableScrollToPosition}
              initialPage={initialPage}
              minScrollHeight={innerScrollHeight}
              onChangeTab={handleChangeTab}
              onScroll={handleScroll}
              page={currentPage}
              rememberTabScrollPosition={rememberTabScrollPosition}
              scrollHeight={scrollHeight}
              scrollRef={scrollViewRef}
              scrollValue={scrollValue}>
              {children}
            </Pager>
          </StickyHeaderScrollView>
        </View>
      </Animated.View>
    );
  }
);
