import React, {Component} from "react";
import {View,AsyncStorage} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body, Icon, Fab } from "native-base";


export default class extends Component{

  async storage(){
     return AsyncStorage.getAllKeys().then(ks => {
        return ks.map(async (k) => {
          await AsyncStorage.getItem(k).then(ok => {
            return ok;
          });
        })
      })
  };

  getAll(){
    this.storage()
      .then(items =>{
        alert(JSON.stringify(items));
      })
      .catch(err =>{
        alert('ee');
      });
  };


  createCards (){
    var cards = [];

    for(let i = 0; i < 7; i++){

      cards.push(

        <Card key="">
          <CardItem header button onPress={() => this.getAll()}>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem button onPress={() => alert("This is Card Body")}>
            <Body>
              <Text>
                Click on any carditem
              </Text>
            </Body>
          </CardItem>
        </Card>

      )
    }
    return cards
  }


    add = (navigate) => {
      navigate('Add')
    };

    render(){
      const { navigate } = this.props.navigation;

        return(
          <Container>
            <Content padder>
            {this.createCards()}
            </Content>
            <View>
                <Fab
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: '#5067FF' }}
                  position="bottomRight"
                  onPress={() => this.add(navigate)}>
                  <Icon name="add" />

                </Fab>
            </View>
          </Container>
        )
    }
}
