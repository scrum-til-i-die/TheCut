import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Content, List, ListItem, Text } from 'native-base';
const axios = require('axios');
import api from '../web';
import GLOBAL from '../global.js';

class Results extends Component {
  state = {
    movie: null,
    metadata: []
  };

  async componentDidMount() {
    const response = await api.getResults(GLOBAL.job_id);
    this.setState({ movie: response.data.movie_id });
  }

  render() {

    const { navigation } = this.props

    return (
      <Container>
        <Text>{this.state.movie}</Text> 
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

            <ListItem>
              <Text>Budget: ${this.state.metadata.budget}</Text>
            </ListItem>

            <ListItem>
              <Text>Revenue: ${this.state.metadata.revenue}</Text>
            </ListItem>

            <ListItem>
              <Text>Tagline: {this.state.metadata.tagline}</Text>
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