import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Quote extends Component {
	render() {
		const {quote, author} = this.props;

		return (
			<View style={styles.container}>
				<Text style={styles.quote}>{quote}</Text>
				<Text style={styles.author}>— {author}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '92%',
		color: '#fff',
		paddingHorizontal: 12
	},
	quote: {
		fontSize: 50,
		fontWeight: "100",
		color: '#fff',
	},
	author: {
		fontSize: 20,
		fontWeight: "300",
		textAlign: "right",
		paddingTop: 16,
		color: '#889',
	}
});

export default Quote
