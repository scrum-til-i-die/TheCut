import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Spinner, Content, Text, Button } from 'native-base';

class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      errored: false,
      finished: true
    }
  }

  renderWaitingText = (props) => {
    const { navigation } = this.props;
    if (props.processing && !props.errored) {
      return (
        <View style={styles.card}>
          <Text style={{ fontSize: 20 }}>The video is being processed.</Text>
          <Spinner />
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
    const { navigation } = this.props;
    const { processing, errored, finished } = this.state;
    return (
      <Container>
        <Content>
          <this.renderWaitingText processing={processing} errored={errored} finished={finished} />
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