/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AppRegistry
} from 'react-native';
import Login from './src/Components/Login';
import { name as appName } from './app.json';
import AppNavigation from './src/Components/AppNavigation';
import Splash from './src/Components/Splash';
export default class Main extends Component {
  render() {
    return (
      <AppNavigation />
    )
  }
}
