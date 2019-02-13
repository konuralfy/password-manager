import React, {Component} from "react";
import {View,AsyncStorage,TextInput} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label,Textarea,Button,Text,Toast } from 'native-base';


export default class extends Component{
  constructor(props) {
    super(props);
    state = {
      title: '',
      username   : '',
      password: '',
      description: '',
    }
  };

  saveToStorage = async (navigate) => {
    const details = {
      title: this.state.title,
      username : this.state.username,
      password: this.state.password,
      description: this.state.description,
    };
    const existing = await AsyncStorage.getItem(details.title);
    let newDetails = JSON.parse(existing);

    if( !newDetails ){
       newDetails = [];
       newDetails.push(details);
       await AsyncStorage.setItem('_'+details.title, JSON.stringify(newDetails))
       .then(() => {
         navigate('Main');
         Toast.show({
           text: "Added successfully !",
           textStyle: { color: "white" },
         });
       })
       .catch(() => {
         alert("Error while saving");
       })
     }else{
       alert(details.title + " already exists!");
     }
}

    render(){
      const { navigate } = this.props.navigation;
        return(
          <Container>
            <Content padder>
              <Form>
                <Item floatingLabel style={{ marginBottom: 30 }}>
                  <Label>Title</Label>
                  <Input onChangeText={(title) => this.setState({title})} />
                </Item>
                <Item floatingLabel>
                  <Label>Username / E-mail</Label>
                  <Input autoCapitalize='none' onChangeText={(username) => this.setState({username})} />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input autoCapitalize='none' onChangeText= {(password) => this.setState({password})} />
                </Item>

                <Textarea rowSpan={5}
                 bordered
                 placeholder="Description"
                 style={{ marginTop: 60 }}
                 onChangeText= {(description) => this.setState({description})}
                 />

              </Form>
              <Button block
              bordered
              style={{ marginTop: 50 }}
              onPress={() => this.saveToStorage(navigate)}
              >
                <Text>Add</Text>
              </Button>
            </Content>
          </Container>
        )
    }
}
