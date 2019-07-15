import React from 'react'
import { View, Image, Text, Animated, Row } from 'react-native'
import { sizes, constants, colors } from '../constants'
import styles from './TabbedHeader.styles'

const setHeaderSize = headerLayout => this.setState({ headerLayout })
const scrollPosition = (value) => {
  const { headerLayout } = this.state

  return constants.scrollPosition(headerLayout.height, value)
}

const foreground = (scrollY) => {
  const message = "Mornin' Mark! \nReady for a quiz?"
  const startSize = constants.responsiveWidth(18)
  const endSize = constants.responsiveWidth(10)
  const [startImgFade, finishImgFade] = [scrollPosition(22), scrollPosition(27)]
  const [startImgSize, finishImgSize] = [scrollPosition(20), scrollPosition(30)]
  const [startTitleFade, finishTitleFade] = [scrollPosition(25), scrollPosition(45)]

  const imageOpacity = scrollY.y.interpolate({
    inputRange: [0, startImgFade, finishImgFade],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp'
  })
  const imageSize = scrollY.y.interpolate({
    inputRange: [0, startImgSize, finishImgSize],
    outputRange: [startSize, startSize, endSize],
    extrapolate: 'clamp'
  })
  const titleOpacity = scrollY.y.interpolate({
    inputRange: [0, startTitleFade, finishTitleFade],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp'
  })

  return (
    <View style={styles.foreground}>
      <Animated.View style={{ opacity: imageOpacity }}>
        <Animated.Image
          source={require('../assets/images/photosPortraitD.png')}
          style={[styles.profilePic, { width: imageSize, height: imageSize }]}
        />
      </Animated.View>
      <Animated.View style={[styles.messageContainer, { opacity: titleOpacity }]}>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  )
}

const header = () => (
  <View style={[styles.headerWrapper, styles.homeScreenHeader]}>
    <Image resizeMode="contain" source={require('../assets/images/logo.png')} style={styles.logo} />
  </View>
)

renderContent = (title) => {
  const data = Array.from({ length: 15 })

  return (
    <View style={styles.content}>
      {data.map((_, i) => (
        <View
        // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: colors.paleGrey, padding: 10, margin: 10, width: '95%' }}
          key={i}
        >
          <Text>{title}</Text>
          <Text>{i}</Text>
        </View>
      ))}
    </View>
  )
}

const tabs = [
  {
    title: 'Popular',
    content: renderContent('Popular Quizes')
  },
  {
    title: 'Product Design',
    content: renderContent('Product Design')
  },
  {
    title: 'Development',
    content: renderContent('Development')
  },
  {
    title: 'Project Management',
    content: renderContent('Project Management')
  }
]

const parallaxHeight = sizes.homeScreenParallaxHeader

const headerSize = setHeaderSize()

const { headerHeight } = sizes

const tabTextStyle = styles.tabText

const { tabTextContainerStyle } = styles
const { tabTextContainerActiveStyle } = styles
const tabsContainerBackgroundColor = colors.primaryGreen
const tabsWrapperStyle = styles.tabsWrapper

export {
  foreground,
  header,
  tabs,
  parallaxHeight,
  headerSize,
  headerHeight,
  tabTextStyle,
  tabTextContainerStyle,
  tabTextContainerActiveStyle,
  tabsContainerBackgroundColor,
  tabsWrapperStyle
}
