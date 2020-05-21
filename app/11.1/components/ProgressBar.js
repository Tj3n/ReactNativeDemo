import React, {Component} from 'react'
import {Text, View, StyleSheet, Dimensions, Animated, Easing} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  progress: {
    height: 10,
    width: 2,
    backgroundColor: 'blue',
  },
})

// const ProgressBar = props => {
//   const width = Dimensions.get('window').width
//   const percent = props.timeRemaining / props.timeTotal
//   return <View style={[styles.progress, {width: width - width * percent}]} />
// }

class ProgressBar extends Component {
  state = {
    percent: new Animated.Value(0),
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation = () => {
    this.animation = Animated.timing(this.state.percent, {
      toValue: 100,
      duration: this.props.timeRemaining,
      easing: Easing.linear,
      useNativeDriver: true,
    })

    this.animation.start()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.timeRemaining > this.props.timeRemaining) {
      this.setState({percent: new Animated.Value(0)}, this.startAnimation)
    }
  }

  render() {
    const {percent} = this.state
    const {width} = Dimensions.get('window')
    return (
      <Animated.View
        style={[
          styles.progress,
          {
            transform: [
              {
                scaleX: percent.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, width],
                }),
              },
            ],
          }, //Convert percentage of 0->100 to 0->screen width
        ]}
      />
    )
  }
}

ProgressBar.PropTypes = {
  timeRemaining: PropTypes.number,
  timeTotal: PropTypes.number,
  isRunning: PropTypes.bool,
}

export default ProgressBar
