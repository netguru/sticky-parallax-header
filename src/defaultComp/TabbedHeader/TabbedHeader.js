import React from 'react'
import { Text, View, Image, StatusBar, Modal, Animated } from 'react-native'
import { arrayOf, bool,  number, shape, string } from 'prop-types'
import StickyParallaxHeader from '../../index'
import { QuizListElement, UserModal } from '../components'
import { constants, colors, sizes } from '../../constants'
import styles from './TabbedHeader.styles'
import { Brandon, Jennifer, Ewa, Jazzy } from '../../assets/data/cards'

const { event, ValueXY } = Animated
export default class TabbedHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headerLayout: {
        height: 0
      },
      modalVisible: false
    }
    this.scrollY = new ValueXY()
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.scrollY.y.addListener(({ value }) => (this._value = value))
  }

  componentWillUnmount() {
    this.scrollY.y.removeListener()
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  setHeaderSize = headerLayout => this.setState({ headerLayout })

  openUserModal = (userSelected) => {
    this.setState({ userSelected }, () => this.setModalVisible(true))
  }

  scrollPosition = (value) => {
    const { headerLayout } = this.state

    return constants.scrollPosition(headerLayout.height, value)
  }

  renderHeader = () => {
    const { backgorundColor } = this.props

    return (
      <View style={[styles.headerWrapper, backgorundColor]}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
    )
  }

  renderForeground = (scrollY) => {
    const { title } = this.props
    const startSize = constants.responsiveWidth(18)
    const endSize = constants.responsiveWidth(10)
    const [startImgFade, finishImgFade] = [this.scrollPosition(22), this.scrollPosition(27)]
    const [startImgSize, finishImgSize] = [this.scrollPosition(20), this.scrollPosition(30)]
    const [startTitleFade, finishTitleFade] = [this.scrollPosition(25), this.scrollPosition(45)]

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
            source={require('../../assets/images/photosPortraitD.png')}
            style={[styles.profilePic, { width: imageSize, height: imageSize }]}
          />
        </Animated.View>
        <Animated.View style={[styles.messageContainer, { opacity: titleOpacity }]}>
          <Text style={styles.message}>{title}</Text>
        </Animated.View>
      </View>
    )
  }

  renderQuizElements = (title) => {
    const users = [Brandon, Jennifer, Ewa, Jazzy]

    return users.map(
      user => (title === 'Popular Quizes' || title === user.type) && (
      <QuizListElement
        key={JSON.stringify(user)}
        elements={user.cardsAmount}
        authorName={user.author}
        mainText={user.label}
        labelText={user.type}
        imageSource={user.image}
        onPress={() => {}}
        pressUser={() => this.openUserModal(user)}
      />
      )
    )
  }

  renderContent = title => (
    <View style={styles.content}>
      {this.renderModal()}
      <Text style={styles.contentText}>{title}</Text>
      {this.renderQuizElements(title)}
    </View>
  )

  renderModal = () => {
    const { modalVisible, userSelected } = this.state

    return (
      <Modal animationType="slide" transparent visible={modalVisible} style={styles.modalStyle}>
        <View style={styles.modalContentContainer}>
          <UserModal onPressCloseModal={() => this.setModalVisible(false)} user={userSelected} />
        </View>
      </Modal>
    )
  }

  render() {
    const { tabs, headerHeight, backgorundColor, backgroundImage, bounces, snapToEdge } = this.props

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor={backgorundColor} translucent />
        <StickyParallaxHeader
          bounces={bounces}
          snapToEdge={snapToEdge}
          foreground={this.renderForeground(this.scrollY)}
          header={this.renderHeader()}
          tabs={tabs}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.homeScreenParallaxHeader}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }])}
          headerSize={this.setHeaderSize}
          headerHeight={headerHeight}
          tabTextStyle={styles.tabText}
          tabTextContainerStyle={styles.tabTextContainerStyle}
          tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
          tabsContainerBackgroundColor={colors.primaryGreen}
          tabsWrapperStyle={styles.tabsWrapper}
          backgroundImage={backgroundImage}
        >
          {this.renderContent('Popular Quizes')}
        </StickyParallaxHeader>
      </React.Fragment>
    )
  }
}

TabbedHeader.propTypes = {
  backgorundColor: string,
  headerHeight: number,
  backgroundImage: number,
  title: string,
  bounces: bool,
  snapToEdge: bool,
  tabs: arrayOf(shape({}))
}

TabbedHeader.defaultProps = {
  backgorundColor: colors.primaryGreen,
  headerHeight: sizes.headerHeight,
  backgroundImage: null,
  title: "Mornin' Mark! \nReady for a quiz?",
  bounces: true,
  snapToEdge: true,
  tabs: [
    {
      title: 'Popular',
      content: this.renderContent('Popular Quizes')
    },
    {
      title: 'Product Design',
      content: this.renderContent('Product Design')
    },
    {
      title: 'Development',
      content: this.renderContent('Development')
    },
    {
      title: 'Project Management',
      content: this.renderContent('Project Management')
    }
  ]
}
