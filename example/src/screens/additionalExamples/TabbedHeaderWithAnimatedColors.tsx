import * as React from 'react';
import type { NativeScrollEvent } from 'react-native';
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import {
  ColorSpace,
  interpolateSharableColor,
  useDerivedValue,
  useInterpolateConfig,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';

import { Brandon, Ewa, Jennifer } from '../../assets/data/cards';
import { TABBED_SECTIONS } from '../../assets/data/tabbedSections';
import { logo, photosPortraitMe } from '../../assets/images';
import { QuizCard } from '../../components';
import { colors, screenStyles } from '../../constants';

import { tabbedHeaderTestIDs } from './testIDs';

export const TabbedHeaderWithAnimatedColorsExample: React.FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';
  const horizontalScrollValue = useSharedValue(0);
  const scrollValue = useSharedValue(0);
  const onHorizontalScroll = useWorkletCallback((e: NativeScrollEvent) => {
    horizontalScrollValue.value = e.contentOffset.x;
  });
  const onScroll = useWorkletCallback((e: NativeScrollEvent) => {
    scrollValue.value = e.contentOffset.y;
  });

  const tabUnderlineColorInterpolateConfig = useInterpolateConfig(
    [0, 1242, 2484],
    [colors.activeOrange, colors.coralPink, colors.detailsBlue],
    ColorSpace.RGB
  );
  const tabsContainerBackgroundColorInterpolateConfig = useInterpolateConfig(
    [0, 800, 1600],
    [colors.primaryGreen, colors.activeOrange, colors.coralPink],
    ColorSpace.RGB
  );
  const tabUnderlineColor = useDerivedValue(() =>
    interpolateSharableColor(horizontalScrollValue.value, tabUnderlineColorInterpolateConfig)
  );
  const tabsContainerBackgroundColor = useDerivedValue(() =>
    interpolateSharableColor(scrollValue.value, tabsContainerBackgroundColorInterpolateConfig)
  );

  return (
    <>
      <TabbedHeaderPager
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        pagerProps={{ onScroll: onHorizontalScroll }}
        onScroll={onScroll}
        tabsContainerBackgroundColor={tabsContainerBackgroundColor}
        tabUnderlineColor={tabUnderlineColor}
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={colors.primaryGreen}
        foregroundImage={photosPortraitMe}
        rememberTabScrollPosition
        logo={logo}
        title={"Mornin' Mark! \nReady for a quiz?"}
        titleStyle={screenStyles.text}
        titleTestID={tabbedHeaderTestIDs.title}
        tabs={TABBED_SECTIONS.map((section) => ({
          title: section.title,
          testID: section.tabTestID,
        }))}
        tabTextStyle={screenStyles.text}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Ewa.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Jennifer.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Ewa.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Jennifer.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
      </TabbedHeaderPager>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryGreen} translucent />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    paddingHorizontal: 24,
  },
});
