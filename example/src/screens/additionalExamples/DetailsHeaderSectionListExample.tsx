import { useNavigation } from '@react-navigation/native';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { SectionListData } from 'react-native';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { DetailsHeaderSectionList } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { CardsBlack, IconMenu, iconCloseWhite } from '../../assets/icons';
import { QuizCard } from '../../components';
import { SectionFooter } from '../../components/primitiveComponents/SectionFooter';
import { SectionHeader } from '../../components/primitiveComponents/SectionHeader';
import { screenStyles } from '../../constants';

import { detailsHeaderTestIDs } from './testIDs';

export const DetailsHeaderSectionListExample: FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  const sections = useMemo(() => {
    const section: SectionListData<typeof Brandon.cards[0]> = {
      data: Brandon.cards,
      keyExtractor: (item) => item.question,
      renderItem: ({ item, index }) => (
        <QuizCard data={item} num={index} cardsAmount={Brandon.cards.length} />
      ),
    };

    return [section, section, section];
  }, []);

  return (
    <>
      <DetailsHeaderSectionList
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        leftTopIconTestID={detailsHeaderTestIDs.headerLeftTopIcon}
        rightTopIcon={IconMenu}
        rightTopIconTestID={detailsHeaderTestIDs.headerRightTopIcon}
        contentContainerStyle={[
          styles.content,
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        containerStyle={screenStyles.stretchContainer}
        contentIcon={CardsBlack}
        contentIconNumber={10}
        contentIconNumberTestID={detailsHeaderTestIDs.contentIconNumber}
        backgroundColor={Brandon.color}
        hasBorderRadius
        image={Brandon.image}
        tag={Brandon.type}
        tagTestID={detailsHeaderTestIDs.tag}
        title={Brandon.author}
        titleStyle={screenStyles.text}
        titleTestID={detailsHeaderTestIDs.title}
        renderSectionHeader={() => {
          return <SectionHeader />;
        }}
        renderSectionFooter={() => {
          return <SectionFooter />;
        }}
        sections={sections}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    paddingHorizontal: 24,
  },
});
