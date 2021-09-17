import React, { VFC } from 'react';
import { View } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { QuizCard } from '../../components';
import styles from './CardScreen.styles';
import { Brandon, User } from '../../assets/data/cards';

type Props = { route: { params?: { user: User } } };

const CardScreen: VFC<Props> = ({ route }) => {
  const user = route.params?.user ?? Brandon;

  const renderContent = () => (
    <View style={styles.content}>
      {user.cards.map((data, i, arr) => (
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      ))}
    </View>
  );

  return (
    <StickyParallaxHeader
      headerType="DetailsHeader"
      title={user.author}
      leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
      rightTopIcon={require('../../assets/icons/Icon-Menu.png')}
      tag={user.type}
      backgroundColor={user.color}
      image={user.image}
      contentIcon={require('../../assets/icons/cards_black.png')}
      contentIconNumber={10}>
      {renderContent()}
    </StickyParallaxHeader>
  );
};

export default CardScreen;
