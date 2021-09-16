import React, { ReactElement, ReactNode } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  StatusBar,
  LayoutRectangle,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import StickyParallaxHeader, {
  StickyParallaxHeaderProps,
} from '../../StickyParallaxHeaderComponent';
import { constants, sizes } from '../../constants';
import styles from './AvatarHeader.styles';
import { Brandon } from '../../assets/data/cards';
import RenderContent from './defaultProps/defaultProps';
import type { IconProps, RenderBody, SharedPredefinedHeaderProps } from '../../index';

const { event, ValueXY } = Animated;

export interface AvatarHeaderProps extends IconProps, SharedPredefinedHeaderProps, RenderBody {
  headerType: 'AvatarHeader';
  hasBorderRadius?: boolean;
  header?: () => StickyParallaxHeaderProps['header'];
  image?: ImageSourcePropType;
  subtitle?: string;
  title?: string;
}

type State = {
  headerLayout: {
    height: number;
  };
};

const finishImgPosition = 31;
const startImgPosition = 27;

class AvatarHeader extends React.Component<AvatarHeaderProps, State> {
  scrollY: Animated.ValueXY;

  constructor(props: AvatarHeaderProps) {
    super(props);

    this.state = {
      headerLayout: {
        height: 0,
      },
    };
    this.scrollY = new ValueXY();
  }

  setHeaderSize = (headerLayout: LayoutRectangle) => {
    const { headerSize } = this.props;

    if (headerSize) headerSize(headerLayout);
    this.setState({ headerLayout });
  };

  scrollPosition(value: number): number {
    const {
      headerLayout: { height },
    } = this.state;

    return constants.scrollPosition(height, value);
  }

  renderAvatarHeader = (): StickyParallaxHeaderProps['header'] => {
    const {
      leftTopIconOnPress,
      leftTopIcon,
      rightTopIcon,
      rightTopIconOnPress,
      image,
      backgroundColor,
      title,
    } = this.props;

    const [beforeFadeImg, startFadeImg, finishFadeImg] = [
      this.scrollPosition(30),
      this.scrollPosition(40),
      this.scrollPosition(70),
    ];
    const [beforeFadeName, startFadeName, finishFadeName] = [
      this.scrollPosition(50),
      this.scrollPosition(60),
      this.scrollPosition(75),
    ];

    const imageOpacity = this.scrollY.y.interpolate({
      inputRange: [0, beforeFadeImg, startFadeImg, finishFadeImg],
      outputRange: [0, 0, 0.5, 1],
      extrapolate: 'clamp',
    });
    const nameOpacity = this.scrollY.y.interpolate({
      inputRange: [0, beforeFadeName, startFadeName, finishFadeName],
      outputRange: [0, 0, 0.5, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.headerWrapper, styles.userModalHeader, { backgroundColor }]}>
        <View style={styles.headerMenu}>
          <TouchableOpacity
            hitSlop={sizes.hitSlop}
            onPress={leftTopIconOnPress}
            style={styles.leftHeaderButton}>
            {/*@ts-ignore There is default props for that*/}
            <Image style={styles.icon} resizeMode="contain" source={leftTopIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            {/*@ts-ignore There is default props for that*/}
            <Animated.Image source={image} style={[styles.headerPic, { opacity: imageOpacity }]} />
            <Animated.Text numberOfLines={1} style={[styles.headerTitle, { opacity: nameOpacity }]}>
              {title}
            </Animated.Text>
          </View>
          <TouchableOpacity
            hitSlop={sizes.hitSlop}
            onPress={rightTopIconOnPress}
            style={styles.rightHeaderButton}>
            {/*@ts-ignore There is default props for that*/}
            <Image style={styles.icon} resizeMode="contain" source={rightTopIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderHeader = (): StickyParallaxHeaderProps['header'] => {
    const { header } = this.props;

    return header ? header() : this.renderAvatarHeader();
  };

  renderAvatarForeground = (): ReactNode => {
    const { image, subtitle, title } = this.props;
    const startSize = constants.responsiveWidth(18);
    const endSize = constants.responsiveWidth(12);

    const [startImgAnimation, finishImgAnimation] = [
      this.scrollPosition(startImgPosition),
      this.scrollPosition(finishImgPosition),
    ];
    const [startAuthorFade, finishAuthorFade] = [this.scrollPosition(40), this.scrollPosition(50)];

    const [startAboutFade, fininshAboutFade] = [this.scrollPosition(60), this.scrollPosition(70)];

    const imageOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startImgAnimation, finishImgAnimation],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });
    const imageSize = this.scrollY.y.interpolate({
      inputRange: [0, startImgAnimation, finishImgAnimation],
      outputRange: [startSize, startSize, endSize],
      extrapolate: 'clamp',
    });
    const authorOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startAuthorFade, finishAuthorFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const aboutOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startAboutFade, fininshAboutFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.foreground}>
        <Animated.View style={{ opacity: imageOpacity }}>
          <Animated.Image
            /*@ts-ignore There is default props for that*/
            source={image}
            style={[styles.profilePic, { width: imageSize, height: imageSize }]}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.messageContainer,
            styles.userModalMessageContainer,
            { opacity: authorOpacity },
          ]}>
          <Text numberOfLines={2} style={[styles.message, styles.foregroundTitle]}>
            {title}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.infoContainer, { opacity: aboutOpacity }]}>
          <Text style={styles.infoText}>{subtitle}</Text>
        </Animated.View>
      </View>
    );
  };

  renderForeground = (): ReactNode => {
    const { foreground } = this.props;

    return foreground?.() ?? this.renderAvatarForeground();
  };

  renderBackground = (): ReactElement => {
    const {
      headerLayout: { height },
    } = this.state;
    const { backgroundColor, hasBorderRadius } = this.props;

    const headerBorderRadius = this.scrollY.y.interpolate({
      inputRange: [0, height],
      outputRange: [80, 0],
      extrapolate: 'extend',
    });

    const borderBottomRightRadius = hasBorderRadius ? headerBorderRadius : 0;

    return (
      <Animated.View
        style={[
          styles.background,
          {
            borderBottomRightRadius,
            backgroundColor,
          },
        ]}
      />
    );
  };

  render() {
    const {
      backgroundColor,
      backgroundImage,
      contentContainerStyles,
      children,
      renderBody,
      headerHeight,
      snapToEdge,
      bounces,
      scrollEvent,
      parallaxHeight,
      snapStartThreshold,
      snapStopThreshold,
      snapValue,
      transparentHeader,
      scrollRef,
      keyboardShouldPersistTaps,
      refreshControl,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
    } = this.props;

    if (renderBody) {
      console.warn('Warning: renderBody prop is deprecated. Please use children instead');
    }

    return (
      <>
        <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
        <StickyParallaxHeader
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
            listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => scrollEvent && scrollEvent(e),
          })}
          background={this.renderBackground()}
          backgroundImage={backgroundImage}
          bounces={bounces}
          contentContainerStyles={contentContainerStyles}
          foreground={this.renderForeground()}
          header={this.renderHeader()}
          headerHeight={headerHeight}
          headerSize={this.setHeaderSize}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          parallaxHeight={parallaxHeight}
          refreshControl={refreshControl}
          scrollRef={scrollRef}
          snapStartThreshold={snapStartThreshold}
          snapStopThreshold={snapStopThreshold}
          snapToEdge={snapToEdge}
          snapValue={snapValue}
          transparentHeader={transparentHeader}>
          {renderBody !== undefined ? renderBody() : children}
        </StickyParallaxHeader>
      </>
    );
  }

  static defaultProps = {
    // default is used remember to check before removing
    leftTopIcon: require('../../assets/icons/iconCloseWhite.png'),
    // default is used remember to check before removing
    rightTopIcon: require('../../assets/icons/Icon-Menu.png'),
    backgroundColor: Brandon.color,
    headerHeight: sizes.userModalHeaderHeight,
    title: Brandon.author,
    subtitle: Brandon.about,
    // default is used remember to check before removing
    image: Brandon.image,
    children: <RenderContent user={Brandon} />,
    bounces: true,
    snapToEdge: true,
    hasBorderRadius: true,
    parallaxHeight: sizes.userScreenParallaxHeader,
    transparentHeader: false,
    scrollRef: null,
    keyboardShouldPersistTaps: undefined,
    refreshControl: undefined,
    headerSize: undefined,
    onMomentumScrollEnd: undefined,
    onMomentumScrollBegin: undefined,
  };
}

export default AvatarHeader;