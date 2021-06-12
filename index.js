/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import provider from './provider';

AppRegistry.registerComponent(appName, () => provider);
