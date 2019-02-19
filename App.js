import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, BackHandler} from 'react-native';
import { Root } from "native-base";
import Login from './src/components/Login';
import Main from './src/components/Main';
import Add from './src/components/Add';
import Register from './src/components/Register';

import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';



const RootStack  = createStackNavigator({
  Login:{
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  Main:{
    screen: Main,
    navigationOptions: {
      header: null,
    }
  },
    Add:{
      screen: Add,
      navigationOptions: {
        title: 'Add New',
      }
    },
    Register:{
      screen: Register,
      navigationOptions: {
        title: 'Register',
      }
    },
  }
);

const App = createAppContainer(RootStack);

export default () =>
  <Root>
    <App />
  </Root>;
