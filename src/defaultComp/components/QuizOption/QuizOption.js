import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { string, bool, shape, func } from 'prop-types'
import styles from './QuizOption.styles'
import { colors } from '../../../constants'

export default class QuizOption extends Component {
  state = {
    picked: false
  }

  renderValue = (value) => {
    if (value) {
      return <Image source={require('../../../assets/icons/Check.png')} />
    }

    return <Image source={require('../../../assets/icons/Close.png')} />
  }

  render() {
    const {
      reveal,
      revealed,
      card: { number, question, value }
    } = this.props
    const { picked } = this.state
    if (revealed) {
      let backgroundColor = 'white'
      let color = 'black'
      if (picked) color = 'white'
      if (picked && value) backgroundColor = colors.jade
      if (picked && !value) backgroundColor = colors.coralPink

      return (
        <View style={[styles.container, { backgroundColor }]}>
          <View style={styles.letterContainer}>{this.renderValue(value)}</View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color }]}>{question}</Text>
          </View>
        </View>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => {
          reveal()
          this.setState({ picked: true })
        }}
        style={styles.container}
      >
        <View style={styles.letterContainer}>
          <Text style={styles.letter}>{number}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{question}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

QuizOption.propTypes = {
  card: shape({
    number: string,
    question: string,
    value: bool,
    picked: bool
  }),
  reveal: func,
  revealed: bool
}
