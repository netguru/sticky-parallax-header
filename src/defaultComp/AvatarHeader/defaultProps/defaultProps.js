import React from 'react'
import { View, Text } from 'react-native'
import { QuizListElement } from '../../components'
import { sizes } from '../../../constants'
import styles from '../../TabbedHeader/TabbedHeader.styles'

const renderContent = () => {
  const title = "Author's Quizes"
  const cards = [
    {
      elements: 10,
      authorName: 'Brandon',
      mainText: 'Design System',
      labelText: 'Product Design',
      imageSource: require('../../../assets/images/photosPortraitA.png')
    },
    {
      elements: 7,
      authorName: 'Brandon',
      mainText: 'Style Guide',
      labelText: 'Product Design',
      imageSource: require('../../../assets/images/photosPortraitA.png')
    },
    {
      elements: 9,
      authorName: 'Brandon',
      mainText: 'How to design',
      labelText: 'Product Design',
      imageSource: require('../../../assets/images/photosPortraitA.png')
    },
    {
      elements: 4,
      authorName: 'Brandon',
      mainText: 'Style Guide',
      labelText: 'Product Design',
      imageSource: require('../../../assets/images/photosPortraitA.png')
    }
  ]

  return (
    <View style={[styles.content, { paddingBottom: sizes.userScreenParallaxHeader }]}>
      <Text style={styles.contentText}>{title}</Text>
      {cards.map(card => (
        <QuizListElement
          key={JSON.stringify(card)}
          elements={card.elements}
          authorName={card.authorName}
          mainText={card.mainText}
          labelText={card.labelText}
          imageSource={card.imageSource}
        />
      ))}
    </View>
  )
}

export { renderContent }
