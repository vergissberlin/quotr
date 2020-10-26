import React, { Component } from 'react'
import { Button, View } from 'react-native';

class StyledButton extends Component {
	render() {
		const { visible, style, title } = this.props;
		if (!visible)
			return null;
		return (
			<View style={this.props.style}>
				<Button
					title={this.props.title}
					onPress={() => this.props.onPress()}
					color="#189" />
			</View>
		)
	}
}

export default StyledButton
