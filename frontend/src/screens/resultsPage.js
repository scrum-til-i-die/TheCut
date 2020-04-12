import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Content, List, ListItem, Text } from 'native-base';
import api from '../web';
import GLOBAL from '../global.js';
import { Ionicons } from '@expo/vector-icons';

class Results extends Component {
  state = {
    metadata: {
      title: '',
      genres: '',
      overview: '',
      runtime: ''
    }
  };

  async componentDidMount() {
    await api.getResults(GLOBAL.job_id).then({
      function(res) {
        console.log(res.data.result.title)
        this.setState({ metadata: res.data.result });
      }
    });
  }

  render() {
    // const {metadata} = this.state;
    const { navigation } = this.props

    return (
      <Container>
        <Text>{this.state.metadata.title}</Text>
        <Ionicons 
					name="md-arrow-forward"
					style={{ 
						position: 'absolute', 
						zIndex: 1,
						left: width - 70,
						bottom: 10
					}}
					size={48}
					color="white"
					onPress={() => {
						navigation.push('waitingPage');
					}}
				/>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text >Movie Title</Text>
            </ListItem>

            <Text style={styles.movieTitle}>{this.state.metadata.title}</Text>

            <ListItem itemDivider>
              <Text>Overview</Text>
            </ListItem>

            <ListItem>
              <Text>{this.state.metadata.overview}</Text>
            </ListItem>

            <ListItem itemDivider>
              <Text>Details</Text>
            </ListItem>

            <ListItem>
              <Text>Runtime: {this.state.metadata.runtime} min</Text>
            </ListItem>
          </List>
        </Content>

        {/* <Button block dark onPress={function () { navigation.push("recordingModule") }}>
          <Text>Record Again</Text>
        </Button> */}

      </Container>
    )
  }
};

const styles = StyleSheet.create({
  movieTitle: {
    textAlign: 'center',
    fontSize: 25,
    padding: 20
  },
  card: {
    alignItems: 'center',
    padding: 40,
    marginTop: 170
  }
});

export default Results;