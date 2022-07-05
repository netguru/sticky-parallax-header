import type { VFC } from 'react';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { share } from '../../assets/icons';
import { colors } from '../../constants';

import { simsScreenTestIDs } from './testIDs';

interface ForegroundProps {
  scrollValue: Animated.SharedValue<number>;
}

export const Foreground: VFC<ForegroundProps> = ({ scrollValue }) => {
  const foregroundWrapperAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 250, 330], [1, 1, 0], Extrapolate.CLAMP) };
  });

  return (
    <View pointerEvents="none" style={styles.foregroundWrapper}>
      <Animated.View style={foregroundWrapperAnimatedStyle}>
        <Image
          source={{
            uri: 'https://i.ytimg.com/vi/gGca2DVEegc/maxresdefault.jpg',
          }}
          style={styles.foregroundImage}
        />
        <View style={styles.foregroundContainer}>
          <Image
            source={{
              uri: 'https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/0c/9e/88/0c9e8824-1373-995f-3be0-30814b1e4d15/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-85-220.png/460x0w.png',
            }}
            style={styles.foregroundLogo}
          />
          <View style={styles.foregroundDetails}>
            <Text
              style={styles.foregroundDetailsHeader}
              testID={simsScreenTestIDs.foregroundDetailsHeader}>
              The Sims™ Mobile
            </Text>
            <Text style={styles.foregroundDetailsDesc}>Play with life.</Text>
            <View style={styles.foregroundActionsContainer}>
              <TouchableOpacity style={styles.foregroundActionsButton}>
                <Text style={styles.headerDetailsButtonTitle}>GET</Text>
              </TouchableOpacity>
              <Text style={styles.foregroundActionsButtonTitle}>{'In-App\nPurchases'}</Text>
              <Image source={share} style={styles.foregroundActionsShare} resizeMode="contain" />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerDetailsButtonTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  foregroundImage: {
    width: '110%',
    height: 250,
    marginLeft: -25,
  },
  foregroundContainer: {
    flexDirection: 'row',
    marginTop: 27,
    marginLeft: 27,
    marginBottom: 18,
  },
  foregroundLogo: {
    width: 128,
    height: 128,
    borderRadius: 32,
  },
  foregroundDetails: {
    marginLeft: 15,
  },
  foregroundDetailsHeader: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  foregroundDetailsDesc: {
    color: colors.paleGrey,
    fontSize: 20,
  },
  foregroundActionsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  foregroundActionsButton: {
    backgroundColor: colors.detailsBlue,
    width: 80,
    height: 33,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foregroundActionsButtonTitle: {
    marginLeft: 10,
    color: colors.paleGrey,
    fontSize: 10,
  },
  foregroundActionsShare: {
    width: 20,
    height: 20,
    marginLeft: 30,
  },
  foregroundWrapper: {
    backgroundColor: colors.black,
  },
});
