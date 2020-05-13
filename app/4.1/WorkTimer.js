import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Count, {num} from './WorkTimerCount.js'

//Life cycle
export default class WorkTimer extends Component {
    constructor(){
        super()
        this.state = {
            count: 0
        }
    }

    componentDidMount() { // equal to viewDidAppear or viewDidLoad
        this.interval = setInterval(this.inc, 1000);
    }

    componentWillUnmount() { // equal to viewWillDisapear
        clearInterval(this.interval)
    }

    inc = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Count count={this.state.count} />
                {/* <Count count={"0"} /> product warning as wrong type */}
                {/* <Text style={styles.count}> {this.state.count} </Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
