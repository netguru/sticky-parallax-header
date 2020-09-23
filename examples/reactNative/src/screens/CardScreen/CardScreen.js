import React from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, Animated, FlatList } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { withNavigation } from 'react-navigation';
import { constants, sizes, colors } from '../../constants';
import { QuizCard } from '../../components';
import styles from './CardScreen.styles';

const { event, ValueXY } = Animated;
class CardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLayout: {
        height: 0,
      },
      topReached: true,
      endReached: false,
      stickyHeaderEndReached: false,
      stickyHeaderTopReached: true,
    };

    this.scrollY = new ValueXY();
  }

  setHeaderSize = (headerLayout) => this.setState({ headerLayout });

  scrollPosition = (value) => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderHeader = (user) => {
    const opacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(60), this.scrollPosition(90)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const { navigation } = this.props;

    return (
      <View style={[styles.headerWrapper, { backgroundColor: user.color }]}>
        <View style={styles.headerMenu}>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={() => navigation.goBack()}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require('../../assets/icons/Icon-Arrow.png')}
            />
          </TouchableOpacity>
          <Animated.View style={[styles.headerTitleContainer, { opacity }]}>
            <Text style={styles.headerTitle}>{user.label}</Text>
          </Animated.View>
        </View>
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require('../../assets/icons/Icon-Menu.png')}
        />
      </View>
    );
  };

  renderForeground = (user) => {
    const { cardsAmount, labelColor } = user;
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
          style={[styles.foregroundTitle, { opacity: labelOpacity, backgroundColor: labelColor }]}>
          <Text style={styles.foregroundText}>{user.type}</Text>
        </Animated.View>
        <Animated.View style={[styles.messageContainer, { opacity: titleOpacity }]}>
          <Text style={styles.message}>{user.label}</Text>
        </Animated.View>
        <Animated.View style={[styles.infoContainer, { opacity: authorOpacity }]}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/cards_black.png')} style={styles.icon} />
            <Text style={styles.number}>{cardsAmount}</Text>
          </View>
          <View style={styles.footerContainer}>
            <Image source={user.image} style={styles.authorPhoto} resizeMode="contain" />
            <Text style={styles.authorName}>{user.author}</Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  renderBackground = (user) => {
    const {
      headerLayout: { height },
    } = this.state;
    const headerBorderRadius = this.scrollY.y.interpolate({
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
            backgroundColor: user.color,
          },
        ]}
      />
    );
  };

  shouldBeEnabled = () => {
    const { endReached, stickyHeaderEndReached, topReached, stickyHeaderTopReached } = this.state;
    const bottomCondition = endReached && stickyHeaderEndReached;
    const topCondition = topReached && stickyHeaderTopReached;

    return bottomCondition || !topCondition;
  };

  onScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      this.setState({ endReached: true, topReached: false });
    }

    if (contentOffset.y <= 0) {
      this.setState({ topReached: true, endReached: false, stickyHeaderTopReached: true });
    }
  };

  renderFlatlistContent = (user) => (
    <View style={styles.flatlistContainer}>
      <FlatList
        data={user.cards}
        renderItem={({ item, index }) => (
          <QuizCard data={item} num={index} key={item.question} cardsAmount={100} />
        )}
        onScroll={this.onScroll}
        scrollEnabled={constants.isAndroid ? true : this.shouldBeEnabled()}
        nestedScrollEnabled
      />
    </View>
  );

  renderContent = (user) => (
    <View style={styles.content}>
      {user.cards.map((data, i, arr) => (
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      ))}
    </View>
  );

  stickyHeaderEndReached = () => {
    this.setState({
      stickyHeaderEndReached: true,
      stickyHeaderTopReached: false,
    });
  };

  stickyHeaderTopReached = () => {
    this.setState({
      stickyHeaderTopReached: true,
      stickyHeaderEndReached: false,
    });
  };

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', {});

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={colors.transparent} translucent />
        <StickyParallaxHeader
          foreground={this.renderForeground(user)}
          header={this.renderHeader(user)}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.cardScreenParallaxHeader}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
          })}
          headerSize={this.setHeaderSize}
          headerHeight={sizes.cardScreenHeaderHeight}
          background={this.renderBackground(user)}
          onEndReached={this.stickyHeaderEndReached}
          onTopReached={this.stickyHeaderTopReached}>
          {/* {this.renderContent(user)} */}
          {this.renderFlatlistContent(user)}
        </StickyParallaxHeader>
      </>
    );
  }
}

export default withNavigation(CardScreen);
