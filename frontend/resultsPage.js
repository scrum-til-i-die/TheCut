import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
const axios = require('axios');
import { apiKey } from 'react-native-dotenv'

class Results extends Component {
  state = {
    movie: 'jurassic world',
    metadata: []
  };

  componentWillMount() {
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
    return (<Container>
      <Header />
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>Movie Title</Text>
          </ListItem>
          <ListItem>
            <Text>{this.state.metadata.title}</Text>
          </ListItem>

          <ListItem itemDivider>
            <Text>Overview</Text>
          </ListItem>
          <ListItem>
            <Text>{this.state.metadata.overview}</Text>
          </ListItem>

          <ListItem itemDivider>
            <Text>Budget</Text>
          </ListItem>
          <ListItem>
            <Text>${this.state.metadata.budget}</Text>
          </ListItem>

          <ListItem itemDivider>
            <Text>Revenue</Text>
          </ListItem>
          <ListItem>
            <Text>${this.state.metadata.revenue}</Text>
          </ListItem>

          <ListItem itemDivider>
            <Text>Runtime</Text>
          </ListItem>
          <ListItem>
            <Text>{this.state.metadata.runtime} min</Text>
          </ListItem>

          <ListItem itemDivider>
            <Text>Tagline</Text>
          </ListItem>
          <ListItem>
            <Text>{this.state.metadata.tagline}</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  alignCenter: {
    textAlign: 'center',
    width: 200,
    padding: 10
  }

});

export default Results;