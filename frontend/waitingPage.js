import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Spinner, Content, Text, Button } from 'native-base';
import api from './src/web';
import GLOBAL from './src/global.js';

class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: true,
      processingAfter10: false,
      errored: false,
      finished: false,
      timer: 0,
    }
  }

  componentDidMount() {
    var timeout = setTimeout(() => {
      this.setState({ processingAfter10: true });
    }, 10000);
    let timer = setInterval(async () => {
      const { navigation } = this.props;
      console.log(GLOBAL.job_id);
      if (GLOBAL.job_id != null) {
        await api.getResults(GLOBAL.job_id).then(function(res) {
          if (res.data.status != "running") {
            clearInterval(timer);
            clearTimeout(timeout);
            navigation.push('resultsPage', res.data.result);
          }
        })
      }
    }, 3000);
    this.setState({ timer: timer });
  }

  componentWillUnmount(){
    clearInterval(this.state.timer);
  }

  renderWaitingText = (props) => {
    const { navigation } = this.props;
    if (props.processing && !props.errored && !props.processingAfter10) {
      return (
        <View style={styles.card}>
          <Text style={{ fontSize: 20 }}>
            We are processing your video.
          </Text>
          <Spinner />
        </View>
      )
    } else if (props.processing && props.processingAfter10) {
      return (
        <View style={styles.card}>
          <Text style={{ fontSize: 20 }}>
            Sorry, we cannot generate a result right now. Please wait as we continue processing your video.
          </Text>
          <Spinner />
          <Button>
            <Text
              onPress={function () {

                navigation.push('recordingModule'); // navigate regardless of the existing nav history
              }}>
              Cancel
            </Text>
          </Button>
        </View>
      )
    } else if (props.errored && !props.processing) {
      return (
        <View style={styles.card}>
          <Text style={{ fontSize: 20 }}>There was an error, try again later.</Text>
          <Spinner color='red' />
        </View>
      )
    } else if (props.finished) {
      return (
        <View style={styles.card}>
          <Text style={{ fontSize: 20, padding: 10 }}>Your video is processed. </Text>
          <Button block success
            onPress={function () {
              navigation.navigate('resultsPage');
            }}
          >
            <Text>View Result</Text>
          </Button>
        </View>
      )
    }
  }

  render() {
    const { processing, processingAfter10, errored, finished } = this.state;
    return (
      <Container>
        <Content>
          <this.renderWaitingText processing={processing} processingAfter10={processingAfter10} errored={errored} finished={finished} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 40,
    marginTop: 170
  }
});

export default Waiting;