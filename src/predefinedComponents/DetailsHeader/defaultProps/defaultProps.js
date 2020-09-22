import React from 'react';
import { View } from 'react-native';
import { QuizCard } from '../../components';
import styles from '../DetailsHeader.styles';

const renderContent = (user) => (
  <View style={styles.content}>
    {user.cards.map((data, i, arr) => (
      <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
    ))}
  </View>
);

export { renderContent };
