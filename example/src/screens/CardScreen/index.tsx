import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { DetailsHeaderScrollView } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { CardsBlack, IconMenu, iconCloseWhite } from '../../assets/icons';
import { QuizCard } from '../../components';
import { screenStyles } from '../../constants';
import type { CardRouteProp, RootStackNavigationProp } from '../../navigation/types';

import { cardScreenTestIDs } from './testIDs';

const CardScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<CardRouteProp>();
  const user = route.params?.user ?? Brandon;

  function goBack() {
    navigation.goBack();
  }

  return (
    <>
      <DetailsHeaderScrollView
        title={user.author}
        titleStyle={screenStyles.text}
        titleTestID={cardScreenTestIDs.headerTitle}
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        leftTopIconTestID={cardScreenTestIDs.headerLeftTopIcon}
        rightTopIcon={IconMenu}
        rightTopIconTestID={cardScreenTestIDs.headerRightTopIcon}
        tag={user.type}
        tagTestID={cardScreenTestIDs.headerTag}
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={user.color}
        image={user.image}
        contentIcon={CardsBlack}
        contentIconNumber={10}
        contentIconNumberTestID={cardScreenTestIDs.headerContentIconNumber}>
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
