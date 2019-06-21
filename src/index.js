import React, { Component } from 'react'
import { arrayOf, bool, func, node, number, shape, string } from 'prop-types'
import { Dimensions, ImageBackground, ScrollView, View, Animated, PanResponder } from 'react-native'
import { ScrollableTabBar, ScrollableTabView } from './components'
import styles from './styles'

const { divide, Value, timing, createAnimatedComponent, event, spring } = Animated
const AnimatedScrollView = createAnimatedComponent(ScrollView)

class StickyParalaxHeader extends Component {
  constructor(props) {
    super(props)
    const { initialPage, parallaxHeight, headerHeight } = this.props
    const { width } = Dimensions.get('window')
    const scrollXIOS = new Value(initialPage * width)
    const containerWidthAnimatedValue = new Value(width)
    const scrollHeight = Math.max(parallaxHeight, headerHeight * 2)

    containerWidthAnimatedValue.__makeNative()
    const scrollValue = divide(scrollXIOS, containerWidthAnimatedValue)
    this.state = {
      scrollValue,
      containerWidth: width,
      currentPage: initialPage,
      isFolded: false
    }
    this.scrollY = new Value(0)
    this.springAnimation = new Value(0)
    this.springAnimationValue = 0
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: event => event.nativeEvent.pageY >= 0,
      onPanResponderMove: (event, gestureState) => {},
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event, gestureState) => {
        // if (!this.state.isFolded && gestureState.dy >= 30) this.spring(0, gestureState)
      }
    })
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.scrollY.addListener(({ value }) => (this._value = value))
  }

  componentWillUnmount() {
    this.scrollY.removeListener()
  }

  onScrollEndSnapToEdge = (event, scrollHeight) => {
    const { snapToEdge } = this.props
    const { y } = event.nativeEvent.contentOffset

    if (snapToEdge) {
      if (y > 0 && y < scrollHeight / 2) {
        this.setState(
          {
            isFolded: false
          },
          () => {
            this.scroll.getNode().scrollTo({
              x: 0,
              y: 0,
              animate: true
            })
          }
        )
      }
      if (y >= scrollHeight / 2 && y < scrollHeight) {
        this.setState(
          {
            isFolded: true
          },
          () => {
            this.scroll.getNode().scrollTo({
              x: 0,
              y: scrollHeight,
              animate: true
            })
          }
        )
      }
    }

    return null
  }

  onChangeTabHandler = (tab) => {
    const { onChangeTab } = this.props

    return onChangeTab && onChangeTab(tab)
  }

  spring = (y) => {
    const scrollNode = this.scroll.getNode()
    const firstDistance = 50
    const secondDistance = 80
    const id = this.springAnimation.addListener(({ value }) => {
      scrollNode.scrollTo({ x: 0, y: value, animated: false })
    })

    const secondStep = spring(this.springAnimation, {
      toValue: y - secondDistance,
      useNativeDriver: true,
      duration: 200
    })

    const thirdStep = spring(this.springAnimation, {
      toValue: y + firstDistance,
      useNativeDriver: true,
      duration: 200
    })

    const fourthStep = spring(this.springAnimation, {
      toValue: y,
      useNativeDriver: true,
      duration: 200
    })
    secondStep.start(() => {
      this.springAnimation.removeListener(id)
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
    const { containerWidth, currentPage } = this.state
    const offset = pageNumber * containerWidth
    if (this.scrollView) {
      this.scrollView.getNode().scrollTo({
        x: offset,
        y: 0,
        animated: true
      })
    }
    if (currentPage !== pageNumber) {
      this.setState({
        currentPage: pageNumber
      })
    }
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
    const { backgroundImage, background } = this.props

    const AnimatedImageBackground = createAnimatedComponent(ImageBackground)

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
        {background}
      </AnimatedImageBackground>
    )
  }

  renderPlainBackground = (backgroundHeight) => {
    const { background } = this.props

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

  renderForeground = (backgroundHeight) => {
    const { foreground, tabsContainerBackgroundColor } = this.props

    return (
      <View
        style={{
          height: backgroundHeight,
          backgroundColor: tabsContainerBackgroundColor
        }}
      >
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
      bounces,
      scrollEvent
    } = this.props
    const { currentPage, isFolded } = this.state
    const scrollHeight = Math.max(parallaxHeight, headerHeight * 2)
    const headerStyle = header.props.style
    const isArray = Array.isArray(headerStyle)
    const arrayHeaderStyle = {}
    if (isArray) {
      headerStyle.map(el => Object.assign(arrayHeaderStyle, el))
    }

    const shouldRenderTabs = tabs && tabs.length > 0

    return (
      <View style={styles.container}>
        {header && this.renderHeader()}
        <AnimatedScrollView
          bounces={bounces}
          overScrollMode="always"
          bouncesZoom
          nestedScrollEnabled
          ref={(c) => {
            this.scroll = c
          }}
          onScrollEndDrag={event => this.onScrollEndSnapToEdge(event, scrollHeight)}
          scrollEventThrottle={1}
          snapToOffsets={[0, 2]}
          stickyHeaderIndices={shouldRenderTabs ? [1] : []}
          showsVerticalScrollIndicator={false}
          onScroll={event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.scrollY
                  }
                }
              }
            ],
            {
              useNativeDriver: true,
              listener: (event) => {
                this.isCloseToBottom(event.nativeEvent)
                scrollEvent(event)
              }
            }
          )}
          // {...this.panResponder.panHandlers}
        >
          <View style={{ height: parallaxHeight }} onLayout={e => this.onLayout(e)}>
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
            isHeaderisFolded={isFolded}
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
