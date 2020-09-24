import React from 'react';
import { Text, View, Image, TouchableOpacity, Animated, StatusBar, Platform } from 'react-native';
import { func, shape, string, oneOfType, object, array, number } from 'prop-types';
import StickyParallaxHeader from '../../../StickyParallaxHeader';
import { constants, sizes } from '../../../constants';
import styles from './UserModal.styles';
import QuizListElement from '../QuizListElement/QuizListElement';
import { Brandon } from '../../../assets/data/cards';

const { event, ValueXY } = Animated;

class UserModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLayout: {
        height: 0,
      },
      contentHeight: 0,
    };
    this.scrollY = new ValueXY();
  }

  setHeaderSize = (headerLayout) => this.setState({ headerLayout });

  renderHeader = () => {
    const { onPressCloseModal, user } = this.props;

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
      <View style={[styles.headerWrapper, styles.userModalHeader, { backgroundColor: user.color }]}>
        <TouchableOpacity hitSlop={sizes.hitSlop} onPress={onPressCloseModal}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../../../assets/icons/iconCloseWhite.png')}
          />
        </TouchableOpacity>
        <View style={styles.headerMenu}>
          <View style={styles.headerTitleContainer}>
            <Animated.Image
              source={user.image}
              style={[styles.headerPic, { opacity: imageOpacity }]}
            />
            <Animated.Text style={[styles.headerTitle, { opacity: nameOpacity }]}>
              {user.author}
            </Animated.Text>
          </View>
        </View>
        <TouchableOpacity hitSlop={sizes.hitSlop}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../../../assets/icons/Icon-Menu.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderForeground = () => {
    const { user } = this.props;
    const startSize = constants.responsiveWidth(18);
    const endSize = constants.responsiveWidth(12);

    const [startImgAnimation, finishImgAnimation] = [
      this.scrollPosition(27),
      this.scrollPosition(31),
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
            source={user.image}
            style={[styles.profilePic, { width: imageSize, height: imageSize }]}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.messageContainer,
            styles.userModalMessageContainer,
            { opacity: authorOpacity },
          ]}>
          <Text style={styles.message}>{user.author}</Text>
        </Animated.View>
        <Animated.View style={[styles.infoContainer, { opacity: aboutOpacity }]}>
          <Text style={styles.infoText}>{user.about}</Text>
        </Animated.View>
      </View>
    );
  };

  renderBackground = () => {
    const {
      headerLayout: { height },
    } = this.state;
    const headerBorderRadius = this.scrollY.y.interpolate({
      inputRange: [0, height],
      outputRange: [80, 0],
      extrapolate: 'extend',
    });

    const { user } = this.props;

    return (
      <Animated.View
        style={[
          styles.background,
          {
            borderBottomRightRadius: headerBorderRadius,
            backgroundColor: user.color,
          },
        ]}
      />
    );
  };

  calcMargin = () => {
    const { contentHeight } = this.state;
    let marginBottom = 0;

    if (contentHeight) {
      const isBigContent = constants.deviceHeight - contentHeight < 0;

      if (isBigContent) {
        return marginBottom;
      }

      marginBottom = constants.deviceHeight - sizes.headerHeight - contentHeight;

      return marginBottom;
    }

    return marginBottom;
  };

  onLayoutContent = (e) => {
    this.setState({
      contentHeight: e.nativeEvent.layout.height,
    });
  };

  scrollPosition(value) {
    const {
      headerLayout: { height },
    } = this.state;

    return constants.scrollPosition(height, value);
  }

  renderContent = () => {
    const marginBottom = Platform.select({ ios: this.calcMargin(), android: 0 });
    const user = Brandon;
    const title = "Author's Quizes";
    const cards = [
      {
        id: '4850294857',
        elements: user.cardsAmount,
        authorName: user.author,
        mainText: user.label,
        labelText: user.type,
        imageSource: user.image,
      },
    ];

    return (
      <View
        onLayout={this.onLayoutContent}
        style={[
          styles.content,
          {
            marginBottom,
            paddingBottom: sizes.userScreenParallaxHeader,
          },
        ]}>
        <Text style={styles.contentText}>{title}</Text>
        {cards.map((card) => (
          <QuizListElement
            key={card.id}
            elements={card.elements}
            authorName={card.authorName}
            mainText={card.mainText}
            labelText={card.labelText}
            imageSource={card.imageSource}
            onPress={() => {}}
          />
        ))}
      </View>
    );
  };

  render() {
    const { user } = this.props;

    return (
      <>
        <StatusBar backgroundColor={user.color} barStyle="light-content" />
        <StickyParallaxHeader
          foreground={this.renderForeground()}
          header={this.renderHeader()}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.userScreenParallaxHeader}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
          })}
          headerSize={this.setHeaderSize}
          headerHeight={sizes.userModalHeaderHeight}
          background={this.renderBackground()}>
          {this.renderContent()}
        </StickyParallaxHeader>
      </>
    );
  }
}

UserModal.propTypes = {
  onPressCloseModal: func,
  user: shape({
    author: string,
    about: string,
    image: oneOfType([object, array, func, number]),
  }),
};

export default UserModal;
