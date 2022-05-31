import { useNavigation, useRoute } from '@react-navigation/native';
import type { VFC } from 'react';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { DetailsHeaderScrollView } from 'react-native-sticky-parallax-header';

import type { User } from '../assets/data/cards';
import { Brandon } from '../assets/data/cards';
import { CardsBlack, IconMenu, iconCloseWhite } from '../assets/icons';
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
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        rightTopIcon={IconMenu}
        tag={user.type}
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={user.color}
        image={user.image}
        contentIcon={CardsBlack}
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
