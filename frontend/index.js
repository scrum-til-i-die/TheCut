/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import RecordingModule from './recordingModule'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RecordingModule);
