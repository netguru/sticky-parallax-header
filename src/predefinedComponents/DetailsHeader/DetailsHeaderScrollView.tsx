import React, { forwardRef, useImperativeHandle } from 'react';
import type { ScrollView } from 'react-native';
import { View } from 'react-native';

import commonStyles from '../../constants/screenStyles';
import { StickyHeaderScrollView } from '../../primitiveComponents/StickyHeaderScrollView';
import type { DetailsHeaderScrollViewProps } from './DetailsHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useDetailsHeader } from './useDetailsHeader';

export const DetailsHeaderScrollView = forwardRef<ScrollView, DetailsHeaderScrollViewProps>(
  (props, ref) => {
    const {
      backgroundColor,
      children,
      contentContainerStyle,
      decelerationRate = 'fast',
      leftTopIcon,
      leftTopIconAccessibilityLabel,
      leftTopIconOnPress,
      leftTopIconTestID,
      nestedScrollEnabled = true,
      overScrollMode = 'never',
      renderHeaderBar,
      rightTopIcon,
      rightTopIconAccessibilityLabel,
      rightTopIconOnPress,
      rightTopIconTestID,
      scrollEventThrottle = 16,
      title,
      ...rest
    } = props;
    const {
      headerTitleContainerAnimatedStyle,
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      renderHeader,
      scrollViewRef,
    } = useDetailsHeader<ScrollView>(props);

    useImperativeHandle(ref, () => scrollViewRef.current as ScrollView);

    return (
      <View style={[commonStyles.container, { backgroundColor }]}>
        {renderHeaderBar ? (
          renderHeaderBar()
        ) : (
          <HeaderBar
            backgroundColor={backgroundColor}
            headerTitleContainerAnimatedStyle={headerTitleContainerAnimatedStyle}
            leftTopIcon={leftTopIcon}
            leftTopIconAccessibilityLabel={leftTopIconAccessibilityLabel}
            leftTopIconOnPress={leftTopIconOnPress}
            leftTopIconTestID={leftTopIconTestID}
            rightTopIcon={rightTopIcon}
            rightTopIconAccessibilityLabel={rightTopIconAccessibilityLabel}
            rightTopIconOnPress={rightTopIconOnPress}
            rightTopIconTestID={rightTopIconTestID}
            title={title}
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
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            overScrollMode={overScrollMode}
            renderHeader={renderHeader}
            scrollEventThrottle={scrollEventThrottle}>
            {children}
          </StickyHeaderScrollView>
        </View>
      </View>
    );
  }
);
