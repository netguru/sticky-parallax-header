import React from 'react'
import { View, Text } from 'react-native'
import { QuizListElement } from '../../components'
import { Brandon, Jennifer, Ewa, Jazzy } from '../../../assets/data/cards'
import styles from '../TabbedHeader.styles'

function renderContent(title = 'Popular Quizes') {
  const users = [Brandon, Jennifer, Ewa, Jazzy]

  return (
    <View style={styles.content}>
      <Text style={styles.contentText}>{title}</Text>
      {users.map(
        user => (title === 'Popular Quizes' || title === user.type) && (
        <QuizListElement
          key={JSON.stringify(user)}
          elements={user.cardsAmount}
          authorName={user.author}
          mainText={user.label}
          labelText={user.type}
          imageSource={user.image}
          onPress={() => {}}
          pressUser={() => {}}
        />
        )
      )}
    </View>
  )
}

export { renderContent }
