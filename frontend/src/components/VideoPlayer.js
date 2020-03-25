import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types'	

class VideoPlayer extends Component {

	static propTypes = {
		videoURI: PropTypes.any,
  	}
	
	constructor(...props) {
    super(...props);
    this.state = {
      playback: true,
		};
	}

  stopPlayback = () => {
    this.setState({ playback: false });
  };

	render() {
		const { width, height } = Dimensions.get('window');
		if (this.state.playback) {
			return (
				<View>
					<Ionicons 
						name="md-close"
						style={{ position: 'absolute', zIndex: 1, bottom: 10, left: 10 }}
						size={64} color="black"
						onPress={this.stopPlayback}
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
		} else { return null;}
	}
}
	
export default VideoPlayer;