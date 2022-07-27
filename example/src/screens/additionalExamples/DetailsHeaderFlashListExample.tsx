import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { withDetailsHeaderFlashList } from 'react-native-sticky-parallax-header';

import type { Question } from '../../assets/data/cards';
import { Brandon } from '../../assets/data/cards';
import { CardsBlack, IconMenu, iconCloseWhite } from '../../assets/icons';
import { QuizCard } from '../../components';
import { screenStyles } from '../../constants';

import { detailsHeaderTestIDs } from './testIDs';

const cards = Brandon.cards
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards)
  .concat(Brandon.cards);

const data = cards.map((card, index) => ({ ...card, id: `${index}` }));

const DetailsHeaderFlashList = withDetailsHeaderFlashList<Question & { id: string }>(FlashList);

export const DetailsHeaderFlashListExample: React.FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <DetailsHeaderFlashList
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        leftTopIconTestID={detailsHeaderTestIDs.headerLeftTopIcon}
        rightTopIcon={IconMenu}
        rightTopIconTestID={detailsHeaderTestIDs.headerRightTopIcon}
        contentContainerStyle={
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground
        }
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
        data={data}
        estimatedItemSize={300}
        keyExtractor={(item) => item.id}
        decelerationRate="normal"
        renderItem={({ item, index }) => (
          <QuizCard data={item} num={index} cardsAmount={Brandon.cards.length} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};
