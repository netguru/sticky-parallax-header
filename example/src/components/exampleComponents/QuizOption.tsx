import type { VFC } from 'react';
import React, { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import type { Card } from '../../assets/data/cards';
import { colors, screenStyles } from '../../constants';

type Props = {
  card: Card;
  reveal: () => void;
  revealed: boolean;
};

const QuizOption: VFC<Props> = ({ reveal, revealed, card: { number, question, value } }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [picked, setPicked] = useState(false);
  const [paddingVertical, setPaddingVertical] = useState(0);
  const calcPaddings = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    const circleRadius = 40;
    const padding = height > circleRadius ? height / 2.5 : 0;

    setPaddingVertical(padding);
  };

  const renderValue = () => {
    if (value) {
      return <Image source={require('../../assets/icons/Check.png')} />;
    }

    return <Image source={require('../../assets/icons/Close.png')} />;
  };

  if (revealed) {
    let backgroundColor = 'white';
    let color = 'black';

    if (picked) color = 'white';
    if (picked && value) backgroundColor = colors.jade;
    if (picked && !value) backgroundColor = colors.coralPink;

    return (
      <View style={[styles.container, { backgroundColor, width: windowWidth * 0.75 }]}>
        <View style={[styles.letterContainer, { paddingVertical }]}>{renderValue()}</View>
        <View
          onLayout={(event) => {
            calcPaddings(event);
          }}
          style={styles.textContainer}>
          <Text style={[screenStyles.text, styles.text, { color }]}>{question}</Text>
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
      style={[styles.container, { width: windowWidth * 0.75 }]}>
      <View style={[styles.letterContainer, { paddingVertical }]}>
        <Text style={[screenStyles.text, styles.letter]}>{number}</Text>
      </View>
      <View
        onLayout={(event) => {
          calcPaddings(event);
        }}
        style={styles.textContainer}>
        <Text style={[screenStyles.text, styles.text]}>{question}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: colors.paleGrey,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  letter: {
    color: colors.black,
  },
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    width: 36,
    borderRadius: 17.5,
    backgroundColor: colors.white,
    margin: 6,
  },
  textContainer: {
    width: '80%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 7,
    paddingVertical: 5,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default QuizOption;
