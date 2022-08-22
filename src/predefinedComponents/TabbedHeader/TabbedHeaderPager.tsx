import * as React from 'react';
import type { ScrollView } from 'react-native';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
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
      renderHeaderBar,
      scrollEventThrottle = 16,
      ...rest
    } = props;
    const {
      currentPage,
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
    } = useTabbedHeaderPager(props);

    React.useImperativeHandle(ref, () => scrollViewRef.current as ScrollView);

    const wrapperAnimatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: parseAnimatedColorProp(backgroundColor),
      };
    });

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
            renderHeader={renderHeader}
            renderTabs={renderTabs}
            scrollEventThrottle={scrollEventThrottle}>
            <Pager
              {...pagerProps}
              disableScrollToPosition={disableScrollToPosition}
              initialPage={initialPage}
              minScrollHeight={innerScrollHeight}
              onChangeTab={(prevPage, newPage) => {
                setCurrentPage(newPage);
                onChangeTab?.(prevPage, newPage);
              }}
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
