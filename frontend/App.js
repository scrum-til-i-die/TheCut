import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

class RecordingModule extends Component {
  state = {
    video: null,
    picture: null,
    recording: false,
    cameraPermission: false
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

  _showCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ cameraPermission: true });
    } else {
      return <Text>No access to camera</Text>;
    }
  };

  render() {
    const { recording, video, cameraPermission } = this.state;
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