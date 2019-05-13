import React, { Component } from 'react'
import { Animated, ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { func, number, node, arrayOf, string } from 'prop-types'
import { colors } from './constants'
import styles from './styles'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class StickyParalaxHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nScroll: new Animated.Value(0),
      scrollHeight: 65
    }
  }

  componentDidMount() {
    const { nScroll } = this.state
    // eslint-disable-next-line
    nScroll.addListener(({ value }) => (this._value = value))
  }

  componentWillUnmount() {
    const { nScroll } = this.state
    nScroll.removeListener()
  }

  onScrollEndSnapToEdge = (event) => {
    const { contentHeight, scrollHeight } = this.state
    const { headerHeight } = this.props
    const { y } = event.nativeEvent.contentOffset
    if (y > 0 && y < scrollHeight / 2) {
      this.scroll.getNode().scrollTo({ x: 0, y: 0, animate: true })
    } else if (scrollHeight / 2 <= y && y < scrollHeight) {
      this.scroll.getNode().scrollTo({ x: 0, y: headerHeight - 41, animate: true })
    } else if (contentHeight < 400 && y > headerHeight) {
      this.scroll.getNode().scrollTo({ x: 0, y: headerHeight - 41, animate: true })
    }
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const { onEndReached } = this.props

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      onEndReached()
    }
  }

  renderTabs = () => {
    const { tabs } = this.props
    const shouldRenderTabs = tabs && tabs.length > 0

    return shouldRenderTabs ? (
      <View style={styles.tabsContainer}>
        <TouchableOpacity activeOpacity={0.75} style={styles.tab}>
          <Text style={styles.tabText}>{tabs[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} style={styles.tab}>
          <Text style={styles.tabText}>{tabs[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} style={styles.tab}>
          <Text style={styles.tabText}>{tabs[2]}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.tabsContainer} />
    )
  }

  render() {
    const { headerHeight, header, foreground, children } = this.props
    const { nScroll, scrollHeight } = this.state

    const headerStyle = {
      width: '100%',
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      backgroundColor: colors.primaryGreen,
      marginBottom: 5,
      paddingBottom: 3
    }

    const titleOpacity = nScroll.interpolate({
      inputRange: [0, scrollHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const headerBorderRadius = nScroll.interpolate({
      inputRange: [0, scrollHeight],
      outputRange: [70, 0],
      extrapolate: 'extend'
    })

    return (
      <View style={styles.container}>
        <AnimatedScrollView
          bounces={false}
          ref={(c) => {
            this.scroll = c
          }}
          onScrollEndDrag={event => this.onScrollEndSnapToEdge(event)}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: nScroll } } }], {
            useNativeDriver: true,
            listener: event => this.isCloseToBottom(event.nativeEvent)
          })}
        >
          <Animated.View
            style={{
              transform: [{ translateY: Animated.multiply(nScroll, 0.1) }]
            }}
          >
            <Animated.View
              style={[
                headerStyle,
                {
                  height: headerHeight,
                  borderBottomRightRadius: headerBorderRadius
                }
              ]}
            >
              <View style={{ height: headerHeight }}>
                {foreground}
                {this.renderTabs()}
              </View>
            </Animated.View>
          </Animated.View>
          {children}
        </AnimatedScrollView>
        <View style={styles.toolbar}>
          <Animated.View style={styles.toolbarWrapper}>
            <Animated.View
              style={[
                styles.titleWrapper,
                {
                  opacity: titleOpacity
                }
              ]}
            >
              {header}
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    )
  }
}

StickyParalaxHeader.propTypes = {
  onEndReached: func,
  foreground: node,
  header: node,
  headerHeight: number,
  children: node,
  tabs: arrayOf(string)
}

StickyParalaxHeader.defaultProps = {
  headerHeight: 250
}

export default StickyParalaxHeader
