import React from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { bool, number, func, string } from 'prop-types';
import StickyParallaxHeader from '../../index';
import { constants, sizes } from '../../constants';
import { Brandon } from '../../assets/data/cards';
import styles from './DetailsHeader.styles';
import { renderContent } from './defaultProps/defaultProps';

const { event, ValueXY } = Animated;
class DetailsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLayout: {
        height: 0,
      },
    };

    this.scrollY = new ValueXY();
  }

  setHeaderSize = (headerLayout) => this.setState({ headerLayout });

  scrollPosition = (value) => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderHeader = (user) => {
    const {
      backgroundColor,
      leftTopIconOnPress,
      rightTopIconOnPress,
      leftTopIcon,
      rightTopIcon,
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
            <Image style={styles.icon} resizeMode="contain" source={leftTopIcon} />
          </TouchableOpacity>
          <Animated.View style={[styles.headerTitleContainer, { opacity }]}>
            <Text style={styles.headerTitle}>{user.label}</Text>
          </Animated.View>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={rightTopIconOnPress}>
            <Image style={styles.icon} resizeMode="contain" source={rightTopIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderForeground = (user) => {
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
            <Image source={image} style={styles.authorPhoto} resizeMode="contain" />
            <Text numberOfLines={1} style={styles.authorName}>
              {user.author}
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
      headerHeight,
      snapToEdge,
      bounces,
    } = this.props;

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor} translucent />
        <StickyParallaxHeader
          foreground={this.renderForeground(user)}
          header={this.renderHeader(user)}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.cardScreenParallaxHeader}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
          })}
          headerSize={this.setHeaderSize}
          headerHeight={headerHeight}
          background={this.renderBackground(user)}
          snapToEdge={snapToEdge}
          bounces={bounces}
          backgroundImage={backgroundImage}>
          {renderBody(user)}
        </StickyParallaxHeader>
      </>
    );
  }
}

DetailsHeader.propTypes = {
  leftTopIconOnPress: func,
  rightTopIconOnPress: func,
  leftTopIcon: number,
  rightTopIcon: number,
  backgroundColor: string,
  headerHeight: number,
  backgroundImage: Image.propTypes.source,
  title: string,
  tag: string,
  image: Image.propTypes.source,
  renderBody: func,
  bounces: bool,
  snapToEdge: bool,
  hasBorderRadius: bool,
  iconNumber: number,
};
DetailsHeader.defaultProps = {
  leftTopIconOnPress: () => {},
  rightTopIconOnPress: () => {},
  leftTopIcon: require('../../assets/icons/iconCloseWhite.png'),
  rightTopIcon: require('../../assets/icons/Icon-Menu.png'),
  backgroundColor: Brandon.color,
  headerHeight: sizes.cardScreenHeaderHeight,
  backgroundImage: null,
  tag: Brandon.type,
  title: Brandon.label,
  image: Brandon.image,
  renderBody: renderContent,
  bounces: true,
  snapToEdge: true,
  hasBorderRadius: true,
  iconNumber: Brandon.cardsAmount,
};

export default DetailsHeader;
