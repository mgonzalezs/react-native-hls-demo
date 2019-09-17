import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import TrackPlayer from "react-native-track-player";

TrackPlayer.setupPlayer({
  iosCategoryMode: "AVAudioSessionModeSpokenAudio",
  stopWithApp: true
});

TrackPlayer.updateOptions({
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_STOP
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_STOP
  ]
});

export default class App extends Component {
  playTemporaryPlaylist = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add([
        {
          id: "1111",
          url:
            "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_audio_1_stereo_128000.m3u8",
          title: "m3u8 only",
          artist: "Test",
          artwork: "https://picsum.photos/200",
          type: "hls"
        }
      ]);
      await TrackPlayer.play();
      return;
    }

    // if (playing) {
    //   await TrackPlayer.pause();
    // } else {
    await TrackPlayer.play();
    // }
  };

  pause = async () => {
    await TrackPlayer.pause();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to HSL Test!</Text>
        <Button title="Play HLS file" onPress={() => this.playTemporaryPlaylist()} />
        <Button title="Pause" onPress={() => this.pause()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
