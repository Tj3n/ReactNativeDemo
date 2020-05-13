import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

class EmojiDict extends Component {
	// state = {
	// 	'😃': '😃 Smiley',
	// 	'🚀': '🚀 Rocket',
	// 	'⚛️': '⚛️ Atom Symbol'
	// };

	constructor(props) {
		super(props)
		this.state = {
			count: 0,
		}
	} 

	increaseCount() {
		//Will be merged after call setState, so call twice only run once
		// this.setState({count: this.state.count + 1})

		//Not merged
		this.setState( prevState => ({ count: prevState.count+1 }) )
		this.setState( prevState => ({ count: prevState.count+1 }) )
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>{this.state.count}</Text>
				<Button 
					onPress={ () => this.increaseCount() } 
					title="Increase"
				/>
				{/* <FlatList
					contentContainerStyle={styles.container}
					data={[
						{ key: '😃', value: '😃 Smiley' },
						{ key: '🚀', value: '🚀 Rocket' },
						{ key: '⚛️', value: '⚛️ Atom Symbol' }
					]}
					renderItem={({ item }) => <Text>{item.value}</Text>}
				/> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default EmojiDict;