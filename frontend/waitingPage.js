import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Spinner, Content, Text, Button } from 'native-base';

class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: true,
      processingAfter10: false,
      errored: false,
      finished: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ processingAfter10: true });
    }, 10000);
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
            Sorry, we cannot generate a result right now. Please wait as we continue processing you video.
          </Text>
          <Spinner />
          <Button>
            <Text
              onPress={function () {
                navigation.navigate('recordingModule');
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
    } else if (props.finished && !props.errored && !props.processing) {
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