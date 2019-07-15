import React from 'react'
import { View, Text, Image } from 'react-native'
import { string, shape, bool } from 'prop-types'
import styles from './QuizOption.styles'
import { colors } from '../../../constants'

const QuizOption = ({ data: { number, question, value, revealed, picked } }) => {
  const renderValue = () => {
    if (value) {
      return <Image source={require('../../../assets/icons/Check.png')} />
    }

    return <Image source={require('../../../assets/icons/Close.png')} />
  }
  if (revealed) {
    let backgroundColor = 'white'
    let color = 'black'
    if (picked) color = 'white'
    if (picked && value) backgroundColor = colors.jade
    if (picked && !value) backgroundColor = colors.coralPink

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.letterContainer}>
          {renderValue()}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color }]}>{question}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.letterContainer}>
        <Text style={styles.letter}>{number}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{question}</Text>
      </View>
    </View>
  )
}

QuizOption.propTypes = {
  data: shape({
    number: string,
    question: string,
    value: bool,
    revealed: bool,
    picked: bool
  })
}

export default QuizOption
