import React, { useState, VFC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './QuizCard.styles';
import QuizOption from '../QuizOption/QuizOption';
import type { Card, Question } from '../../assets/data/cards';

type Props = {
  onPress?: () => void;
  data:
    | {
        cards: Card[];
        number: string;
        question: string;
        value: boolean;
        revealed: boolean;
        picked: boolean;
      }
    | Question;
  num: number;
  cardsAmount: number;
};

const QuizCard: VFC<Props> = ({ data: { question, cards }, num, onPress, cardsAmount }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.95}>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>{`${num + 1}/${cardsAmount}`}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.mainText}>{question}</Text>
      </View>
      {cards.map((card) => (
        <QuizOption
          key={card.question}
          reveal={() => {
            setRevealed(true);
          }}
          revealed={revealed}
          card={card}
        />
      ))}
    </TouchableOpacity>
  );
};

export default QuizCard;
