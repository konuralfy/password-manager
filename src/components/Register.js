import React, {Component} from "react";
import {View,AsyncStorage,TextInput,StyleSheet,BackHandler} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label,Textarea,Button,Text,Toast } from 'native-base';
import { ConfirmDialog } from 'react-native-simple-dialogs';


export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username   : '',
      password: '',
      confirmPassword: '',
      isExitModalVisible: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  };
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      this.setState({ isExitModalVisible: !this.state.isExitModalVisible })
      return true;
  }
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  saveToStorage = async (navigate) => {
    const details = {
      username : this.state.username,
      password: this.state.password,
      checkbox: false,
    };

       newDetails = [];
       newDetails.push(details);
       await AsyncStorage.setItem('userDetails', JSON.stringify(newDetails))
       .then(() => {
         navigate('Login');
         Toast.show({
           text: "Registered successfully !",
           textStyle: { color: "white" },
         });
       })
       .catch((e) => {
         alert(e);
       })
}

  confirmPassword(navigate){
    if(this.state.password == this.state.confirmPassword){
      this.saveToStorage(navigate);
    }else{
      Toast.show({
        text: "Your passwords do not match.",
        textStyle: { color: "white" },
      });
    }
  }


    render(){
      const { navigate } = this.props.navigation;
        return(
          <Container>
            <Content padder>
            <View style={styles.titleView}>
            <Text style={styles.title}>Hey there! Thanks for using uPass. We need you to create a username and a password just for the first time of being here.</Text>
            </View>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input onChangeText={(username) => this.setState({username})} />
                </Item>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input autoCapitalize='none' onChangeText={(password) => this.setState({password})} />
                </Item>
                <Item floatingLabel style={{ marginBottom: 30 }}>
                  <Label>Confirm Password</Label>
                  <Input onChangeText={(confirmPassword) => this.setState({confirmPassword})} />
                </Item>


              </Form>
              <Button block
              bordered
              style={{ marginTop: 50 }}
              onPress={() => this.confirmPassword(navigate)}>
                <Text>Register</Text>
              </Button>
            </Content>

            <ConfirmDialog
                title={"Exit App"}
                message="Do you want to exit?"
                visible={this.state.isExitModalVisible}
                onTouchOutside={() =>  this.setState({ isExitModalVisible: !this.state.isExitModalVisible })}
                positiveButton={{
                    title: "YES",
                    onPress: () => BackHandler.exitApp()
                }}
                negativeButton={{
                    title: "NO",
                    onPress: () => this.setState({ isExitModalVisible: !this.state.isExitModalVisible })
                }}
            />
          </Container>
        )
    }
}


const styles = StyleSheet.create({
  titleView: {
    margin:20
  },
  title: {
    justifyContent: 'center'
  }
});
