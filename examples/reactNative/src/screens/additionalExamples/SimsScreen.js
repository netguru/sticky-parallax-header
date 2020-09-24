import React from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { BlurView } from '@react-native-community/blur';

const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 97,
  },
  headerWrapper: {
    position: 'absolute',
    left: 0,
    top: 55,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    width: 18,
    height: 18,
  },
  headerButtonContainer: {
    position: 'absolute',
    top: 50,
    zIndex: 4,
  },
  headerButton: {
    backgroundColor: 'white',
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
    color: '#2488FF',
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
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
    paddingBottom: 3,
  },
  headerDetailsButton: {
    backgroundColor: '#3479F6',
    width: 80,
    height: 33,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  headerDetailsButtonTitle: {
    color: 'white',
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
    marginBottom: 100,
    marginTop: 27,
    marginLeft: 27,
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
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  foregroundDetailsDesc: {
    color: 'gray',
    fontSize: 20,
  },
  foregroundActionsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  foregroundActionsButton: {
    backgroundColor: '#3479F6',
    width: 80,
    height: 33,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foregroundActionsButtonTitle: {
    marginLeft: 10,
    color: 'gray',
    fontSize: 10,
  },
  foregroundActionsShare: {
    width: 20,
    height: 20,
    marginLeft: 30,
  },
});

const renderForeground = () => (
  <View>
    <Image
      source={{
        uri: 'https://i.ytimg.com/vi/gGca2DVEegc/maxresdefault.jpg',
      }}
      style={styles.foregroundImage}
    />
    <View style={styles.foregroundContainer}>
      <Image
        source={{
          uri:
            'https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/0c/9e/88/0c9e8824-1373-995f-3be0-30814b1e4d15/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-85-220.png/460x0w.png',
        }}
        style={styles.foregroundLogo}
      />
      <View style={styles.foregroundDetails}>
        <Text style={styles.foregroundDetailsHeader}>The Sims™ Mobile</Text>
        <Text style={styles.foregroundDetailsDesc}>Play with life.</Text>
        <View style={styles.foregroundActionsContainer}>
          <TouchableOpacity style={styles.foregroundActionsButton}>
            <Text style={styles.headerDetailsButtonTitle}>GET</Text>
          </TouchableOpacity>
          <Text style={styles.foregroundActionsButtonTitle}>{'In-App\nPurchases'}</Text>
          <Image
            source={require('../../assets/icons/share.png')}
            style={styles.foregroundActionsShare}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  </View>
);

const renderHeader = () => {
  const opacity = scrollY.y.interpolate({
    inputRange: [0, 110, 150],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const left = scrollY.y.interpolate({
    inputRange: [0, 110, 160],
    outputRange: [24, 24, -40],
    extrapolate: 'clamp',
  });

  const arrowOpacity = scrollY.y.interpolate({
    inputRange: [0, 110, 140],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const detailsOpacity = scrollY.y.interpolate({
    inputRange: [0, 250, 350],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <>
      <TouchableOpacity style={[styles.headerButtonContainer, { left }]}>
        <Animated.View style={[styles.headerButton, { opacity: arrowOpacity }]}>
          <Image
            style={styles.headerImage}
            resizeMode="contain"
            source={{
              uri: 'https://cdn.iconscout.com/icon/free/png-256/chevron-25-433513.png',
            }}
          />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.headerContainer, { opacity }]}>
        <BlurView
          style={styles.headerBlurView}
          blurType="chromeMaterialDark"
          blurAmount={15}
          reducedTransparencyFallbackColor="black"
        />
      </Animated.View>
      <View style={styles.headerWrapper}>
        <Animated.View style={[styles.headerSearchContainer, { opacity }]}>
          <Image
            style={styles.headerSearchArrow}
            resizeMode="contain"
            source={{
              uri: 'https://www.shareicon.net/data/512x512/2016/05/19/767484_arrows_512x512.png',
            }}
          />
          <Text style={styles.headerSearchText}>Search</Text>
        </Animated.View>
        <Animated.View style={{ opacity: detailsOpacity }}>
          <Image
            source={{
              uri:
                'https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/0c/9e/88/0c9e8824-1373-995f-3be0-30814b1e4d15/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-85-220.png/460x0w.png',
            }}
            style={styles.headerDetailsImage}
          />
        </Animated.View>
        <Animated.View style={[styles.headerDetailsContainer, { opacity: detailsOpacity }]}>
          <Text style={styles.headerDetailsText}>{'In-App\nPurchases'}</Text>
          <TouchableOpacity style={styles.headerDetailsButton}>
            <Text style={styles.headerDetailsButtonTitle}>GET</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

const AppStoreHeader = () => (
  <StickyParallaxHeader
    headerType="AvatarHeader"
    hasBorderRadius={false}
    backgroundColor="black"
    scrollEvent={event([{ nativeEvent: { contentOffset: { y: scrollY.y } } }], {
      useNativeDriver: false,
    })}
    parallaxHeight={430}
    transparentHeader
    foreground={renderForeground}
    header={renderHeader}
    snapStartThreshold={50}
    snapStopThreshold={250}
    snapValue={167}
  />
);

export default AppStoreHeader;
