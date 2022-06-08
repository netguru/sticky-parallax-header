import type { VFC } from 'react';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Card, Question } from '../../assets/data/cards';
import { colors, screenStyles } from '../../constants';

import QuizOption from './QuizOption';

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

  const reveal = useCallback(() => {
    setRevealed(true);
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.95}>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextContainer}>
          <Text style={[screenStyles.text, styles.labelText]}>{`${num + 1}/${cardsAmount}`}</Text>
        </View>
      </View>
      <View>
        <Text style={[screenStyles.text, styles.mainText]}>{question}</Text>
      </View>
      {cards.map((card) => (
        <QuizOption key={card.question} reveal={reveal} revealed={revealed} card={card} />
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 40,
    shadowOpacity: 0.08,
    borderWidth: 2,
    borderColor: colors.paleGrey,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  labelTextContainer: {
    backgroundColor: colors.paleGrey,
    borderRadius: 16,
  },
  labelText: {
    color: colors.greyishBrown,
    fontSize: 12,
    letterSpacing: 0.8,
    lineHeight: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mainText: {
    color: colors.black,
    fontSize: 20,
    lineHeight: 24,
    paddingBottom: 20,
    paddingTop: 8,
  },
});

export default QuizCard;
