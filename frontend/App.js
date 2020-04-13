import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import recordingModule from './src/screens/recordingModule';
import waitingPage from './waitingPage';
import resultsPage from './src/screens/resultsPage';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Results">
          <Stack.Screen 
            name="recordingModule" 
            component={recordingModule} 
            options={{ 
              title: 'Record', 
              headerShown: false, 
            }} 
          />
          <Stack.Screen 
            name="waitingPage" 
            component={waitingPage} 
            options={{ 
              title: 'Processing',
              headerShown: false, 
            }} 
          />
          <Stack.Screen 
            name="resultsPage" 
            component={resultsPage} 
            options={{ 
              title: 'Results',
              headerShown: false,
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
