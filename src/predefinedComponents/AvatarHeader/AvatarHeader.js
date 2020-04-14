import React from 'react'
import { Text, View, Image, TouchableOpacity, Animated, StatusBar } from 'react-native'
import { func, string, number, bool } from 'prop-types'
import StickyParallaxHeader from '../../index'
import { constants, sizes } from '../../constants'
import styles from './AvatarHeader.styles'
import { Brandon } from '../../assets/data/cards'
import RenderContent from './defaultProps/defaultProps'

const { event, ValueXY } = Animated

class AvatarHeader extends React.Component {
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

  scrollPosition(value) {
    const {
      headerLayout: { height }
    } = this.state

    return constants.scrollPosition(height, value)
  }

  renderHeader = () => {
    const {
      leftTopIconOnPress,
      leftTopIcon,
      rightTopIcon,
      rightTopIconOnPress,
      image,
      backgroundColor,
      title
    } = this.props

    const [beforeFadeImg, startFadeImg, finishFadeImg] = [
      this.scrollPosition(30),
      this.scrollPosition(40),
      this.scrollPosition(70)
    ]
    const [beforeFadeName, startFadeName, finishFadeName] = [
      this.scrollPosition(50),
      this.scrollPosition(60),
      this.scrollPosition(75)
    ]

    const imageOpacity = this.scrollY.y.interpolate({
      inputRange: [0, beforeFadeImg, startFadeImg, finishFadeImg],
      outputRange: [0, 0, 0.5, 1],
      extrapolate: 'clamp'
    })
    const nameOpacity = this.scrollY.y.interpolate({
      inputRange: [0, beforeFadeName, startFadeName, finishFadeName],
      outputRange: [0, 0, 0.5, 1],
      extrapolate: 'clamp'
    })

    return (
      <View style={[styles.headerWrapper, styles.userModalHeader, { backgroundColor }]}>
        <View style={styles.headerMenu}>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={leftTopIconOnPress} style={styles.leftHeaderButton}>
            <Image style={styles.icon} resizeMode="contain" source={leftTopIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Animated.Image source={image} style={[styles.headerPic, { opacity: imageOpacity }]} />
            <Animated.Text numberOfLines={1} style={[styles.headerTitle, { opacity: nameOpacity }]}>
              {title}
            </Animated.Text>
          </View>
          <TouchableOpacity hitSlop={sizes.hitSlop} onPress={rightTopIconOnPress} style={styles.rightHeaderBtn}>
            <Image style={styles.icon} resizeMode="contain" source={rightTopIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderForeground = () => {
    const { image, subtitle, title } = this.props
    const startSize = constants.responsiveWidth(18)
    const endSize = constants.responsiveWidth(12)

    const [startImgAnimation, finishImgAnimation] = [
      this.scrollPosition(27),
      this.scrollPosition(31)
    ]
    const [startAuthorFade, finishAuthorFade] = [this.scrollPosition(40), this.scrollPosition(50)]

    const [startAboutFade, fininshAboutFade] = [this.scrollPosition(60), this.scrollPosition(70)]

    const imageOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startImgAnimation, finishImgAnimation],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp'
    })
    const imageSize = this.scrollY.y.interpolate({
      inputRange: [0, startImgAnimation, finishImgAnimation],
      outputRange: [startSize, startSize, endSize],
      extrapolate: 'clamp'
    })
    const authorOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startAuthorFade, finishAuthorFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })
    const aboutOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startAboutFade, fininshAboutFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })

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
            { opacity: authorOpacity }
          ]}
        >
          <Text numberOfLines={2} style={[styles.message, styles.foregroundTitle]}>{title}</Text>
        </Animated.View>
        <Animated.View style={[styles.infoContainer, { opacity: aboutOpacity }]}>
          <Text style={styles.infoText}>{subtitle}</Text>
        </Animated.View>
      </View>
    )
  }

  renderBackground = () => {
    const {
      headerLayout: { height }
    } = this.state
    const { backgroundColor, hasBorderRadius } = this.props

    const headerBorderRadius = hasBorderRadius
      && this.scrollY.y.interpolate({
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
            backgroundColor
          }
        ]}
      />
    )
  }

  render() {
    const {
      backgroundColor,
      backgroundImage,
      renderBody,
      headerHeight,
      snapToEdge,
      bounces
    } = this.props

    return (
      <React.Fragment>
        <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
        <StickyParallaxHeader
          foreground={this.renderForeground()}
          header={this.renderHeader()}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.userScreenParallaxHeader}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }])}
          headerSize={this.setHeaderSize}
          headerHeight={headerHeight}
          background={this.renderBackground()}
          backgroundImage={backgroundImage}
          bounces={bounces}
          snapToEdge={snapToEdge}
        >
          {renderBody(Brandon)}
        </StickyParallaxHeader>
      </React.Fragment>
    )
  }
}

AvatarHeader.propTypes = {
  hasBorderRadius: bool,
  bounces: bool,
  snapToEdge: bool,
  leftTopIconOnPress: func,
  rightTopIconOnPress: func,
  leftTopIcon: number,
  rightTopIcon: number,
  backgroundColor: string,
  headerHeight: number,
  backgroundImage: number,
  title: string,
  subtitle: string,
  image: number,
  renderBody: func
}
AvatarHeader.defaultProps = {
  leftTopIconOnPress: () => {},
  rightTopIconOnPress: () => {},
  leftTopIcon: require('../../assets/icons/iconCloseWhite.png'),
  rightTopIcon: require('../../assets/icons/Icon-Menu.png'),
  backgroundColor: Brandon.color,
  headerHeight: sizes.userModalHeaderHeight,
  backgroundImage: null,
  title: Brandon.author,
  subtitle: Brandon.about,
  image: Brandon.image,
  renderBody: user => <RenderContent user={user} />,
  bounces: true,
  snapToEdge: true,
  hasBorderRadius: true
}

export default AvatarHeader
