import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Content, List, ListItem, Text } from 'native-base';
import api from '../web';
import GLOBAL from '../global.js';
import { Ionicons } from '@expo/vector-icons';

class Results extends Component {
  state = {
    metadata: {
    }
  };
  
  async componentDidMount() {
    const { route } = this.props;
    this.setState({ metadata: route.params });
  }

  componentWillUnmount(){
    this.setState({ metadata: {} });
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
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