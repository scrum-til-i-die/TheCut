import React, { Component } from 'react';
import { Text, TouchableOpacity, MediaLibrary } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
class RecordingModule extends Component {
  state = {
    video: null,
    picture: null,
    recording: false
  };

  _uploadVideo = async () => {
    const { video } = this.state;
    // video.uri
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
        console.log(video.uri);
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

  permissionCheck = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted" && statusRoll === "granted") {
      return Camera;
    } else {
      console.log("permission not granted!")
    }
  }

  render() {
    this.permissionCheck();

    const { recording, video } = this.state;
    return (
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
            onPress={this._uploadVideo}
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
      </Camera>
    );
  }
}

export default RecordingModule;