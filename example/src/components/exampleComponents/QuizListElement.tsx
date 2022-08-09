import * as React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { cards } from '../../assets/icons';
import { colors, constants, screenStyles } from '../../constants';

type Props = {
  onPress?: () => void;
  authorName: string;
  mainText: string;
  labelText: string;
  elements: number;
  imageSource: ImageSourcePropType | null;
  pressUser?: () => void;
};

const QuizListElement: React.FC<Props> = ({
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
        <Text style={[screenStyles.text, styles.labelText]}>{labelText}</Text>
      </View>
      <View style={[styles.iconContainer, elements >= 20 && { backgroundColor: colors.coralPink }]}>
        <Image source={cards} style={styles.icon} />
        <Text style={[styles.number, elements < 10 && styles.iconCardElement]}>{elements}</Text>
      </View>
    </View>
    <View>
      <Text style={[screenStyles.text, styles.mainText]}>{mainText}</Text>
    </View>
    <View style={styles.authorWrapper}>
      <TouchableOpacity style={styles.authorContainer} onPress={pressUser}>
        <View style={styles.footerContainer}>
          {imageSource && (
            <Image source={imageSource} style={styles.authorPhoto} resizeMode="contain" />
          )}
          <Text style={[screenStyles.text, styles.authorName]}>{authorName}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.authorBlankContainer} />
    </View>
  </TouchableOpacity>
);

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
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: constants.isAndroid ? 2 : 0,
    borderColor: colors.paleGrey,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelTextContainer: {
    backgroundColor: colors.paleGrey,
    borderRadius: 16,
  },
  labelText: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.greyishBrown,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 32,
    shadowOpacity: 0.016,
    backgroundColor: colors.purplishBlue,
    width: 56,
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
  number: {
    color: colors.white,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 20,
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.black,
    letterSpacing: -0.2,
    paddingTop: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 22,
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius: constants.isAndroid ? 50 : 8,
  },
  authorName: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.black,
    paddingLeft: 8,
  },
  authorWrapper: {
    flexDirection: 'row',
  },
  authorContainer: {
    paddingRight: 40,
  },
  authorBlankContainer: {
    width: '38%',
  },
  iconCardElement: {
    paddingLeft: 8,
  },
});

export default QuizListElement;
