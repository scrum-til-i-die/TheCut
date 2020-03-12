import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import recordingModule from './recordingModule';
import waitingPage from './waitingPage';
import resultsPage from './resultsPage';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Results">
          <Stack.Screen name="recordingModule" component={recordingModule} options={{ title: 'Record' }} />
          <Stack.Screen name="waitingPage" component={waitingPage} options={{ title: 'Processing' }} />
          <Stack.Screen name="resultsPage" component={resultsPage} options={{ title: 'Results' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
