import React from 'react'
import { View, Text } from 'react-native'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ScrollableTabBar, ScrollableTabView } from './components'
import StickyParallaxHeader from './index'
import { colors } from './constants'

const renderContent = title => (
  <View>
    <Text>{title}</Text>
  </View>
)

function createClientXY(x, y) {
  return { clientX: x, clientY: y }
}

function createStartTouchEventObject({ x = 0, y = 0 }) {
  return { touches: [createClientXY(x, y)] }
}

function createMoveTouchEventObject({ x = 0, y = 0 }) {
  return { changedTouches: [createClientXY(x, y)] }
}

configure({
  adapter: new Adapter()
})

const defaultProps = {
  onEndReached: jest.fn(),
  foreground: <View />,
  tabs: [
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
  ],
  deviceWidth: 420,
  parallaxHeight: 300,
  scrollEvent: jest.fn(),
  background: <View />,
  tabTextStyle: {},
  tabTextContainerStyle: {},
  tabTextContainerActiveStyle: {},
  tabsContainerBackgroundColor: 'white',
  backgroundImage: null,
  children: <View />,
  header: <View style={{ backgroundColor: colors.white }} />,
  headerHeight: 70,
  headerSize: jest.fn(),
  initialPage: 0,
  locked: false,
  onChangeTab: jest.fn(),
  snapToEdge: true,
  tabTextActiveStyle: {},
  tabsWrapperStyle: {}
}

describe('with basic props', () => {
  const props = defaultProps
  const wrapper = shallow(<StickyParallaxHeader {...props} />)
  const instance = wrapper.instance()
  const dived = wrapper.dive()

  it('Should render snapshot properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should render propetly', () => {
    expect(wrapper.find(View).length).toBe(16)
    expect(wrapper.find(Text).length).toBe(4)
    expect(wrapper.find(ScrollableTabBar).length).toBe(1)
    expect(wrapper.find(ScrollableTabView).length).toBe(1)
  })

  it('Should swipe the page', () => {
    const spyOnSwipePage = jest.spyOn(instance, 'swipedPage')
    wrapper.simulate('touchStart', createStartTouchEventObject({ x: 100, y: 0 }))
    wrapper.simulate('touchMove', createMoveTouchEventObject({ x: 150, y: 0 }))
    wrapper.simulate('touchEnd', createMoveTouchEventObject({ x: 200, y: 0 }))

    expect(spyOnSwipePage).toHaveBeenCalled()
  })
})
