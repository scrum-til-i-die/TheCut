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
  constructor(props) {
    super(props);
    this.setPlayback = this.setPlayback.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      video: null,
      picture: null,
      recording: false,
      cameraPermission: false,
      playback: false
    }
  }

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

  setPlayback() {
    this.setState({ playback: false });
  }

  upload() {
    const { navigation } = this.props;
    navigation.push('waitingPage');
  }

  render() {
    const { recording, video, cameraPermission, playback } = this.state;

    return (
      <View
        style={styles.camWrapper}
      >
        {cameraPermission ? (
          <Camera
            ref={cam => (this.cam = cam)}
            style={styles.preview}
          >
            {video && (
              <TouchableOpacity
                onPress={function () {
                  // this._uploadVideo;
                }}
              >
              { playback &&
                <VideoPlayer 
                  videoURI = {video.uri} 
                  setPlayback={this.setPlayback}
                  upload={this.upload}
                >
                </VideoPlayer>
              }
              </TouchableOpacity>
            )}
            <View style={styles.content}>
                <TouchableOpacity
                  onPress={this.toogleRecord}
                  style={ 
                    playback ? 
                      styles.hidden 
                    : styles.buttonContainer
                  }
                >
                  <Text style={{ textAlign: "center" }}>
                    {recording &&
                    <View style={styles.circleInside}></View>}
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