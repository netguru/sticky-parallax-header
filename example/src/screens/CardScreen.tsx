import { useNavigation, useRoute } from '@react-navigation/native';
import type { VFC } from 'react';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { DetailsHeaderScrollView } from 'react-native-sticky-parallax-header';

import type { User } from '../assets/data/cards';
import { Brandon } from '../assets/data/cards';
import { QuizCard } from '../components';
import { screenStyles } from '../constants';

const CardScreen: VFC = () => {
  const navigation = useNavigation();
  const route = useRoute() as { params?: { user: User } };
  const user = route.params?.user ?? Brandon;

  function goBack() {
    navigation.goBack();
  }

  return (
    <>
      <DetailsHeaderScrollView
        title={user.author}
        titleStyle={screenStyles.text}
        leftTopIcon={require('../assets/icons/iconCloseWhite.png')}
        leftTopIconOnPress={goBack}
        rightTopIcon={require('../assets/icons/Icon-Menu.png')}
        tag={user.type}
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={user.color}
        image={user.image}
        contentIcon={require('../assets/icons/cards_black.png')}
        contentIconNumber={10}>
        <View style={screenStyles.content}>
          {user.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
      </DetailsHeaderScrollView>
      <StatusBar barStyle="light-content" backgroundColor={user.color} translucent />
    </>
  );
};

export default CardScreen;
