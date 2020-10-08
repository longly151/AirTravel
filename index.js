/**
 * @format
 */

import {
  AppRegistry,
  YellowBox,
} from 'react-native';
import moment from 'moment';
// import App from './src/app/app';
import App from './App';
import {
  name as appName,
} from './app.json';
import 'react-native-gesture-handler';
import 'moment/locale/vi';

moment.locale('vi');

YellowBox.ignoreWarnings([
  'Cannot update during an existing state transition',
  'Require cycle: node_modules/',
]);
AppRegistry.registerComponent(appName, () => App);
