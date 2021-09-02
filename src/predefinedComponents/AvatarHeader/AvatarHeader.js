import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  StatusBar,
  ViewPropTypes,
  ScrollView,
} from 'react-native';
import {
  func,
  string,
  number,
  bool,
  oneOfType,
  oneOf,
  instanceOf,
  element,
  shape,
  node,
} from 'prop-types';
import StickyParallaxHeader from '../../StickyParallaxHeader';
import { constants, sizes } from '../../constants';
import styles from './AvatarHeader.styles';
import { Brandon } from '../../assets/data/cards';
import RenderContent from './defaultProps/defaultProps';

const { event, ValueXY } = Animated;

const finishImgPosition = 31;
const startImgPosition = 27;

class AvatarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLayout: {
        height: 0,
      },
    };
    this.scrollY = new ValueXY();
  }

  setHeaderSize = (headerLayout) => {
    const { headerSize } = this.props;
    if (headerSize) headerSize(headerLayout);
    this.setState({ headerLayout });
  };

  scrollPosition(value) {
    const {
      headerLayout: { height },
    } = this.state;

    return constants.scrollPosition(height, value);
  }

  renderAvatarHeader = () => {
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
            <Image style={styles.icon} resizeMode="contain" source={leftTopIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Animated.Image source={image} style={[styles.headerPic, { opacity: imageOpacity }]} />
            <Animated.Text numberOfLines={1} style={[styles.headerTitle, { opacity: nameOpacity }]}>
              {title}
            </Animated.Text>
          </View>
          <TouchableOpacity
            hitSlop={sizes.hitSlop}
            onPress={rightTopIconOnPress}
            style={styles.rightHeaderButton}>
            <Image style={styles.icon} resizeMode="contain" source={rightTopIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderHeader = () => {
    const { header } = this.props;
    const renderHeader = header || this.renderAvatarHeader;

    return renderHeader();
  };

  renderAvatarForeground = () => {
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

  renderForeground = () => {
    const { foreground } = this.props;
    const renderForeground = foreground || this.renderAvatarForeground;

    return renderForeground();
  };

  renderBackground = () => {
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
          contentContainerStyles={contentContainerStyles}
          foreground={this.renderForeground()}
          header={this.renderHeader()}
          deviceWidth={constants.deviceWidth}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
            listener: (e) => scrollEvent && scrollEvent(e),
          })}
          headerSize={this.setHeaderSize}
          headerHeight={headerHeight}
          background={this.renderBackground()}
          backgroundImage={backgroundImage}
          bounces={bounces}
          snapToEdge={snapToEdge}
          parallaxHeight={parallaxHeight}
          transparentHeader={transparentHeader}
          snapStartThreshold={snapStartThreshold}
          snapStopThreshold={snapStopThreshold}
          snapValue={snapValue}
          scrollRef={scrollRef}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          refreshControl={refreshControl}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onMomentumScrollBegin={onMomentumScrollBegin}>
          {renderBody ? renderBody() : children}
        </StickyParallaxHeader>
      </>
    );
  }
}

AvatarHeader.propTypes = {
  hasBorderRadius: bool,
  bounces: bool,
  snapToEdge: bool,
  leftTopIconOnPress: func,
  rightTopIconOnPress: func,
  leftTopIcon: Image.propTypes.source,
  rightTopIcon: Image.propTypes.source,
  backgroundColor: string,
  headerHeight: number,
  backgroundImage: Image.propTypes.source,
  contentContainerStyles: ViewPropTypes.style,
  title: string,
  subtitle: string,
  image: Image.propTypes.source,
  children: node,
  renderBody: func,
  scrollEvent: func,
  parallaxHeight: number,
  foreground: func,
  header: func,
  snapStartThreshold: oneOfType([bool, number]),
  snapStopThreshold: oneOfType([bool, number]),
  snapValue: oneOfType([bool, number]),
  transparentHeader: bool,
  scrollRef: oneOfType([func, shape({ current: instanceOf(ScrollView) })]),
  keyboardShouldPersistTaps: oneOf(['never', 'always', 'handled', false, true, undefined]),
  refreshControl: element,
  headerSize: func,
  onMomentumScrollEnd: func,
  onMomentumScrollBegin: func,
};
AvatarHeader.defaultProps = {
  leftTopIconOnPress: () => {},
  rightTopIconOnPress: () => {},
  leftTopIcon: require('../../assets/icons/iconCloseWhite.png'),
  rightTopIcon: require('../../assets/icons/Icon-Menu.png'),
  backgroundColor: Brandon.color,
  headerHeight: sizes.userModalHeaderHeight,
  backgroundImage: null,
  contentContainerStyles: {},
  title: Brandon.author,
  subtitle: Brandon.about,
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

export default AvatarHeader;
