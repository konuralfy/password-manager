import React, {Component} from "react";
import {View,AsyncStorage} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body, Icon, Fab,Button } from "native-base";
import Modal from "react-native-modal";


export default class extends Component{

  constructor(props) {
  super(props)
  this.state = {
      cc: [],
      isModalVisible: false,
      object: []
    }
  }

  async _retrieveData(){
    try {
      const value = await AsyncStorage.getAllKeys();
      return value;
    } catch (error) {
      // Error retrieving data
    }
  };

  getAll(){
    return this._retrieveData()
      .then(async (items) =>{
        var cards = [];

        for(var i=0; i<items.length;i++){
          await AsyncStorage.getItem(items[i]).then(ok => {
            var object = JSON.parse(ok.substring(1,ok.length-1));
              cards.push(
                <Card key="">
                  <CardItem header button onPress={() => this._toggleModal(object)}>
                    <Text> {object.title} </Text>
                  </CardItem>
                  <CardItem button onPress={() => this._toggleModal(object)}>
                    <Body>
                      <Text>
                        {object.username}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              )
          });
        }
        return cards;

      })
      .catch(err =>{
        alert(err);
      });
    };

    componentWillMount(){
      this.props.navigation.addListener('willFocus', (route) => {

        this.setState({ showLoading: true});
        this.getAll().then(ok => {
            this.state.cc = [];
            this.state.cc.push(ok);
            this.setState({ showLoading: false });
        });

      });
    }


    add = (navigate) => {
      navigate('Add')
    };

    _toggleModal = (object) => {
      this.state.object = object;
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    render(){
        const { navigate } = this.props.navigation;
          return(
            !this.state.showLoading &&
            <Container>
              <Content padder>
              {this.state.cc}
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

              <Modal transparent isVisible={this.state.isModalVisible}>
                <View style={{ flex: 1 }}>
                <Card>
                    <CardItem header bordered>
                      <Text>{this.state.object.title}</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text>
                          Username: {this.state.object.username}
                        </Text>
                        <Text>
                          Password: {this.state.object.password}
                        </Text>
                        <Text>
                          Description: {this.state.object.description}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                  <Button onPress={this._toggleModal}>
                    <Text>Hide me!</Text>
                  </Button>
                </View>
              </Modal>

            </Container>
          )

      }


}
