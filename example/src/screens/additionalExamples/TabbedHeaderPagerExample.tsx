import type { FC } from 'react';
import React from 'react';
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';

import { Brandon, Ewa, Jennifer } from '../../assets/data/cards';
import { TABBED_SECTIONS } from '../../assets/data/tabbedSections';
import { logo, photosPortraitMe } from '../../assets/images';
import { QuizCard } from '../../components';
import { colors, screenStyles } from '../../constants';

import { tabbedHeaderTestIDs } from './testIDs';

export const TabbedHeaderPagerExample: FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <TabbedHeaderPager
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
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
