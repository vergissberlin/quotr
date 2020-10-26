import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Message extends Component {
	render() {
		const {header, content} = this.props;
		
		return (
			<View style={styles.container}>
				{!header || (<Text style={styles.header}>{header}</Text>)}
				{!content || (<Text style={styles.content}>{content}</Text>)}
			</View>	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '80%',
		backgroundColor: 'rgba(200,200,255,0.5)',
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 4,
	},
	header: {
		fontSize: 20,
		fontWeight: "500",
		color: '#112',
		paddingBottom: 8,
	},
	content: {
		fontSize: 20,
		fontWeight: "300",
		color: '#223',
	}
});

export default Message
