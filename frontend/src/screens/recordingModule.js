import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import api from '../web';
import FormData from 'form-data';
import styles from './styles';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from '../components/VideoPlayer'

class RecordingModule extends Component {
  state = {
    video: null,
    picture: null,
    recording: false,
    cameraPermission: false,
    playback: false
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ cameraPermission: true });
    } else {
      return <Text>No access to camera</Text>;
    }
  }

  _uploadVideo = async () => {
    const { video } = this.state;
    const type = 'video/mp4';
    const uri = video.uri;

    // Form object for video file
    const data = new FormData();
    data.append("video", {
      name: uri,
      type,
      uri
    });

    api.uploadVideo(data);
  };

  _StopRecord = async () => {
    this.setState({ 
      recording: false,
      playback: true 
    }, () => {
      this.cam.stopRecording();
    });
  };

  _StartRecord = async () => {
    if (this.cam) {
      this.setState({ recording: true }, async () => {
        const video = await this.cam.recordAsync();
        this.setState({ video });
      });
    }
  };

  toogleRecord = () => {
    const { recording } = this.state;
    console.log("hi");

    if (recording) {
      this._StopRecord();
    } else {
      this._StartRecord();
    }
  };


  _showCamera = async () => {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ cameraPermission: true });
    } else {
      return <Text>No access to camera</Text>;
    }
  };

  render() {
    const { recording, video, cameraPermission} = this.state;
    const { navigation } = this.props;
    const { width, height } = Dimensions.get('window');

    console.log("cameraPermission", this.state.cameraPermission);

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: "100%"
        }}
      >
        {cameraPermission ? (
          <Camera
            ref={cam => (this.cam = cam)}
            style={styles.preview}
          >
            {video && (
              <TouchableOpacity
                onPress={function () {
                  navigation.navigate('waitingPage');
                  // this._uploadVideo;
                }}
                // style={{
                //   padding: 0,
                //   width: "100%",
                //   backgroundColor: "#fff"
                // }}
              >
              {/* {this.state.playback ?
                <View>
                  <Ionicons 
                    name="md-close"
                    style={{ position: 'absolute', zIndex: 1, bottom: 10, left: 10 }}
                    size={64} color="black"
                    onPress={this.stopPlayback}
                  />
                  <Video
                    source={{ uri: this.state.video.uri }}
                          shouldPlay
                          isLooping
                    resizeMode="cover"
                    style={{ width, height }}
                  />
                </View>

                : <Text>r</Text>} */}
              <VideoPlayer videoURI = {this.state.video.uri} playback = {this.state.playback}></VideoPlayer>
              </TouchableOpacity>
            )}
            <View style={styles.content}>
            <TouchableOpacity
              onPress={this.toogleRecord}
              style={styles.buttonContainer}
            >
              <Text style={{ textAlign: "center" }}>
                {recording ? 
                <View style={styles.circleInside}></View> : ""}
              </Text>
            </TouchableOpacity>
            </View>
          </Camera>) : (
            <TouchableOpacity onPress={this._showCamera}>
              <Text> Record </Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

export default RecordingModule;