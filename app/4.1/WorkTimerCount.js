
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

// Extract components demo
export const num = 50 //Not default export, have to use import {num}

//Life cycle demo
class Count extends Component {
    static propTypes = { //Use propTypes for type checking when passing props
        count: PropTypes.number.isRequired
    }

    shouldComponentUpdate(nextProps) { //example for components shouldnt be update
        return nextProps.count % 2 == 0
    }

    componentDidUpdate() { //called after shouldComponentUpdate 
        console.log(this.props.count);
    }

    render() {
        return <Text style={styles.count}> {this.props.count} </Text>
    }
}

const styles = StyleSheet.create({
    count: {
        fontSize: 48
    }
})

//Use propTypes for type checking when passing props, use this for non state component
// Count.propTypes = {
//     count: PropTypes.number.isRequired
// }

export default Count //default export can be imported as custom name eg. CustomCount