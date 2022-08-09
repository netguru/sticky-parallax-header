import * as React from 'react';
import type { NativeScrollEvent } from 'react-native';
import { StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';

import { colors, screenStyles } from '../../constants';

import { HeaderBar } from './HeaderBar';
import { TABS } from './data';
import { yodaScreenTestIDs } from './testIDs';

const YodaScreen: React.FC = () => {
  const { height: windowHeight } = useWindowDimensions();
  const scrollValue = useSharedValue(0);

  function onScroll(e: NativeScrollEvent) {
    'worklet';
    scrollValue.value = e.contentOffset.y;
  }

  return (
    <>
      <TabbedHeaderPager
        containerStyle={screenStyles.stretchContainer}
        backgroundImage={{
          uri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
        }}
        title="Baby Yoda"
        titleStyle={styles.titleStyle}
        titleTestID={yodaScreenTestIDs.headerTitle}
        foregroundImage={{
          uri: 'https://cdn.iconscout.com/icon/free/png-256/starwars-6-569425.png',
        }}
        tabsContainerBackgroundColor={colors.black}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabTextStyle={styles.tabText}
        tabTextActiveStyle={styles.tabTextActiveStyle}
        tabWrapperStyle={styles.tabWrapperStyle}
        tabsContainerStyle={styles.tabsContainerStyle}
        onScroll={onScroll}
        tabs={TABS}
        renderHeaderBar={() => <HeaderBar scrollValue={scrollValue} />}
        showsVerticalScrollIndicator={false}>
        {TABS.map((tab, i) => (
          <View key={i} style={[styles.contentContainer, { height: windowHeight }]}>
            <Text style={[screenStyles.text, styles.contentText]} testID={tab.contentTestID}>
              {tab.description}
            </Text>
          </View>
        ))}
      </TabbedHeaderPager>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    backgroundColor: colors.semitransparentBlack,
    color: colors.white,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 40,
    padding: 10,
  },
  tabTextContainerStyle: {
    backgroundColor: colors.transparent,
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: colors.activeOrange,
  },
  tabText: {
    color: colors.white,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabTextActiveStyle: {
    color: colors.black,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabWrapperStyle: {
    paddingVertical: 10,
  },
  tabsContainerStyle: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    backgroundColor: colors.white,
    padding: 10,
  },
  contentText: {
    fontSize: 16,
  },
});

export default YodaScreen;
