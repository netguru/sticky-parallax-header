import React from 'react';
import { View } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { QuizCard } from '../../components';
import styles from './CardScreen.styles';
import { Brandon } from '../../assets/data/cards';
import type { User } from '../../../../lib/typescript/assets/data/cards';

const CardScreen = () => {
  const renderContent = (user: User) => (
    <View style={styles.content}>
      {user.cards.map((data, i, arr) => (
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      ))}
    </View>
  );

  return (
    <StickyParallaxHeader
      headerType="DetailsHeader"
      title={Brandon.author}
      leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
      rightTopIcon={require('../../assets/icons/Icon-Menu.png')}
      tag={Brandon.type}
      backgroundColor={Brandon.color}
      image={Brandon.image}
      contentIcon={require('../../assets/icons/cards_black.png')}
      contentIconNumber={10}
    >
      {renderContent(Brandon)}
    </StickyParallaxHeader>
  )
}

export default CardScreen;
