/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
const axios = require('axios');
import { apiKey } from 'react-native-dotenv'

class App extends Component {
  state = { 
    movie: 'Inception',
    metadata: [] 
  };

  componentWillMount(){
      axios.get('https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&language=en-US&query='+this.state.movie+'&page=1')
      .then(response => 
        {
          id = response.data.results[0].id;
          axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+apiKey)
          .then(response2 => this.setState({ metadata : response2.data }) )
          .catch(function (error) {
            alert(error);
          });
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.bigBlue}>{this.state.metadata.title}</Text>
        <Text style={styles.alignCenter}>Overview: {this.state.metadata.overview}</Text>
        <Text>Budget: ${this.state.metadata.budget}</Text>
        <Text>Revenue: ${this.state.metadata.revenue}</Text>
        <Text>Runtime: {this.state.metadata.runtime}</Text>
        <Text>Tagline: "{this.state.metadata.tagline}"</Text>
      </View>
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

export default App;