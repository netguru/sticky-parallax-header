import type { VFC } from 'react';
import React from 'react';
import type { ScrollView } from 'react-native';
import { StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from 'react-native-sticky-parallax-header';

import { colors, screenStyles } from '../../constants';

import { Foreground } from './Foreground';
import { HeaderBar } from './HeaderBar';
import { text } from './data';

const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 92;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const SimsScreen: VFC = () => {
  const { width: windowWidth } = useWindowDimensions();
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });

  return (
    <View style={screenStyles.screenContainer}>
      <View style={[styles.headerBarContainer, { width: windowWidth }]}>
        <HeaderBar scrollValue={scrollValue} />
      </View>
      <View style={screenStyles.stretchContainer}>
        <StickyHeaderScrollView
          ref={scrollViewRef}
          containerStyle={screenStyles.stretchContainer}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          renderHeader={() => {
            return (
              <View style={{ height: scrollHeight }}>
                <Foreground scrollValue={scrollValue} />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          style={screenStyles.stretch}>
          <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.content}>
            <Text style={screenStyles.text}>{text}</Text>
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} translucent />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    paddingTop: HEADER_BAR_HEIGHT,
  },
  headerBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: colors.transparent,
    height: HEADER_BAR_HEIGHT,
    flex: 1,
    overflow: 'hidden',
    zIndex: 3,
  },
});

export default SimsScreen;
