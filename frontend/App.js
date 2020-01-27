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
        {for (var m in response.data.results) {
          if (response.data.results[m].title == this.state.movie) { 
            id = response.data.results[m].id;
            axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+apiKey)
            .then(response2 => this.setState({ metadata : response2.data }) )
            .catch(function (error) {
              alert(error);
            });
          }
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>{this.state.movie}</Text>
        <Text>{this.state.metadata.budget}</Text>
        <Text>{this.state.metadata.tagline}</Text>
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
});

export default App;