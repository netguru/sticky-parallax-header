import { useNavigation } from '@react-navigation/native';
import type { FC } from 'react';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { DetailsHeaderFlatList } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { QuizCard } from '../../components';
import { screenStyles } from '../../constants';

export const DetailsHeaderFlatListExample: FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <DetailsHeaderFlatList
        leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
        leftTopIconOnPress={goBack}
        rightTopIcon={require('../../assets/icons/Icon-Menu.png')}
        contentContainerStyle={[
          styles.content,
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        containerStyle={screenStyles.stretchContainer}
        contentIcon={require('../../assets/icons/cards_black.png')}
        contentIconNumber={10}
        backgroundColor={Brandon.color}
        hasBorderRadius
        image={Brandon.image}
        tag={Brandon.type}
        title={Brandon.author}
        titleStyle={screenStyles.text}
        data={Brandon.cards}
        keyExtractor={(item) => item.question}
        renderItem={({ item, index }) => (
          <QuizCard data={item} num={index} cardsAmount={Brandon.cards.length} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 24,
  },
});
