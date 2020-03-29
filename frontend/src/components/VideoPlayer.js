import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {

	static propTypes = {
		videoURI: PropTypes.any,
		setPlayback: PropTypes.any,
		upload: PropTypes.any,
  }
	
	render() {
		const { width, height } = Dimensions.get('window');
		return (
			<View>
				<Ionicons 
					name="md-close"
					style={{ 
						position: 'absolute', 
						zIndex: 1, 
						bottom: 10, 
						left: 10 
					}}
					size={48}
					color="white"
					onPress={() => {this.props.setPlayback()}}
				/>
				<Ionicons 
					name="md-arrow-forward"
					style={{ 
						position: 'absolute', 
						zIndex: 1,
						left: width - 70,
						bottom: 10
					}}
					size={48}
					color="white"
					onPress={() => {
						this.props.upload()
						this.props.setPlayback()
					}}
				/>
				<Video
					source={{ uri: this.props.videoURI }}
					shouldPlay
					isLooping
					resizeMode="cover"
					style={{ width, height }}
				/>
			</View>
		);
	}
}
	
export default VideoPlayer;