import React, { ReactElement } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  ImageSourcePropType,
} from 'react-native';
import StickyParallaxHeader, {
  DetailsData,
  StickyParallaxHeaderProps,
} from '../../StickyParallaxHeaderComponent';
import { constants, sizes } from '../../constants';
import { Brandon } from '../../assets/data/cards';
import styles from './DetailsHeader.styles';
import { renderContent } from './defaultProps/defaultProps';
import type { IconProps, RenderBody, SharedPredefinedHeaderProps } from '../../index';

const { event, ValueXY } = Animated;

export interface DetailsHeaderProps extends IconProps, SharedPredefinedHeaderProps, RenderBody {
  headerType: 'DetailsHeader';
  hasBorderRadius?: boolean;
  iconNumber?: number;
  image?: ImageSourcePropType;
  tag?: string;
  title?: string;
}
type State = {
  headerLayout: {
    height: number;
  };
};

class DetailsHeader extends React.Component<DetailsHeaderProps, State> {
  scrollY: Animated.ValueXY;

  constructor(props: DetailsHeaderProps) {
    super(props);
    this.state = {
      headerLayout: {
        height: 0,
      },
    };

    this.scrollY = new ValueXY();
  }

  setHeaderSize: StickyParallaxHeaderProps['headerSize'] = (headerLayout) => {
    const { headerSize } = this.props;

    if (headerSize) headerSize(headerLayout);
    this.setState({ headerLayout });
  };

  scrollPosition = (value: number): number => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderHeader = (user: DetailsData): ReactElement => {
    const { backgroundColor, leftTopIconOnPress, rightTopIconOnPress, leftTopIcon, rightTopIcon } =
      this.props;

    const opacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(60), this.scrollPosition(90)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.headerWrapper, { backgroundColor }]}>
        <View style={styles.headerMenu}>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={leftTopIconOnPress}>
            {/*@ts-ignore there is default value for that*/}
            <Image style={styles.icon} resizeMode="contain" source={leftTopIcon} />
          </TouchableOpacity>
          <Animated.View style={[styles.headerTitleContainer, { opacity }]}>
            <Text style={styles.headerTitle}>{user.label}</Text>
          </Animated.View>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={rightTopIconOnPress}>
            {/*@ts-ignore there is default value for that*/}

            <Image style={styles.icon} resizeMode="contain" source={rightTopIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderDetailsForeground = (user: DetailsData) => {
    const { labelColor } = user;
    const { image, title, tag, iconNumber } = this.props;
    const labelOpacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(19), this.scrollPosition(25)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });
    const titleOpacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(45), this.scrollPosition(55)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });
    const authorOpacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(55), this.scrollPosition(70)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.foreground}>
        <Animated.View style={[styles.foregroundTitle, { opacity: labelOpacity, labelColor }]}>
          <Text style={styles.foregroundText}>{tag}</Text>
        </Animated.View>
        <Animated.View style={[styles.messageContainer, { opacity: titleOpacity }]}>
          <Text numberOfLines={3} style={styles.message}>
            {title}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.infoContainer, { opacity: authorOpacity }]}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/cards_black.png')} style={styles.icon} />
            <Text style={styles.number}>{iconNumber}</Text>
          </View>
          <View style={styles.footerContainer}>
            {/*@ts-ignore there is default value for that*/}
            <Image source={image} style={styles.authorPhoto} resizeMode="contain" />
            <Text numberOfLines={1} style={styles.authorName}>
              {user.author}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  renderForeground = (user: DetailsData) => {
    const { foreground } = this.props;

    return foreground?.() ?? this.renderDetailsForeground(user);
  };

  renderBackground = () => {
    const { hasBorderRadius, backgroundColor } = this.props;
    const {
      headerLayout: { height },
    } = this.state;
    const headerBorderRadius =
      hasBorderRadius &&
      this.scrollY.y.interpolate({
        inputRange: [0, height],
        outputRange: [80, 0],
        extrapolate: 'extend',
      });

    return (
      <Animated.View
        style={[
          styles.background,
          {
            borderBottomRightRadius: headerBorderRadius,
            backgroundColor,
          },
        ]}
      />
    );
  };

  render() {
    const user = Brandon;
    const {
      backgroundColor,
      backgroundImage,
      renderBody,
      children,
      headerHeight,
      snapToEdge,
      bounces,
      parallaxHeight,
      transparentHeader,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      scrollRef,
      contentContainerStyles,
      keyboardShouldPersistTaps,
      refreshControl,
    } = this.props;

    if (renderBody) {
      console.warn('Warning: renderBody prop is deprecated. Please use children instead');
    }

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor} translucent />
        <StickyParallaxHeader
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
          })}
          background={this.renderBackground()}
          backgroundImage={backgroundImage}
          bounces={bounces}
          contentContainerStyles={contentContainerStyles}
          foreground={this.renderForeground(user)}
          header={this.renderHeader(user)}
          headerHeight={headerHeight}
          headerSize={this.setHeaderSize}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          parallaxHeight={parallaxHeight}
          refreshControl={refreshControl}
          scrollRef={scrollRef}
          snapToEdge={snapToEdge}
          transparentHeader={transparentHeader}>
          {renderBody ? renderBody() : children}
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
    headerHeight: sizes.cardScreenHeaderHeight,
    backgroundImage: null,
    tag: Brandon.type,
    title: Brandon.label,
    // default is used remember to check before removing
    image: Brandon.image,
    children: renderContent(Brandon),
    bounces: true,
    snapToEdge: true,
    hasBorderRadius: true,
    iconNumber: Brandon.cardsAmount,
    parallaxHeight: sizes.cardScreenParallaxHeader,
    transparentHeader: false,
    headerSize: undefined,
    scrollRef: null,
    onMomentumScrollEnd: undefined,
    onMomentumScrollBegin: undefined,
  };
}

export default DetailsHeader;
