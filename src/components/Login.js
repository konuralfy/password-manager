import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

export default class Login extends Component {

  constructor(props) {
    super(props);
    state = {
      username   : '',
      password: '',
    }
  };

  login = (navigate) => {
    if(this.state.username == 'konuralp' && this.state.password == 'konuralp'){
      navigate('Main')
      title="Main";
    }else{
      Alert.alert('Wrong username or password');
    }
  };
  static navigationOptions={
      title:"Login"
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{uri: `data:image/png;base64,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`}}/>
      </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: `data:image/png;base64,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
`}}/>
          <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: `data:image/png;base64,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
`}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login(navigate)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius:10,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:30,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#40c4ff",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,

  },
  loginText: {
    color: '#40c4ff',
  },
  logoContainer: {
    marginTop: 100,
    marginBottom: 100
  },
  logo: {
    width:200,
    height:100,
    marginLeft:15,
    justifyContent: 'center'
  }
});
