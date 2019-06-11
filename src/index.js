import React, { Component } from 'react'
import { arrayOf, bool, func, node, number, shape, string } from 'prop-types'
import { Animated, Dimensions, ImageBackground, ScrollView, View } from 'react-native'
import { ScrollableTabBar, ScrollableTabView } from './components'
import styles from './styles'
import { constants, responsive } from './constants'

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

  onScrollEndSnapToEdge = (event, scrollHeight) => {
    const { snapToEdge } = this.props
    const { y } = event.nativeEvent.contentOffset

    if (y < -20) {
      this.spring(0, y)

      return null
    }
    if (snapToEdge) {
      if (y > 0 && y < scrollHeight / 2) {
        return this.scroll.getNode().scrollTo({
          x: 0,
          y: 0,
          animate: true
        })
      }
      if (y >= scrollHeight / 2 && y < scrollHeight) {
        return this.scroll.getNode().scrollTo({
          x: 0,
          y: scrollHeight,
          animate: true
        })
      }
    }

    return null
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
    const springAnimation = new Animated.Value(scrollOffset)
    const scrollNode = this.scroll.getNode()
    const id = springAnimation.addListener(({ value }) => {
      scrollNode.scrollTo({ x: 0, y: value, animated: false })
    })

    Animated.spring(springAnimation, {
      toValue: y,
      tension: 250,
      friction: 8,
      useNativeDriver: true
    }).start(() => {
      springAnimation.removeListener(id)
    })
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

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const { onEndReached } = this.props

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      return onEndReached && onEndReached()
    }

    return null
  }

  renderHeader = () => {
    const { header, headerHeight } = this.props

    const headerStyle = header.props.style
    const isArray = Array.isArray(headerStyle)
    const arrayHeaderStyle = {}
    if (isArray) {
      headerStyle.map(el => Object.assign(arrayHeaderStyle, el))
    }

    return (
      <View
        style={
          (styles.toolbarWrapper,
          {
            height: headerHeight,
            paddingTop: constants.isAndroid ? 0 : responsive.getStatusBarHeight('safe'),
            backgroundColor: isArray
              ? arrayHeaderStyle.backgroundColor
              : headerStyle.backgroundColor
          })
        }
      >
        {header}
      </View>
    )
  }

  renderImageBackground = (backgroundHeight) => {
    const { backgroundImage, background, header } = this.props

    const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)
    const headerStyle = header.props.style
    const isArray = Array.isArray(headerStyle)
    const arrayHeaderStyle = {}
    if (isArray) {
      headerStyle.map(el => Object.assign(arrayHeaderStyle, el))
    }

    return (
      <AnimatedImageBackground
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight
          }
        ]}
        source={backgroundImage}
      >
        {!constants.isAndroid && (
          <View
            style={[
              styles.overScrollPadding,
              {
                backgroundColor: isArray
                  ? arrayHeaderStyle.backgroundColor
                  : headerStyle.backgroundColor
              }
            ]}
          />
        )}
        {background}
      </AnimatedImageBackground>
    )
  }

  renderPlainBackground = (backgroundHeight) => {
    const { background, header } = this.props
    const headerStyle = header.props.style
    const isArray = Array.isArray(headerStyle)
    const arrayHeaderStyle = {}
    if (isArray) {
      headerStyle.map(el => Object.assign(arrayHeaderStyle, el))
    }

    return (
      <View
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight
          }
        ]}
      >
        {!constants.isAndroid && (
          <View
            style={[
              styles.overScrollPadding,
              {
                backgroundColor: isArray
                  ? arrayHeaderStyle.backgroundColor
                  : headerStyle.backgroundColor
              }
            ]}
          />
        )}
        {background}
      </View>
    )
  }

  renderForeground = (backgroundHeight) => {
    const { foreground, tabsContainerBackgroundColor, header } = this.props
    const { backgroundColor } = header.props.style

    return (
      <View
        style={{
          height: backgroundHeight,
          backgroundColor: tabsContainerBackgroundColor
        }}
      >
        {!constants.isAndroid && <View style={[styles.overScrollPadding, { backgroundColor }]} />}
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
    const {
      backgroundImage,
      children,
      header,
      headerHeight,
      initialPage,
      parallaxHeight,
      tabs,
      bounces
    } = this.props
    const { scrollY, currentPage } = this.state
    const scrollHeight = Math.max(parallaxHeight, headerHeight * 2)

    const shouldRenderTabs = tabs && tabs.length > 0
    const overScrollMode = bounces ? 'auto ' : 'never'

    return (
      <View style={styles.container}>
        {header && this.renderHeader()}
        <AnimatedScrollView
          bounces={bounces}
          overScrollMode={constants.isAndroid ? 'never' : overScrollMode}
          nestedScrollEnabled
          ref={(c) => {
            this.scroll = c
          }}
          onScrollEndDrag={event => this.onScrollEndSnapToEdge(event, scrollHeight)}
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
            {backgroundImage
              ? this.renderImageBackground(scrollHeight)
              : this.renderPlainBackground(scrollHeight)}
            {this.renderForeground(scrollHeight)}
          </View>
          {shouldRenderTabs && this.renderTabs()}
          <ScrollableTabView
            initialPage={initialPage}
            onChangeTab={i => this.onChangeTabHandler(i)}
            tabs={tabs}
            page={currentPage}
            swipedPage={this.swipedPage}
            scrollRef={this.scroll}
            scrollHeight={scrollHeight}
            // eslint-disable-next-line no-underscore-dangle
            scrollYValue={scrollY._value}
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
  bounces: bool,
  children: node,
  foreground: node,
  header: node,
  headerHeight: number,
  headerSize: func.isRequired,
  initialPage: number,
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
  bounces: true,
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
