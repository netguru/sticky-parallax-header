import React from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  Animated,
  LayoutRectangle,
  ImageSourcePropType,
  ImageProps,
  ImageStyle,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import StickyParallaxHeader, {
  StickyParallaxHeaderProps,
} from '../../StickyParallaxHeaderComponent';
import { constants, colors, sizes } from '../../constants';
import styles from './TabbedHeader.styles';
import RenderContent from './defaultProps/defaultProps';
import type { RenderBody, SharedPredefinedHeaderProps } from '../../index';

const { event, ValueXY } = Animated;

export type TabbedHeaderProps = RenderBody &
  SharedPredefinedHeaderProps & {
    headerType: 'TabbedHeader';
    foregroundImage?: ImageSourcePropType;
    header?: () => StickyParallaxHeaderProps['header'];
    logo?: ImageSourcePropType;
    logoContainerStyle?: ViewStyle;
    logoResizeMode?: ImageProps['resizeMode'];
    logoStyle?: ImageStyle;
    onRef?: StickyParallaxHeaderProps['onRef'];
    rememberTabScrollPosition?: StickyParallaxHeaderProps['rememberTabScrollPosition'];
    tabTextActiveStyle?: StickyParallaxHeaderProps['tabTextActiveStyle'];
    tabTextContainerActiveStyle?: StickyParallaxHeaderProps['tabTextContainerActiveStyle'];
    tabTextContainerStyle?: StickyParallaxHeaderProps['tabTextContainerStyle'];
    tabTextStyle?: StickyParallaxHeaderProps['tabTextStyle'];
    tabWrapperStyle?: StickyParallaxHeaderProps['tabWrapperStyle'];
    tabs: StickyParallaxHeaderProps['tabs'];
    tabsContainerStyle?: StickyParallaxHeaderProps['tabsContainerStyle'];
    title?: string;
    titleStyle?: TextStyle;
  };
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

    if (headerSize) headerSize(headerLayout);
    this.setState({ headerLayout });
  };

  scrollPosition = (value: number): number => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderLogoHeader = (): StickyParallaxHeaderProps['header'] => {
    const { backgroundColor, logo, logoResizeMode, logoStyle, logoContainerStyle } = this.props;

    return (
      <View style={[logoContainerStyle, { backgroundColor }]}>
        {/*@ts-ignore There is default value for that*/}
        <Image resizeMode={logoResizeMode} source={logo} style={logoStyle} />
      </View>
    );
  };

  renderHeader = () => {
    const { header } = this.props;

    return header?.() ?? this.renderLogoHeader();
  };

  renderTabbedForeground = (scrollY: Animated.ValueXY) => {
    const { title, titleStyle, foregroundImage } = this.props;
    const messageStyle = titleStyle || styles.message;
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
      const logo =
        foregroundImage === undefined
          ? require('../../assets/images/photosPortraitMe.png')
          : foregroundImage;

      if (foregroundImage !== null) {
        return (
          <Animated.View style={{ opacity: imageOpacity }}>
            <Animated.Image
              source={logo}
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
    const { foreground } = this.props;

    return foreground?.() ?? this.renderTabbedForeground(scrollY);
  };

  render() {
    const {
      tabs,
      headerHeight,
      backgroundColor,
      backgroundImage,
      bounces,
      snapToEdge,
      scrollEvent,
      renderBody,
      children,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabWrapperStyle,
      tabsContainerStyle,
      onRef,
      keyboardShouldPersistTaps,
      scrollRef,
      contentContainerStyles,
      refreshControl,
      rememberTabScrollPosition,
      parallaxHeight,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      snapStartThreshold,
      snapStopThreshold,
      snapValue,
      transparentHeader,
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
            listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => scrollEvent && scrollEvent(e),
          })}
          backgroundImage={backgroundImage}
          bounces={bounces}
          contentContainerStyles={contentContainerStyles}
          foreground={this.renderForeground(this.scrollY)}
          header={this.renderHeader()}
          headerHeight={headerHeight}
          headerSize={this.setHeaderSize}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onMomentumScrollBegin={onMomentumScrollBegin}>
          onMomentumScrollEnd={onMomentumScrollEnd}
          onRef={onRef}
          parallaxHeight={parallaxHeight}
          refreshControl={refreshControl}
          rememberTabScrollPosition={rememberTabScrollPosition}
          scrollRef={scrollRef}
          snapStartThreshold={snapStartThreshold}
          snapStopThreshold={snapStopThreshold}
          snapToEdge={snapToEdge}
          snapValue={snapValue}
          snapValue={snapValue}
          tabTextActiveStyle={tabTextActiveStyle}
          tabTextContainerActiveStyle={tabTextContainerActiveStyle}
          tabTextContainerStyle={tabTextContainerStyle}
          tabTextStyle={tabTextStyle}
          tabWrapperStyle={tabWrapperStyle}
          tabs={tabs}
          tabsContainerBackgroundColor={backgroundColor}
          tabsContainerStyle={tabsContainerStyle}
          transparentHeader={transparentHeader}
          {renderBody ? renderBody() : children}
        </StickyParallaxHeader>
      </>
    );
  }

  static defaultProps = {
    backgroundColor: colors.primaryGreen,
    headerHeight: sizes.headerHeight,
    backgroundImage: null,
    title: "Mornin' Mark! \nReady for a quiz?",
    bounces: true,
    snapToEdge: true,
    // Logo default is used remember to check before removing
    logo: require('../../assets/images/logo.png'),
    logoResizeMode: 'contain',
    logoStyle: styles.logo,
    logoContainerStyle: styles.headerWrapper,
    children: <RenderContent title="Popular Quizes" />,
    tabs: [
      {
        title: 'Popular',
        content: <RenderContent title="Popular Quizes" />,
      },
      {
        title: 'Product Design',
        content: <RenderContent title="Product Design" />,
      },
      {
        title: 'Development',
        content: <RenderContent title="Development" />,
      },
      {
        title: 'Project Management',
        content: <RenderContent title="Project Management" />,
      },
    ],
    tabTextStyle: styles.tabText,
    tabTextActiveStyle: styles.tabText,
    tabTextContainerStyle: styles.tabTextContainerStyle,
    tabTextContainerActiveStyle: styles.tabTextContainerActiveStyle,
    tabWrapperStyle: styles.tabsWrapper,
    contentContainerStyles: {},
    rememberTabScrollPosition: false,
    keyboardShouldPersistTaps: undefined,
    refreshControl: undefined,
    scrollRef: null,
    onRef: null,
    parallaxHeight: sizes.homeScreenParallaxHeader,
    headerSize: undefined,
    onMomentumScrollEnd: undefined,
    onMomentumScrollBegin: undefined,
    transparentHeader: true,
  };
}

export default TabbedHeader;
