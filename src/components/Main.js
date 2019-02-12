import React, {Component} from "react";
import {View,AsyncStorage,Dimensions,ListView} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body, Icon, Fab,Button,List,ListItem } from "native-base";
import Modal from "react-native-modal";
// console.disableYellowBox = true;

export default class extends Component{

  constructor(props) {
  super(props)
  this.state = {
      cc: [],
      isDetailsModalVisible: false,
      object: [],
      isDeleteModalVisible: false,
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
                <ListItem noBorder style={{height:100,marginBottom:25}} key={object.title}>
                <Card style={{ width:Dimensions.get('window').width - 30,marginTop:30}}>
                  <CardItem header button onPress={() => this.toggleDetailsModal(object)}>
                    <Text> {object.title} </Text>
                  </CardItem>
                  <CardItem button onPress={() => this.toggleDetailsModal(object)}>
                    <Body>
                      <Text>
                        {object.username}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
                </ListItem>
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
            this.state.cc.push(...ok);
            this.setState({ showLoading: false });
        });

      });
    }


    add = (navigate) => {
      navigate('Add')
    };

    toggleDetailsModal = (object) => {
      this.state.object = object;
      this.setState({ isDetailsModalVisible: !this.state.isDetailsModalVisible } );
    }

    toggleDeleteModal = (object) => {
      this.state.object = object;
      this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible } );
    }

    render(){
        const { navigate } = this.props.navigation;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          return(
            !this.state.showLoading &&
            <Container>
              <Content padder>

              <List
                rightOpenValue={-75}
                leftOpenValue={75}
                dataSource={ds.cloneWithRows(this.state.cc)}
                renderRow={data => data }
                renderRightHiddenRow={data =>
                  <Button full danger onPress={() => this.toggleDeleteModal(data)}>
                    <Icon active name="trash"/>
                  </Button>}
                renderLeftHiddenRow={data =>
                  <Button full primary onPress={() => alert('data')}>
                    <Icon active type="FontAwesome" name="edit"/>
                  </Button>}
              />


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

              <Modal transparent isVisible={this.state.isDetailsModalVisible} style={{ marginTop: Dimensions.get('window').height / 2 - 110}}>
                <View style={{ flex: 1 }}>
                <Card>
                    <CardItem header bordered>
                      <Text>{this.state.object.title}</Text>
                      <Button onPress={this.toggleDetailsModal} style={{
                        marginLeft: Dimensions.get('window').width / 2 + 50,
                        backgroundColor: 'white',
                        borderRadius:40,
                    }}>
                        <Text style={{color: 'black'}}>X</Text>
                      </Button>

                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text>
                          Username: {this.state.object.username}
                        </Text>
                        <Text style={{marginTop:10}}>
                          Password: {this.state.object.password}
                        </Text>
                        <Text style={{marginTop:10,marginBottom:20}}>
                          Description: {this.state.object.description}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </View>
              </Modal>

              <Modal transparent isVisible={this.state.isDeleteModalVisible} style={{ marginTop: Dimensions.get('window').height / 2 - 110}}>
                <View style={{ flex: 1 }}>
                <Button full danger onPress={() => this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible } )}>
                  <Text>Delete</Text>
                </Button>
                </View>
              </Modal>

            </Container>
          )

      }


}
