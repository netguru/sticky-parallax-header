import { useNavigation } from '@react-navigation/native';
import type { FC } from 'react';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

// TODO: Change path when removing old API
import { DetailsHeaderFlatList } from '../../../../src/predefinedComponents/DetailsHeader/DetailsHeaderFlatList';
import { Brandon } from '../../assets/data/cards';
import QuizCard from '../../components/QuizCard/QuizCard';

export const DetailsHeaderFlatListExample: FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return <DetailsHeaderFlatList
    leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
    leftTopIconOnPress={goBack}
    rightTopIcon={require('../../assets/icons/Icon-Menu.png')}
    contentContainerStyle={[ styles.content, isDarkTheme ? styles.darkBackground : styles.lightBackground ]}
    contentIcon={require('../../assets/icons/cards_black.png')}
    contentIconNumber={10}
    backgroundColor={Brandon.color}
    hasBorderRadius
    image={Brandon.image}
    tag={Brandon.type}
    title={Brandon.author}
    data={Brandon.cards}
    keyExtractor={(item) => item.question}
    renderItem={({ item, index }) => <QuizCard data={item} num={index} cardsAmount={Brandon.cards.length} />}
  />;
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 24,
  },
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
});
