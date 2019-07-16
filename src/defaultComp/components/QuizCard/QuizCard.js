import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { func, string, shape, bool, number } from 'prop-types'
import styles from './QuizCard.styles'
import QuizOption from '../QuizOption/QuizOption'

class QuizCard extends React.Component {
  state = {
    revealed: false
  }

  render() {
    const {
      data: { question, cards },
      num,
      onPress
    } = this.props

    const { revealed } = this.state

    return (
      <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.95}>
        <View style={styles.labelContainer}>
          <View style={styles.labelTextContainer}>
            <Text style={styles.labelText}>{`${num + 1}/10`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.mainText}>{question}</Text>
        </View>
        {cards.map(card => (
          <QuizOption
            key={card.question}
            reveal={() => {
              this.setState({ revealed: true })
            }}
            revealed={revealed}
            card={card}
          />
        ))}
      </TouchableOpacity>
    )
  }
}

QuizCard.propTypes = {
  onPress: func,
  data: shape({
    number: string,
    question: string,
    value: bool,
    revealed: bool,
    picked: bool
  }),
  num: number
}

export default QuizCard
