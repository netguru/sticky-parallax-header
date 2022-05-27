import React, { forwardRef, useImperativeHandle } from 'react';
import type { ScrollView } from 'react-native';
import { View } from 'react-native';

import { commonStyles } from '../../constants';
import { StickyHeaderScrollView } from '../../primitiveComponents/StickyHeaderScrollView';

import type { AvatarHeaderScrollViewProps } from './AvatarHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useAvatarHeader } from './useAvatarHeader';

export const AvatarHeaderScrollView = forwardRef<ScrollView, AvatarHeaderScrollViewProps>(
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
      titleStyle,
      ...rest
    } = props;
    const {
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      parallaxHeight,
      renderHeader,
      scrollValue,
      scrollViewRef,
    } = useAvatarHeader<ScrollView>(props);

    useImperativeHandle(ref, () => scrollViewRef.current as ScrollView);

    return (
      <View style={[commonStyles.wrapper, { backgroundColor }]}>
        {renderHeaderBar ? (
          renderHeaderBar()
        ) : (
          <HeaderBar
            backgroundColor={backgroundColor}
            height={parallaxHeight}
            leftTopIcon={leftTopIcon}
            leftTopIconAccessibilityLabel={leftTopIconAccessibilityLabel}
            leftTopIconOnPress={leftTopIconOnPress}
            leftTopIconTestID={leftTopIconTestID}
            rightTopIcon={rightTopIcon}
            rightTopIconAccessibilityLabel={rightTopIconAccessibilityLabel}
            rightTopIconOnPress={rightTopIconOnPress}
            rightTopIconTestID={rightTopIconTestID}
            scrollValue={scrollValue}
            title={title}
            titleStyle={titleStyle}
          />
        )}
        <View style={commonStyles.wrapper}>
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
            scrollEventThrottle={scrollEventThrottle}>
            {children}
          </StickyHeaderScrollView>
        </View>
      </View>
    );
  }
);
