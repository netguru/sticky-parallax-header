import React, { Component } from 'react'
import { arrayOf, bool, func, node, number, shape, string } from 'prop-types'
import { Animated, Dimensions, ImageBackground, ScrollView, View, Platform } from 'react-native'
import { getStatusBarHeight, ifIphoneX } from 'react-native-iphone-x-helper'
import { ScrollableTabBar, ScrollableTabView } from './components'
import styles from './styles'
import { constants } from './constants'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class StickyParalaxHeader extends Component {
  constructor(props) {
    super(props)
    const { initialPage } = this.props
    const { width } = Dimensions.get('window')
    const scrollXIOS = new Animated.Value(initialPage * width)
    const containerWidthAnimatedValue = new Animated.Value(width)

    // eslint-disable-next-line no-underscore-dangle
    containerWidthAnimatedValue.__makeNative()
    const scrollValue = Animated.divide(scrollXIOS, containerWidthAnimatedValue)
    this.state = {
      scrollY: new Animated.Value(0),
      scrollValue,
      containerWidth: width,
      currentPage: initialPage
    }
  }

  componentDidMount() {
    const { scrollY } = this.state
    // eslint-disable-next-line
    scrollY.addListener(({ value }) => (this._value = value))
  }

  componentWillUnmount() {
    const { scrollY } = this.state
    scrollY.removeListener()
  }

  onScrollEndSnapToEdge = (event) => {
    const { headerHeight, parallaxHeight, snapToEdge } = this.props
    const { y } = event.nativeEvent.contentOffset
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)

    const scrollHeight = backgroundHeight
    if (y < -20) {
      this.spring(0, y)

      return null
    }
    if (snapToEdge) {
      if (y > 0 && y < scrollHeight / 2) {
        this.scroll.getNode().scrollTo({
          x: 0,
          y: 0,
          animate: true
        })
      } else if (y >= scrollHeight / 2 && y < scrollHeight) {
        this.scroll.getNode().scrollTo({
          x: 0,
          y: scrollHeight,
          animate: true
        })
      }
    }
  }

  onChangeTabHandler = (tab) => {
    const { onChangeTab } = this.props

    return onChangeTab && onChangeTab(tab)
  }

  onScroll = (e) => {
    const { scrollEvent } = this.props

    return scrollEvent && scrollEvent(e)
  }

  spring = (y, scrollOffset) => {
    const animatedValue = new Animated.Value(scrollOffset)
    const id = animatedValue.addListener(({ value }) => {
      this.scroll.getNode().scrollTo({ x: 0, y: value, animated: false })
    })
    Animated.spring(
      animatedValue,
      { toValue: y, bounciness: 30 }
    ).start(() => { animatedValue.removeListener(id) })
  }

  onLayout = (e) => {
    const { x, y, width, height } = e.nativeEvent.layout
    const { headerSize } = this.props
    const headerLayout = {
      x,
      y,
      width,
      height
    }
    headerSize(headerLayout)
  }

  swipedPage = page => this.setState({
    currentPage: page
  })

  goToPage = (pageNumber) => {
    const { containerWidth } = this.state
    const offset = pageNumber * containerWidth
    if (this.scrollView) {
      this.scrollView.getNode().scrollTo({
        x: offset,
        y: 0,
        animated: true
      })
    }
    this.setState({
      currentPage: pageNumber
    })
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const { onEndReached } = this.props

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      onEndReached()
    }
  }

  renderHeader = () => {
    const { header, headerHeight } = this.props

    return (
      <View
        style={
          (styles.toolbarWrapper,
          {
            height: headerHeight,
            paddingTop: constants.isAndroid ? 0 : getStatusBarHeight('safe'),
            backgroundColor: header.props.style.backgroundColor
          })
        }
      >
        {header}
      </View>
    )
  }

  renderImageBackground = () => {
    const { headerHeight, parallaxHeight, backgroundImage } = this.props
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)
    const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

    return (
      <AnimatedImageBackground
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight
          }
        ]}
        source={backgroundImage}
      />
    )
  }

  renderPlainBackground = () => {
    const { headerHeight, parallaxHeight, background } = this.props
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)

    return (
      <View
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight
          }
        ]}
      >
        {background}
      </View>
    )
  }

  renderForeground = () => {
    const {
      headerHeight,
      foreground,
      parallaxHeight,
      tabsContainerBackgroundColor,
      header
    } = this.props
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)
    const { backgroundColor } = header.props.style

    return (
      <View
        style={{
          height: backgroundHeight,
          backgroundColor: tabsContainerBackgroundColor
        }}
      >
        {Platform.OS === 'ios'
          && <View
            style={[styles.overScrollPadding, { backgroundColor }]}
          />
        }
        {foreground}
      </View>
    )
  }

  renderTabs = () => {
    const {
      tabs,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabsContainerBackgroundColor,
      tabsWrapperStyle
    } = this.props
    const { scrollValue, currentPage, containerWidth } = this.state

    const props = {
      activeTab: currentPage,
      containerWidth,
      goToPage: this.goToPage,
      scrollValue,
      tabTextActiveStyle,
      tabTextContainerActiveStyle,
      tabTextContainerStyle,
      tabTextStyle,
      tabsContainerBackgroundColor,
      tabs,
      tabsWrapperStyle
    }

    return <ScrollableTabBar {...props} />
  }

  render() {
    const { backgroundImage, children, header, initialPage, parallaxHeight, tabs, locked } = this.props
    const { scrollY, currentPage } = this.state

    const shouldRenderTabs = tabs && tabs.length > 0

    return (
      <View style={styles.container}>
        {header && this.renderHeader()}
        <AnimatedScrollView
          // bounces={false}
          // overScrollMode="never"
          nestedScrollEnabled
          ref={(c) => {
            this.scroll = c
          }}
          onScrollEndDrag={event => this.onScrollEndSnapToEdge(event)}
          scrollEventThrottle={1}
          stickyHeaderIndices={shouldRenderTabs ? [1] : []}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY
                  }
                }
              }
            ],
            {
              useNativeDriver: true,
              listener: (event) => {
                this.isCloseToBottom(event.nativeEvent)
                this.onScroll(event)
              }
            }
          )}
        >
          <View style={{ height: parallaxHeight }} onLayout={e => this.onLayout(e)}>
            {backgroundImage ? this.renderImageBackground() : this.renderPlainBackground()}
            {this.renderForeground()}
          </View>
          {shouldRenderTabs && this.renderTabs()}
          <ScrollableTabView
            initialPage={initialPage}
            onChangeTab={i => this.onChangeTabHandler(i)}
            locked={false}
            tabs={tabs}
            page={currentPage}
            swipedPage={this.swipedPage}
          >
            {!tabs && children}
            {tabs
              && tabs.map(item => (
                <View
                  tabLabel={item.title}
                  key={item.title}
                  onLayout={this.setContentHeight}
                  ref={(c) => {
                    this.tab = c
                  }}
                >
                  {item.content}
                </View>
              ))}
          </ScrollableTabView>
        </AnimatedScrollView>
      </View>
    )
  }
}

StickyParalaxHeader.propTypes = {
  background: node,
  backgroundImage: number,
  children: node,
  foreground: node,
  header: node,
  headerHeight: number,
  headerSize: func,
  initialPage: number,
  locked: bool,
  onChangeTab: func,
  onEndReached: func,
  parallaxHeight: number,
  scrollEvent: func,
  snapToEdge: bool,
  tabTextActiveStyle: shape({}),
  tabTextContainerActiveStyle: shape({}),
  tabTextContainerStyle: shape({}),
  tabTextStyle: shape({}),
  tabs: arrayOf(shape({})),
  tabsContainerBackgroundColor: string,
  tabsWrapperStyle: shape({})
}

StickyParalaxHeader.defaultProps = {
  headerHeight: 92,
  initialPage: 0,
  parallaxHeight: 0,
  snapToEdge: true,
  tabTextActiveStyle: {},
  tabTextContainerActiveStyle: {},
  tabTextContainerStyle: {},
  tabTextStyle: {},
  tabsWrapperStyle: {}
}

export default StickyParalaxHeader
