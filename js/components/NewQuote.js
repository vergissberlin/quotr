import React, { Component } from 'react'
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native'

class NewQuote extends Component {
	state = { quote: null, author: null }
	render() {
		const { visible, onSave } = this.props
		const { quote, author } = this.state
		return visible ? (
			<Modal
				visible={visible}
				onRequestClose={() => {
					onSave(null, null)
					this.setState({ quote: null, author: null })
				}}
				animationType="slide">
				<View style={styles.container}>
					<TextInput
						style={[styles.input, { minHeight: 142 }]}
						autoFocus
						multiline
						numberOfLines={4}
						placeholder="Inhalt des Zitats"
						placeholderTextColor="#334"
						underlineColorAndroid="transparent"
						onChangeText={(quote) => this.setState({ quote })}
					/>
					<TextInput
						style={styles.input}
						placeholder="AutorIn des Zitats"
						placeholderTextColor="#334"
						underlineColorAndroid="transparent"
						autoCorrect={false}
						enablesReturnKeyAutomatically
						onChangeText={(author) => this.setState({ author })}
					/>
					<Button
						title="Create"
						color="#189"
						onPress={() => {
							onSave(quote, author)
							this.setState({ quote: null, author: null })
						}}
					/>
				</View>
			</Modal>
		) : null
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 42,
		backgroundColor: '#111118'
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: '#189',
		borderRadius: 1,
		paddingHorizontal: 20,
		paddingVertical: 8,
		marginBottom: 12,
		fontSize: 20,
		fontWeight: '300',
		width: '100%',
		backgroundColor: '#889',
		color: '#eee'
	}
})

export default NewQuote
