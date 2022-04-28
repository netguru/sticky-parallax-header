import { useNavigation } from '@react-navigation/native';
import type { FC } from 'react';
import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

// TODO: Change path when removing old API
import { AvatarHeaderScrollView } from '../../../../src/predefinedComponents/AvatarHeader/AvatarHeaderScrollView';
import { Brandon } from '../../assets/data/cards';
import QuizCard from '../../components/QuizCard/QuizCard';

export const AvatarHeaderScrollViewExample: FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return <AvatarHeaderScrollView
    leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
    leftTopIconOnPress={goBack}
    rightTopIcon={require('../../assets/icons/Icon-Menu.png')}
    contentContainerStyle={[ isDarkTheme ? styles.darkBackground : styles.lightBackground ]}
    backgroundColor={Brandon.color}
    hasBorderRadius
    image={Brandon.image}
    subtitle={Brandon.about}
    title={Brandon.author}
  >
    <View style={styles.content}>
      {Brandon.cards.map((data, i, arr) => 
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      )}
    </View>
  </AvatarHeaderScrollView>;
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
});
