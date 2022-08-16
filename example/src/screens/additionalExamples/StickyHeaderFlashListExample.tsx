import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StickyHeaderFlashListProps } from 'react-native-sticky-parallax-header';
import {
  useStickyHeaderFlashListScrollProps,
  withStickyHeaderFlashList,
} from 'react-native-sticky-parallax-header';

import { DATA } from '../../assets/data/paragraphs';
import { Header } from '../../components/primitiveComponents/Header';
import { Paragraph } from '../../components/primitiveComponents/Paragraph';
import { Tabs } from '../../components/primitiveComponents/Tabs';
import { screenStyles } from '../../constants';

const data = DATA.concat(DATA)
  .concat(DATA)
  .concat(DATA)
  .concat(DATA)
  .concat(DATA)
  .concat(DATA)
  .concat(DATA)
  .concat(DATA)
  .concat(DATA);

const PARALLAX_HEIGHT = 330;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const StickyHeaderFlashList = withStickyHeaderFlashList(FlashList) as (
  props: StickyHeaderFlashListProps<string> & React.RefAttributes<FlashList<string>>
) => React.ReactElement;

export const StickyHeaderFlashListExample: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const { onMomentumScrollEnd, onScroll, onScrollEndDrag, scrollHeight, scrollViewRef } =
    useStickyHeaderFlashListScrollProps({
      parallaxHeight: PARALLAX_HEIGHT,
      snapStartThreshold: SNAP_START_THRESHOLD,
      snapStopThreshold: SNAP_STOP_THRESHOLD,
      snapToEdge: true,
    });

  async function onRefresh() {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 2000));
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={screenStyles.screenContainer}>
      <StickyHeaderFlashList
        ref={scrollViewRef}
        containerStyle={screenStyles.stretchContainer}
        data={data}
        decelerationRate="fast"
        keyExtractor={(_, index) => `${index}`}
        /**
         * Refresh control is not implemented on web, which causes styles as margin or padding
         * to be duplicated - ignore it on web, it will be no-op anyway
         *
         * TODO: describe it as a web limitation
         */
        {...Platform.select({ native: { onRefresh } })}
        refreshing={refreshing}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        renderHeader={() => {
          return (
            <View pointerEvents="box-none" style={[styles.center, { height: scrollHeight }]}>
              <Header />
            </View>
          );
        }}
        renderItem={({ item }) => {
          return <Paragraph text={item} />;
        }}
        renderTabs={() => <Tabs />}
        scrollEventThrottle={16}
        estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
