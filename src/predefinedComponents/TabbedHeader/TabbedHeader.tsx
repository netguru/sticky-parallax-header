import React from 'react';
import {
  Animated,
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import StickyParallaxHeader, {
  StickyParallaxHeaderProps,
} from '../../StickyParallaxHeaderComponent';
import { constants, colors, sizes } from '../../constants';
import styles from './TabbedHeader.styles';
import type { SharedPredefinedHeaderProps } from '../../index';

const { event, ValueXY } = Animated;

export interface TabbedHeaderProps extends SharedPredefinedHeaderProps {
  foregroundImage?: ImageSourcePropType;
  header?: () => StickyParallaxHeaderProps['header'];
  headerType: 'TabbedHeader';
  logo: ImageSourcePropType;
  logoContainerStyle?: StyleProp<ViewStyle>;
  logoResizeMode?: ImageProps['resizeMode'];
  logoStyle?: StyleProp<ImageStyle>;
  onChangeTab?: StickyParallaxHeaderProps['onChangeTab'];
  onRef?: StickyParallaxHeaderProps['onRef'];
  rememberTabScrollPosition?: StickyParallaxHeaderProps['rememberTabScrollPosition'];
  tabTextActiveStyle?: StickyParallaxHeaderProps['tabTextActiveStyle'];
  tabTextContainerActiveStyle?: StickyParallaxHeaderProps['tabTextContainerActiveStyle'];
  tabTextContainerStyle?: StickyParallaxHeaderProps['tabTextContainerStyle'];
  tabTextStyle?: StickyParallaxHeaderProps['tabTextStyle'];
  tabWrapperStyle?: StickyParallaxHeaderProps['tabWrapperStyle'];
  tabs: StickyParallaxHeaderProps['tabs'];
  tabsContainerBackgroundColor?: string;
  initialPage?: StickyParallaxHeaderProps['initialPage'];
  tabUnderlineColor?: StickyParallaxHeaderProps['tabUnderlineColor'];
  tabsContainerStyle?: StickyParallaxHeaderProps['tabsContainerStyle'];
  tabsContainerHorizontalPadding?: StickyParallaxHeaderProps['tabsContainerHorizontalPadding'];
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  horizontalSwipe?: boolean;
}

type State = {
  contentHeight: {};
  headerLayout: {
    height: number;
  };
};

class TabbedHeader extends React.Component<TabbedHeaderProps, State> {
  scrollY: Animated.ValueXY;

  _value: number = 0;

  constructor(props: TabbedHeaderProps) {
    super(props);

    this.state = {
      contentHeight: {},
      headerLayout: {
        height: 0,
      },
    };
    this.scrollY = new ValueXY();
  }

  componentDidMount() {
    this.scrollY.y.addListener(({ value }) => (this._value = value));
  }

  componentWillUnmount() {
    this.scrollY.y.removeAllListeners();
  }

  setHeaderSize = (headerLayout: LayoutRectangle) => {
    const { headerSize } = this.props;

    headerSize?.(headerLayout);

    this.setState({ headerLayout });
  };

  scrollPosition = (value: number): number => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderLogoHeader = (): StickyParallaxHeaderProps['header'] => {
    const { backgroundColor, logo, logoResizeMode, logoStyle, logoContainerStyle } = this.props;

    return (
      <View style={[styles.headerWrapper, logoContainerStyle, { backgroundColor }]}>
        <Image resizeMode={logoResizeMode} source={logo} style={[styles.logo, logoStyle]} />
      </View>
    );
  };

  renderHeader = () => {
    const { header } = this.props;

    return header?.() ?? this.renderLogoHeader();
  };

  renderTabbedForeground = (scrollY: Animated.ValueXY) => {
    const { title, titleStyle, foregroundImage } = this.props;
    const messageStyle = [styles.message, titleStyle];

    const startSize = constants.responsiveWidth(18);
    const endSize = constants.responsiveWidth(10);
    const [startImgFade, finishImgFade] = [this.scrollPosition(22), this.scrollPosition(27)];
    const [startImgSize, finishImgSize] = [this.scrollPosition(20), this.scrollPosition(30)];
    const [startTitleFade, finishTitleFade] = [this.scrollPosition(25), this.scrollPosition(45)];

    const imageOpacity = scrollY.y.interpolate({
      inputRange: [0, startImgFade, finishImgFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageSize = scrollY.y.interpolate({
      inputRange: [0, startImgSize, finishImgSize],
      outputRange: [startSize, startSize, endSize],
      extrapolate: 'clamp',
    });
    const titleOpacity = scrollY.y.interpolate({
      inputRange: [0, startTitleFade, finishTitleFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const renderImage = () => {
      if (foregroundImage) {
        return (
          <Animated.View style={{ opacity: imageOpacity }}>
            <Animated.Image
              source={foregroundImage}
              style={[styles.profilePic, { width: imageSize, height: imageSize }]}
            />
          </Animated.View>
        );
      }

      return null;
    };

    return (
      <View style={styles.foreground}>
        {renderImage()}
        <Animated.View style={[styles.messageContainer, { opacity: titleOpacity }]}>
          <Text style={messageStyle}>{title}</Text>
        </Animated.View>
      </View>
    );
  };

  renderForeground = (scrollY: Animated.ValueXY) => {
    return this.renderTabbedForeground(scrollY);
  };

  render() {
    const {
      backgroundColor,
      backgroundImage,
      bounces,
      contentContainerStyles,
      headerHeight,
      initialPage,
      keyboardShouldPersistTaps,
      onChangeTab,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onRef,
      parallaxHeight,
      refreshControl,
      rememberTabScrollPosition,
      scrollEvent,
      scrollRef,
      snapStartThreshold,
      snapStopThreshold,
      snapToEdge,
      snapValue,
      tabTextActiveStyle,
      tabTextContainerActiveStyle,
      tabTextContainerStyle,
      tabTextStyle,
      tabWrapperStyle,
      tabs,
      tabsContainerBackgroundColor,
      tabsContainerStyle,
      tabUnderlineColor,
      tabsContainerHorizontalPadding,
      horizontalScrollBounces,
      horizontalSwipe
    } = this.props;

    const tabsContainerBgColor = tabsContainerBackgroundColor ?? backgroundColor;

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor} translucent />
        <StickyParallaxHeader
          tabUnderlineColor={tabUnderlineColor}
          horizontalSwipe={horizontalSwipe}
          backgroundImage={backgroundImage}
          bounces={bounces}
          contentContainerStyles={contentContainerStyles}
          foreground={this.renderForeground(this.scrollY)}
          header={this.renderHeader()}
          headerHeight={headerHeight}
          headerSize={this.setHeaderSize}
          initialPage={initialPage}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onChangeTab={onChangeTab}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onRef={onRef}
          parallaxHeight={parallaxHeight}
          refreshControl={refreshControl}
          rememberTabScrollPosition={rememberTabScrollPosition}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
            listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => scrollEvent?.(e),
          })}
          scrollRef={scrollRef}
          snapStartThreshold={snapStartThreshold}
          snapStopThreshold={snapStopThreshold}
          snapToEdge={snapToEdge}
          snapValue={snapValue}
          tabTextActiveStyle={[styles.tabText, tabTextActiveStyle]}
          tabTextContainerActiveStyle={[
            styles.tabTextContainerActiveStyle,
            tabTextContainerActiveStyle,
          ]}
          tabTextContainerStyle={[styles.tabTextContainerStyle, tabTextContainerStyle]}
          tabTextStyle={[styles.tabText, tabTextStyle]}
          tabWrapperStyle={[styles.tabsWrapper, tabWrapperStyle]}
          tabs={tabs}
          tabsContainerBackgroundColor={tabsContainerBgColor}
          tabsContainerStyle={tabsContainerStyle}
          tabsContainerHorizontalPadding={tabsContainerHorizontalPadding}
          horizontalScrollBounces={horizontalScrollBounces}
        />
      </>
    );
  }

  static defaultProps = {
    initialPage: 0,
    backgroundColor: colors.primaryGreen,
    bounces: true,
    headerHeight: sizes.headerHeight,
    logoResizeMode: 'contain',
    parallaxHeight: sizes.homeScreenParallaxHeader,
    snapToEdge: true,
    transparentHeader: true,
  };
}

export default TabbedHeader;
