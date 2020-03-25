import React, { Component, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'native-base';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import api from './src/web';
import FormData from 'form-data';
class RecordingModule extends Component {
  state = {
    video: null,
    picture: null,
    recording: false,
    cameraPermission: false
  };

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
    this.setState({ recording: false }, () => {
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

  render() {
    const { recording, video, cameraPermission } = this.state;
    const { navigation } = this.props;

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
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 1,
              width: "100%"
            }}
          >
            {video && (
              <TouchableOpacity
                onPress={function () {
                  navigation.push('waitingPage');
                  // this._uploadVideo;
                }}
                style={{
                  padding: 20,
                  width: "100%",
                  backgroundColor: "#fff"
                }}
              >
                <Text style={{ textAlign: "center" }}>Upload</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={this.toogleRecord}
              style={{
                padding: 20,
                width: "100%",
                backgroundColor: recording ? "#ef4f84" : "#4fef97"
              }}
            >
              <Text style={{ textAlign: "center" }}>
                {recording ? "Stop" : "Record"}
              </Text>
            </TouchableOpacity>
          </Camera>) : (
            <Button large dark onPress={this._showCamera}>
            <Text style={{color:"white"}}>Record</Text>
          </Button>
          )}
      </View>
    );
  }
}

export default RecordingModule;