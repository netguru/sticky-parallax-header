import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { func, string, number } from 'prop-types';
import styles from './QuizListElement.styles';
import { colors } from '../../../constants';

const QuizListElement = ({
  onPress,
  authorName,
  imageSource,
  mainText,
  labelText,
  elements,
  pressUser,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.95}>
    <View style={styles.labelContainer}>
      <View style={styles.labelTextContainer}>
        <Text style={styles.labelText}>{labelText}</Text>
      </View>
      <View style={[styles.iconContainer, elements >= 20 && { backgroundColor: colors.coralPink }]}>
        <Image source={require('../../../assets/icons/cards.png')} style={styles.icon} />
        <Text style={[styles.number, elements < 10 && styles.iconCardElement]}>{elements}</Text>
      </View>
    </View>
    <View style={styles.mainTextContainer}>
      <Text style={styles.mainText}>{mainText}</Text>
    </View>
    <View style={styles.authorWrapper}>
      <TouchableOpacity style={styles.authorContainer} onPress={pressUser}>
        <View style={styles.footerContainer}>
          <Image source={imageSource} style={styles.authorPhoto} resizeMode="contain" />
          <Text style={styles.authorName}>{authorName}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.authorBlankContainer} />
    </View>
  </TouchableOpacity>
);

QuizListElement.propTypes = {
  onPress: func,
  authorName: string,
  mainText: string,
  labelText: string,
  elements: number,
  imageSource: Image.propTypes.source,
  pressUser: func,
};

export default QuizListElement;
