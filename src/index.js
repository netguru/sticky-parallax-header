import React, { Component } from 'react'
import {
  Animated,
  ScrollView,
  View
} from 'react-native'
import { bool, func, object } from 'prop-types'
import styles from './styles';

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
    nScroll.addListener(({ value }) => this._value = value)
  }

  componentWillUnmount() {
    const { nScroll } = this.state
    nScroll.removeListener()
  }

  onScrollEndSnapToEdge = (event) => {
    const {
      contentHeight,
      scrollHeight
    } = this.state
    const { headerHeight } = this.props
    const { y } = event.nativeEvent.contentOffset
    if (y > 0 && y < scrollHeight / 2) {
      this.scroll.getNode().scrollTo({ x: 0, y: 0, animate: true })
    } else if (scrollHeight / 2 <= y && y < scrollHeight) {
      this.scroll.getNode().scrollTo({ x: 0,
        y: headerHeight - 41,
        animate: true })
    } else if (contentHeight < 400 && y > headerHeight) {
      this.scroll.getNode().scrollTo({ x: 0,
        y: headerHeight - 41,
        animate: true })
    }
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const { onEndReached } = this.props

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      onEndReached()
    }
  }

  render() {
    const {
      hasElevation,
      headerHeight
    } = this.props

    const {
      nScroll,
      scrollHeight
    } = this.state

    const header = {
      width: '100%',
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      backgroundColor: 'white',
      elevation: hasElevation ? 5 : 0,
      shadowRadius: 5,
      shadowColor: 'black',
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 5 },
      marginBottom: 5,
      paddingBottom: 3
    }

    const titleOpacity = nScroll.interpolate({
      inputRange: [0, scrollHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const toolbarOpacity = nScroll.interpolate({
      inputRange: [0, scrollHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    return (
      <View style={{flex:1, backgroundColor: 'red'}}>
        <AnimatedScrollView
          bounces={false}
          ref={(c) => { this.scroll = c }}
          onScrollEndDrag={event => this.onScrollEndSnapToEdge(event)}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: nScroll } } }
          ],
          { useNativeDriver: true,
            listener: event => this.isCloseToBottom(event.nativeEvent) })
          }
        >
          <Animated.View style={{
            transform: [{ translateY: Animated.multiply(nScroll, 0.1) }]
          }}
          >
            <Animated.View
              style={[
                header,
                {
                  height: headerHeight
                }]}
            >
              {this.props.foreground}
            </Animated.View>
          </Animated.View>
          {this.props.children}
        </AnimatedScrollView>
        <View style={{
          height: 56,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        }}>
          <Animated.View
            style={[
              styles.toolbarWrapper,
              {
                shadowOpacity: toolbarOpacity
              }]}
          >
            <Animated.View
              style={[
                styles.titleWrapper,
                {
                  opacity: titleOpacity
                }]}
            >
              {this.props.header}
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    )
  }
}

StickyParalaxHeader.propTypes = {
  hasElevation: bool,
  onEndReached: func,
  renderContent: func,
  foreground: object,
  header: object
}

StickyParalaxHeader.defaultProps = {
  hasElevation: true,
  headerHeight: 115,
}

export default StickyParalaxHeader
