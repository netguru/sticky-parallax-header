import { useNavigation } from '@react-navigation/native';
import type { FC } from 'react';
import React from 'react';
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { DetailsHeaderScrollView } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { QuizCard } from '../../components';
import { screenStyles } from '../../constants';

export const DetailsHeaderScrollViewExample: FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <DetailsHeaderScrollView
        leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
        leftTopIconOnPress={goBack}
        rightTopIcon={require('../../assets/icons/Icon-Menu.png')}
        contentContainerStyle={[
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
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
      </DetailsHeaderScrollView>
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },
});
