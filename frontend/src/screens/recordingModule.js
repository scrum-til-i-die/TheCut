import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import api from '../web';
import FormData from 'form-data';
import styles from './styles';
import GLOBAL from '../global.js';
import VideoPlayer from '../components/VideoPlayer'
import moment from 'moment';

class RecordingModule extends Component {
  constructor(props) {
    super(props);
    this.setPlayback = this.setPlayback.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      video: null,
      recording: false,
      cameraPermission: false,
      playback: false,
      time: 0
    }
  }

  async componentDidMount() {
    GLOBAL.job_id = null;
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ cameraPermission: true });
    } else {
      return <Text>No access to camera</Text>;
    }
  }

  _StopRecord = async () => {
    if (this.state.time < 10) {
      Alert.alert(
        "Warning",
        "Please record more than 10 seconds.",
        [{
          text: 'OK', onPress: () => {
            this.setState({
              recording: false
            });
          }
        }])
    } else {
      this.setState({
        recording: false,
        playback: true
      });
    }
    this.cam.stopRecording();
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
      this.stopTimer();

    } else {
      this._StartRecord();
      this.startTimer();

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

  upload = async () => {
    const { navigation } = this.props;
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
    navigation.push('resultsPage');

    await api.uploadVideo(data).then(
      function(response) {
        GLOBAL.job_id = response.data.job_id;
      });
    
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const time = this.state.time + 1;
      this.setState({ time });
    }, 1000);
  }

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.setState({ time: 0 });
    }
  }
  convertTimeString = (time) => {
    return moment().startOf('day').seconds(time).format('mm:ss');
  }

  render() {
    const { recording, video, cameraPermission, playback, time } = this.state;

    return (
      <View
        style={styles.camWrapper}
      >
        {cameraPermission ? (
          <Camera
            ref={cam => (this.cam = cam)}
            style={styles.preview}
          >
          <Text style={styles.timer}>
            {recording &&
          <Text>●{this.convertTimeString(time)}</Text>}
        </Text>
          </Camera>) :
          <TouchableOpacity onPress={this._showCamera}>
            <Text> Record </Text>
          </TouchableOpacity>
        }
        
        { video && playback &&
          <VideoPlayer 
            videoURI = {video.uri} 
            setPlayback={this.setPlayback}
            upload={this.upload}
          ></VideoPlayer>
        }
        <View style={styles.content}>
          <TouchableOpacity
            onPress={this.toogleRecord}
            style={ 
              playback ? 
                styles.hidden 
              : styles.buttonContainer
            }>
            <Text style={{ textAlign: "center" }}>
              {recording &&
              <View style={styles.circleInside}></View>}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RecordingModule;