import React, { forwardRef, useImperativeHandle } from 'react';
import type { ScrollView } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../constants';
import { StickyHeaderScrollView } from '../../primitiveComponents/StickyHeaderScrollView';

import type { TabbedHeaderPagerProps } from './TabbedHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { Pager } from './components/Pager';
import { useTabbedHeaderPager } from './useTabbedHeader';

export const TabbedHeaderPager = forwardRef<ScrollView, TabbedHeaderPagerProps>((props, ref) => {
  const {
    backgroundColor,
    children,
    contentContainerStyle,
    decelerationRate = 'fast',
    initialPage,
    logo,
    logoContainerStyle,
    logoResizeMode,
    logoStyle,
    nestedScrollEnabled = true,
    offscreenPageLimit,
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

  useImperativeHandle(ref, () => scrollViewRef.current as ScrollView);

  return (
    <View style={[commonStyles.container, { backgroundColor }]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : logo ? (
        <HeaderBar
          backgroundColor={backgroundColor}
          logo={logo}
          logoContainerStyle={logoContainerStyle}
          logoResizeMode={logoResizeMode}
          logoStyle={logoStyle}
        />
      ) : (
        <SafeAreaView edges={['left', 'top', 'right']} style={commonStyles.stretch} />
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
            initialPage={initialPage}
            minScrollHeight={innerScrollHeight}
            offscreenPageLimit={offscreenPageLimit}
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
    </View>
  );
});
