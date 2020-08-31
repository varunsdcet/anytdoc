import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
import * as EmailValidator from 'email-validator';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import Loader from './Loader.js';
import { TextField } from 'react-native-material-textfield';
type Props = {};
var randomString = require('random-string');
const GLOBAL = require('./Global');

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ChangePassword extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
shown :false,
shownn:false,
        selected:false,
        data:[],
        new:'',

    };

    static navigationOptions = ({ navigation }) => {
        return {
         //   header: () => null,
            title: 'FORGOT PASSWORD',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'white'},
            headerStyle:{
                backgroundColor:'#D90000',
            },
            headerTintColor :'white',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){

    }


    login = () => {
    //  GLOBAL.forgetEmail
      if (this.state.company == ''){
          alert('Please Enter Pasword')
      } else if (this.state.new == ''){
            alert('Please Enter Confirm Password')
        } else if (this.state.new != this.state.company){
              alert('Password not match')
          }

         else {
          this.showLoading()
          const url = GLOBAL.BASE_URL + 'change_password_patient'
          this.showLoading()
          fetch(url, {
                method: 'POST',
                    timeoutInterval: 90000, // milliseconds
                sslPinning: {
                certs: ['anytimedoc_in']
                  },
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  phone: GLOBAL.forgetEmail,
                  password:this.state.new


              }),
          }).then((response) => response.json())
              .then((responseJson) => {


                  this.hideLoading()
                  if (responseJson.status == true) {
this.props.navigation.navigate('ChangeSuccess')
                  } else {
                      alert(responseJson.msg)
                  }
              })
              .catch((error) => {
                  console.error(error);
              });

    //    this.props.navigation.navigate('Otp')
    }
}
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <Loader>
                    </Loader>
                </View>
            )
        }
        return (

                <View style={styles.container}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

                    <Text style = {{fontFamily:GLOBAL.semi,fontSize:24,color:"#1E1F20",marginTop:20,marginLeft:20}}>
                    Recovery Password
                    </Text>
                        <Text style = {{marginLeft: '5%',width:'90%',color:'#1E1F20',fontSize: 14,marginTop: '4%',fontFamily:GLOBAL.regular,textAlign:'justify'}}>
Reset code was sent to your email/mobile. Please enter the code and create new password.

                        </Text>

                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'6%'}}>


                        <Text style = {{fontFamily:GLOBAL.regular,fontSize:14,color:'#9393AA',marginTop:20}}>
                      Reset Code
                        </Text>

                         <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8}}>
                         <TextInput
                                           style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
value = {this.props.navigation.state.params}
editable = {false}

                                       />

                         </View>





                        <Text style = {{fontFamily:GLOBAL.regular,fontSize:14,color:'#9393AA',marginTop:20}}>
                        New Password
                        </Text>

                        <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8,flexDirection:'row'}}>
                        <TextInput
                                          style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi,width:'80%'}}
                                          placeholder="Password"
                                          secureTextEntry = {!this.state.shown}
                                          onChangeText={(text) => this.setState({company:text})}
                                      />

                                      {this.state.shown == false && (
                                        <TouchableOpacity onPress={() => this.setState({shown:!this.state.shown})
                                        }>
                                        <Image style = {{width :30 ,height: 30,marginTop:10,resizeMode: 'contain'}}
                                               source={require('./show.png')}/>
                                               </TouchableOpacity>
                                      )}

                                      {this.state.shown == true && (
                                        <TouchableOpacity onPress={() => this.setState({shown:!this.state.shown})
                                        }>
                                        <Image style = {{width :30 ,height: 30,marginTop:10,resizeMode: 'contain'}}
                                               source={require('./hide.png')}/>
                                               </TouchableOpacity>
                                      )}


                        </View>

                        <Text style = {{fontFamily:GLOBAL.regular,fontSize:14,color:'#9393AA',marginTop:30}}>
                      Confirm Password
                        </Text>

                         <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8,flexDirection:'row'}}>
                         <TextInput
                                           style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi,width:'80%'}}
                                           placeholder="Password"
                                           secureTextEntry = {!this.state.shownn}
                                           onChangeText={(text) => this.setState({new:text})}
                                       />

                                       {this.state.shownn == false && (
                                         <TouchableOpacity onPress={() => this.setState({shownn:!this.state.shownn})
                                         }>
                                         <Image style = {{width :30 ,height: 30,marginTop:10,resizeMode: 'contain'}}
                                                source={require('./show.png')}/>
                                                </TouchableOpacity>
                                       )}

                                       {this.state.shownn == true && (
                                         <TouchableOpacity onPress={() => this.setState({shownn:!this.state.shownn})
                                         }>
                                         <Image style = {{width :30 ,height: 30,marginTop:10,resizeMode: 'contain'}}
                                                source={require('./hide.png')}/>
                                                </TouchableOpacity>
                                       )}


                         </View>


                        </View>


                        <Button
                            style={{padding:12,marginTop:44,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:8}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            Change Password
                        </Button>







                    </KeyboardAwareScrollView>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',



    } ,

})
