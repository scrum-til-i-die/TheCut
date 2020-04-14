import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import api from '../web';
import GLOBAL from '../global.js';

class Results extends Component {
  constructor() {
    super();
    this.timer = null;
  }
  state = {
    metadata: {
      title: 'Not Found',
      overview: 'Unknown',
      runtime: '0',
      genres: 'Unknown',
    },
    loading: true,
  };
  
  async componentDidMount() {
    this.timer = setInterval(async () => {
      if (GLOBAL.job_id != null) {
        await api.getResults(GLOBAL.job_id).then(res => {
          if (res.data.status === "success") {
            this.setState({ loading: false });
            clearInterval(this.timer);
            GLOBAL.job_id = null;
            this.setState({ metadata: res.data.result});
          }
          else if (res.data.status === "fail") {
            clearInterval(this.timer);
            this.setState({ loading: false });
          }
        })
      }
    }, 3000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        {this.state.loading &&

          <Overlay isVisible>
            <View style={styles.loading}>
              <Text>Your request is being processed</Text>
              
              <ActivityIndicator size='large' />
              <Text onPress={() => {
                this.setState({ loading: false}); 
                clearInterval(this.timer);
                GLOBAL.job_id = null;
                navigation.push('recordingModule');  
              }}>Cancel</Text>
            </View>
        
        </Overlay>
        }
        <Text>{this.state.metadata.title}</Text>
        <Ionicons 
          name="md-home"
          style={{ 
            position: 'absolute',
            zIndex: 1,
            right: 50,
            top: 20
          }}
          size={48}
          color="black"
          onPress={() => {
            navigation.push('recordingModule');
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

            <ListItem>
              <Text>Genres: {this.state.metadata.genres}</Text>
            </ListItem>
          </List>
        </Content>
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
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Results;