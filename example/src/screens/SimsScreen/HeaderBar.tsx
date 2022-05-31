import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import type { VFC } from 'react';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../constants';

interface HeaderBarProps {
  scrollValue: Animated.SharedValue<number>;
}

const DEFAULT_TOP_INSET = 30;

export const HeaderBar: VFC<HeaderBarProps> = ({ scrollValue }) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const insets = useSafeAreaInsets();

  const headerButtonContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollValue.value,
            [0, 110, 160],
            [24, 24, -40],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  const headerContainerAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 110, 150], [0, 0, 1], Extrapolate.CLAMP) };
  });
  const headerButtonAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 110, 140], [1, 1, 0], Extrapolate.CLAMP) };
  });
  const headerDetailsContainerAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 250, 330], [0, 0, 1], Extrapolate.CLAMP) };
  });

  return (
    <>
      <TouchableOpacity
        onPress={goBack}
        style={[
          styles.headerButtonContainer,
          headerButtonContainerAnimatedStyle,
          { top: insets.top || DEFAULT_TOP_INSET, left: insets.left },
        ]}>
        <Animated.View style={[styles.headerButton, headerButtonAnimatedStyle]}>
          <Image
            style={styles.headerImage}
            resizeMode="contain"
            source={{
              uri: 'https://cdn.iconscout.com/icon/free/png-256/chevron-25-433513.png',
            }}
          />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.headerContainer, headerContainerAnimatedStyle]}>
        <BlurView style={styles.headerBlurView} tint="dark" intensity={90} />
      </Animated.View>
      <View
        style={[styles.headerWrapper, { top: insets.top || DEFAULT_TOP_INSET, left: insets.left }]}>
        <Animated.View style={headerContainerAnimatedStyle}>
          <TouchableOpacity style={styles.headerSearchContainer} onPress={goBack}>
            <Image
              style={styles.headerSearchArrow}
              resizeMode="contain"
              source={{
                uri: 'https://www.shareicon.net/data/512x512/2016/05/19/767484_arrows_512x512.png',
              }}
            />

            <Text style={styles.headerSearchText}>Search</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={headerDetailsContainerAnimatedStyle}>
          <Image
            source={{
              uri: 'https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/0c/9e/88/0c9e8824-1373-995f-3be0-30814b1e4d15/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-85-220.png/460x0w.png',
            }}
            style={styles.headerDetailsImage}
          />
        </Animated.View>
        <Animated.View style={[styles.headerDetailsContainer, headerDetailsContainerAnimatedStyle]}>
          <Text style={styles.headerDetailsText}>{'In-App\nPurchases'}</Text>
          <TouchableOpacity style={styles.headerDetailsButton}>
            <Text style={styles.headerDetailsButtonTitle}>GET</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 97,
  },
  headerWrapper: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    width: 18,
    height: 18,
    tintColor: colors.white,
  },
  headerButtonContainer: {
    position: 'absolute',
    zIndex: 4,
  },
  headerButton: {
    backgroundColor: colors.black,
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBlurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headerSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 60,
  },
  headerSearchArrow: {
    width: 25,
    height: 25,
  },
  headerSearchText: {
    color: colors.backBlue,
    fontSize: 20,
  },
  headerDetailsImage: {
    width: 30,
    height: 30,
    borderRadius: 7.5,
  },
  headerDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerDetailsText: {
    marginLeft: 10,
    color: colors.paleGrey,
    fontSize: 10,
    textAlign: 'right',
    paddingBottom: 3,
  },
  headerDetailsButton: {
    backgroundColor: colors.detailsBlue,
    width: 80,
    height: 33,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  headerDetailsButtonTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
