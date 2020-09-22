import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { string, bool, shape, func } from 'prop-types';
import styles from './QuizOption.styles';
import { colors } from '../../../constants';

const QuizOption = ({ reveal, revealed, card: { number, question, value } }) => {
  const [picked, setPicked] = useState(false);
  const [paddingVertical, setPaddingVertical] = useState(0);
  const calcPaddings = (event) => {
    const { height } = event.nativeEvent.layout;
    const circleRadius = 40;
    const padding = height > circleRadius ? height / 2.5 : 0;
    setPaddingVertical(padding);
  };

  const renderValue = () => {
    if (value) {
      return <Image source={require('../../../assets/icons/Check.png')} />;
    }

    return <Image source={require('../../../assets/icons/Close.png')} />;
  };

  if (revealed) {
    let backgroundColor = 'white';
    let color = 'black';
    if (picked) color = 'white';
    if (picked && value) backgroundColor = colors.jade;
    if (picked && !value) backgroundColor = colors.coralPink;

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={[styles.letterContainer, { paddingVertical }]}>{renderValue()}</View>
        <View
          onLayout={(event) => {
            calcPaddings(event);
          }}
          style={styles.textContainer}>
          <Text style={[styles.text, { color }]}>{question}</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        reveal();
        setPicked(true);
      }}
      style={styles.container}>
      <View style={[styles.letterContainer, { paddingVertical }]}>
        <Text style={styles.letter}>{number}</Text>
      </View>
      <View
        onLayout={(event) => {
          calcPaddings(event);
        }}
        style={styles.textContainer}>
        <Text style={styles.text}>{question}</Text>
      </View>
    </TouchableOpacity>
  );
};

QuizOption.propTypes = {
  card: shape({
    number: string,
    question: string,
    value: bool,
    picked: bool,
  }),
  reveal: func,
  revealed: bool,
};

export default QuizOption;
