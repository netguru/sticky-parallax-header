import React from 'react'
import { Text, View, Image, TouchableOpacity, StatusBar, Animated } from 'react-native'
import StickyParallaxHeader from '../../index'
import { constants, sizes, colors } from '../../constants'
import { QuizCard } from '../components'
import { Brandon } from '../../assets/data/cards'
import styles from './DetailsHeader.styles'

const { event, ValueXY } = Animated
class DetailsHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headerLayout: {
        height: 0
      }
    }

    this.scrollY = new ValueXY()
  }

  setHeaderSize = headerLayout => this.setState({ headerLayout })

  scrollPosition = (value) => {
    const { headerLayout } = this.state

    return constants.scrollPosition(headerLayout.height, value)
  }

  renderHeader = (user) => {
    const opacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(60), this.scrollPosition(90)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    return (
      <View
        style={[styles.headerWrapper, styles.cardScreenHeader, { backgroundColor: user.color }]}
      >
        <View style={styles.headerMenu}>
          <TouchableOpacity hitSlop={sizes.hitSlop}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require('../../assets/icons/Icon-Arrow.png')}
            />
          </TouchableOpacity>
          <Animated.View style={[styles.headerTitleContainer, { opacity }]}>
            <Text style={styles.headerTitle}>Design System</Text>
          </Animated.View>
        </View>
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require('../../assets/icons/Icon-Menu.png')}
        />
      </View>
    )
  }

  renderForeground = (user) => {
    const { cardsAmount, labelColor } = user
    const labelOpacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(19), this.scrollPosition(25)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp'
    })
    const titleOpacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(45), this.scrollPosition(55)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp'
    })
    const authorOpacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(55), this.scrollPosition(70)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.foreground}>
        <Animated.View style={[styles.foregroundTitle, { opacity: labelOpacity, labelColor }]}>
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
    )
  }

  renderBackground = (user) => {
    const {
      headerLayout: { height }
    } = this.state
    const headerBorderRadius = this.scrollY.y.interpolate({
      inputRange: [0, height],
      outputRange: [80, 0],
      extrapolate: 'extend'
    })

    return (
      <Animated.View
        style={[
          styles.background,
          {
            borderBottomRightRadius: headerBorderRadius,
            backgroundColor: user.color
          }
        ]}
      />
    )
  }

  renderContent = user => (
    <View style={styles.content}>
      {user.cards.map((data, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <QuizCard data={data} num={i} key={data.question} />
      ))}
    </View>
  )

  render() {
    const user = Brandon

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor={colors.transparent} translucent />
        <StickyParallaxHeader
          foreground={this.renderForeground(user)}
          header={this.renderHeader(user)}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.cardScreenParallaxHeader}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }])}
          headerSize={this.setHeaderSize}
          headerHeight={sizes.cardScreenHeaderHeight}
          background={this.renderBackground(user)}
        >
          {this.renderContent(user)}
        </StickyParallaxHeader>
      </React.Fragment>
    )
  }
}

export default DetailsHeader
