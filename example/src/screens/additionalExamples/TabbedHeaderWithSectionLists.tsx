import type { FC } from 'react';
import React from 'react';
import type { SectionListData } from 'react-native';
import { SectionList, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';

import type { Question } from '../../assets/data/cards';
import { Brandon, Ewa, Jennifer } from '../../assets/data/cards';
import { logo, photosPortraitMe } from '../../assets/images';
import { QuizCard } from '../../components';
import { TabbedSectionHeader } from '../../components/predefinedComponents/TabbedSectionHeader';
import { colors, screenStyles } from '../../constants';

import { tabbedHeaderTestIDs } from './testIDs';

const QUIZ_SECTIONS: SectionListData<Question>[] = [
  {
    data: Brandon.cards,
    key: Brandon.author,
  },
  {
    data: Ewa.cards,
    key: Ewa.author,
  },
  {
    data: Jennifer.cards,
    key: Jennifer.author,
  },
];

const QUIZ_TAB_SECTIONS = [
  {
    title: Brandon.author,
    testID: Brandon.author + 'QuizTestID',
  },
  {
    title: Ewa.author,
    testID: Ewa.author + 'QuizTestID',
  },
  {
    title: Jennifer.author,
    testID: Jennifer.author + 'QuizTestID',
  },
];

const List: FC<{ startIndex: number }> = ({ startIndex }) => {
  return (
    <SectionList
      sections={QUIZ_SECTIONS.slice(startIndex).concat(QUIZ_SECTIONS.slice(0, startIndex))}
      stickySectionHeadersEnabled
      renderItem={({ item, index, section }) => {
        return <QuizCard data={item} num={index} cardsAmount={section.data.length} />;
      }}
      renderSectionHeader={({ section }) => {
        return <TabbedSectionHeader tabTestID={section.key ?? ''} title={section.key ?? ''} />;
      }}
    />
  );
};

export const TabbedHeaderWithSectionListsExample: FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <TabbedHeaderPager
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        backgroundColor={colors.primaryGreen}
        containerStyle={screenStyles.stretchContainer}
        foregroundImage={photosPortraitMe}
        disableScrollToPosition={true}
        rememberTabScrollPosition={false}
        logo={logo}
        title={"Mornin' Mark! \nReady for a quiz?"}
        titleStyle={screenStyles.text}
        titleTestID={tabbedHeaderTestIDs.title}
        stickyTabs={false}
        tabs={QUIZ_TAB_SECTIONS.map((section) => ({
          title: section.title,
          testID: section.testID,
        }))}
        tabTextStyle={screenStyles.text}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <List startIndex={0} />
        </View>
        <View style={styles.content}>
          <List startIndex={1} />
        </View>
        <View style={styles.content}>
          <List startIndex={2} />
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
