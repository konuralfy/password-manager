import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Login from './src/components/Login';
import Main from './src/components/Main';
import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';

const RootStack  = createStackNavigator({
    Login:{
      screen: Login
    },
    Main:{
      screen: Main
    }
  }
);

const App = createAppContainer(RootStack);

export default App;
