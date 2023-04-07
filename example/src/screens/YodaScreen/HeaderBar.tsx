import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants';

import { yodaScreenTestIDs } from './testIDs';

interface HeaderBarProps {
  scrollValue: Animated.SharedValue<number>;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ scrollValue }) => {
  const navigation = useNavigation();
  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 60, 90], [0, 0, 1], Extrapolate.CLAMP) };
  }, [scrollValue]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.headerContainer}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={goBack} testID={yodaScreenTestIDs.headerBarBackButton}>
          <Image
            style={styles.headerImage}
            resizeMode="contain"
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/1200px-VisualEditor_-_Icon_-_Close_-_white.svg.png',
            }}
          />
        </TouchableOpacity>
        <Animated.View style={animatedStyle}>
          <Text style={styles.headerText} testID={yodaScreenTestIDs.headerBarText}>
            Baby Yoda
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 20,
    height: 20,
  },
  headerText: {
    color: colors.white,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 20,
    paddingLeft: 20,
  },
});
