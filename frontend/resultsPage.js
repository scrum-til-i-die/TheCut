import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Content, List, ListItem, Text } from 'native-base';
const axios = require('axios');
import { apiKey } from 'react-native-dotenv'

class Results extends Component {
  state = {
    movie: 'jurassic park',
    metadata: []
  };

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=' + this.state.movie + '&page=1')
      .then(response => {
        id = response.data.results[0].id;
        axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey)
          .then(response2 => this.setState({ metadata: response2.data }))
          .catch(function (error) {
            alert(error);
          });
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
    const { navigation } = this.props

    return (
      <Container>

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

        <Button block dark onPress={function () { navigation.navigate("recordingModule") }}>
          <Text>Record Again</Text>
        </Button>

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