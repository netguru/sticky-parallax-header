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
  StickyParallaxHeaderProps,
} from '../../StickyParallaxHeaderComponent';
import { constants, sizes, colors } from '../../constants';
import styles from './DetailsHeader.styles';
import type { IconProps, RenderBody, SharedPredefinedHeaderProps } from '../../index';
import IconRenderer from '../../components/IconRenderer/IconRenderer';

const { event, ValueXY } = Animated;

export interface DetailsHeaderProps extends IconProps, SharedPredefinedHeaderProps, RenderBody {
  headerType: 'DetailsHeader';
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
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

  renderHeader = (): ReactElement => {
    const {
      backgroundColor,
      leftTopIconOnPress,
      rightTopIconOnPress,
      leftTopIcon,
      rightTopIcon,
      title,
    } = this.props;

    const opacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(60), this.scrollPosition(90)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.headerWrapper, { backgroundColor }]}>
        <View style={styles.headerMenu}>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={leftTopIconOnPress}>
            <IconRenderer icon={leftTopIcon} />
          </TouchableOpacity>
          <Animated.View style={[styles.headerTitleContainer, { opacity }]}>
            <Text style={styles.headerTitle}>{title}</Text>
          </Animated.View>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={rightTopIconOnPress}>
            <IconRenderer icon={rightTopIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderDetailsForeground = () => {
    const { image, title, tag, contentIconNumber, contentIcon } = this.props;
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
        <Animated.View
          style={[
            styles.foregroundTitle,
            { opacity: labelOpacity, backgroundColor: colors.whiteTransparent10 },
          ]}>
          <Text style={styles.foregroundText}>{tag}</Text>
        </Animated.View>
        <Animated.View style={[styles.messageContainer, { opacity: titleOpacity }]}>
          <Text numberOfLines={3} style={styles.message}>
            {title}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.infoContainer, { opacity: authorOpacity }]}>
          <View style={styles.iconContainer}>
            {contentIcon && <Image source={contentIcon} style={styles.icon} />}
            <Text style={styles.number}>{contentIconNumber}</Text>
          </View>
          <View style={styles.footerContainer}>
            {image && <Image source={image} style={styles.authorPhoto} resizeMode="contain" />}
            <Text numberOfLines={1} style={styles.authorName}>
              {title}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  renderBackground = () => {
    const { hasBorderRadius, backgroundColor } = this.props;
    const {
      headerLayout: { height },
    } = this.state;
    const headerBorderRadius = hasBorderRadius
      ? this.scrollY.y.interpolate({
          inputRange: [0, height],
          outputRange: [80, 0],
          extrapolate: 'extend',
        })
      : 0;

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
    const {
      backgroundColor,
      backgroundImage,
      children,
      headerHeight,
      snapToEdge,
      bounces,
      parallaxHeight,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      scrollRef,
      contentContainerStyles,
      keyboardShouldPersistTaps,
      refreshControl,
      horizontalScrollBounces,
      horizontalSwipe
    } = this.props;

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
          horizontalSwipe={horizontalSwipe}
          contentContainerStyles={contentContainerStyles}
          foreground={this.renderDetailsForeground()}
          header={this.renderHeader()}
          headerHeight={headerHeight}
          headerSize={this.setHeaderSize}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          parallaxHeight={parallaxHeight}
          refreshControl={refreshControl}
          scrollRef={scrollRef}
          snapToEdge={snapToEdge}
          horizontalScrollBounces={horizontalScrollBounces}
          transparentHeader={false}>
          {children}
        </StickyParallaxHeader>
      </>
    );
  }

  static defaultProps = {
    headerHeight: sizes.cardScreenHeaderHeight,
    bounces: true,
    snapToEdge: true,
    hasBorderRadius: true,
    parallaxHeight: sizes.cardScreenParallaxHeader,
    headerSize: undefined,
    scrollRef: null,
  };
}

export default DetailsHeader;
