import React, {Component} from "react";
import {View,AsyncStorage,Dimensions,ListView,BackHandler} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body, Icon, Fab,Button,List,ListItem,Toast,Input,Form,Item,Textarea } from "native-base";
import Modal from "react-native-modal";
import { ConfirmDialog } from 'react-native-simple-dialogs';
console.disableYellowBox = true;

export default class extends Component{

  constructor(props) {
  super(props)
  this.state = {
      cc: [],
      isDetailsModalVisible: false,
      isDeleteModalVisible: false,
      isEditModalVisible: false,
      isExitModalVisible: false,
      object: [],
      title: '',
      username   : '',
      password: '',
      description: '',
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      this.setState({ isExitModalVisible: !this.state.isExitModalVisible })
      // this.props.navigation.goBack(null);
      return true;
  }



  async _updateData(){
    const details = {
      title: this.state.title,
      username : this.state.username,
      password: this.state.password,
      description: this.state.description,
    };
    updateData = [];
    updateData.push(details);
    await AsyncStorage.setItem(this.state.object.key, JSON.stringify( updateData )).then(() => {
      this.setState({ isEditModalVisible: false});
      this.reloadPage();
      Toast.show({
        text: "Updated successfully !",
        textStyle: { color: "white" },
      })
    });

  }

  async _deleteData(key) {
    try {
      await AsyncStorage.removeItem(key);
      this.setState({ isDeleteModalVisible: false});
      this.reloadPage();
      Toast.show({
        text: "Deleted !",
        textStyle: { color: "white" },
      })
    }
    catch(exception) {
      return false;
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
            if(items[i] !== "userDetails"){
              cards.push(
                <ListItem noBorder style={{height:100,marginBottom:25}} key={items[i]}>
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
            }
          });
        }
        return cards;

      })
      .catch(err =>{
        alert(err);
      });
    };

    componentWillMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.props.navigation.addListener('willFocus', (route) => {
        this.reloadPage();
      });
    }

  reloadPage(){
    this.setState({ showLoading: true});
    this.getAll().then(ok => {
        this.state.cc = [];
        this.state.cc.push(...ok);
        this.setState({ showLoading: false });
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
      if(object.key){
          AsyncStorage.getItem(object.key).then((value) => {
              var object = JSON.parse(value.substring(1,value.length-1));
              this.setState({title: object.title});
              this.setState({username: object.username});
              this.setState({password: object.password});
              this.setState({description: object.description});
          })
          .then(res => {
            this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible } );
          });
      }else{
        this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible } );
      }
    }

    toggleEditModal = (object) => {
      this.state.object = object;
      if(object.key){
          AsyncStorage.getItem(object.key).then((value) => {
              var object = JSON.parse(value.substring(1,value.length-1));
              this.setState({title: object.title});
              this.setState({username: object.username});
              this.setState({password: object.password});
              this.setState({description: object.description});
          })
          .then(res => {
            this.setState({ isEditModalVisible: !this.state.isEditModalVisible } );
          });
      }else{
        this.setState({ isEditModalVisible: !this.state.isEditModalVisible } );
      }

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
                  <Button full primary onPress={() => this.toggleEditModal(data)}>
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

              <Modal transparent isVisible={this.state.isEditModalVisible} style={{ marginTop: Dimensions.get('window').height / 2 - 300}}>
                <View style={{ flex: 1 }}>
                <View style={{ height: 400,backgroundColor:'white' }}>
                <Form>

                <Item style={{ borderColor: 'transparent' }}>
                  <Button onPress={this.toggleEditModal} style={{
                      marginLeft: Dimensions.get('window').width / 2 + 100,
                      marginTop: 5,
                      backgroundColor: 'white',
                      borderRadius:40,
                    }}>
                    <Text style={{color: 'black'}}>X</Text>
                  </Button>
                </Item>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Text style={{marginRight: 58}}>Title</Text>
                    <Input placeholder="Title" value={this.state.title} onChangeText= {(title) => this.setState({title: title})}/>
                  </Item>
                  <Item style={{ borderColor: 'transparent' }}>
                      <Text style={{marginRight: 20}}>Username</Text>
                      <Input placeholder="Username" value={this.state.username} onChangeText= {(username) => this.setState({username: username})}/>
                  </Item>
                  <Item style={{ borderColor: 'transparent' }}>
                      <Text style={{marginRight: 20}}>Password</Text>
                      <Input placeholder="Password" value={this.state.password} onChangeText= {(password) => this.setState({password: password})}/>
                  </Item>
                  <Item style={{ borderColor: 'transparent' }}>
                      <Text style={{marginRight: 20}}>Description</Text>
                  </Item>
                  <Item style={{ borderColor: 'transparent' }}>
                  <Textarea rowSpan={4}
                  value={this.state.description}
                   bordered
                   placeholder="Description"
                   style={{ width: Dimensions.get('window').width / 2 + 100,marginTop:10 }}
                   onChangeText= {(description) => this.setState({description: description})}
                   />
                  </Item>
                  <Item style={{ borderColor: 'transparent' }}>
                      <Button primary style={{marginLeft: 120,marginTop:10}} onPress={() => this._updateData()}><Text>Update</Text></Button>
                  </Item>
                  </Form>
                </View>
                </View>
              </Modal>


              <ConfirmDialog
                  title={"Delete " + `${this.state.title}`}
                  message="Are you sure about that?"
                  visible={this.state.isDeleteModalVisible}
                  onTouchOutside={() =>  this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible })}
                  positiveButton={{
                      title: "YES",
                      onPress: () => this._deleteData(this.state.object.key)
                  }}
                  negativeButton={{
                      title: "NO",
                      onPress: () => this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible })
                  }}
              />

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
