import React from 'react'
import { View, Text } from 'react-native'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ScrollableTabBar, ScrollableTabView } from './components'
import StickyParalaxHeader from './index'
import { colors } from './constants'

const renderContent = title => (
  <View>
    <Text>{title}</Text>
  </View>
)

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
  const wrapper = shallow(<StickyParalaxHeader {...props} />)

  it('Should render snapshot properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should render propetly', () => {
    expect(wrapper.find(View).length).toBe(16)
    expect(wrapper.find(Text).length).toBe(4)
    expect(wrapper.find(ScrollableTabBar).length).toBe(1)
    expect(wrapper.find(ScrollableTabView).length).toBe(1)
  })
})
