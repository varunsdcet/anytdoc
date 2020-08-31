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
import Loader from './Loader.js';
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
var randomString = require('random-string');
const GLOBAL = require('./Global');

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Forgot extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],

    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
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
      var x = randomString({
          length: 4,
          numeric: true,
          letters: false,
          special: false,
      });
      if (this.state.phone == ''){
          alert('Please Enter Email')
      }   else {
          this.showLoading()
          const url = GLOBAL.BASE_URL + 'Forget_password'
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
                  email: this.state.phone,
                  otp:x


              }),
          }).then((response) => response.json())
              .then((responseJson) => {


                  this.hideLoading()
                  if (responseJson.status == true) {
                    GLOBAL.forgetEmail =  this.state.phone
                      this.props.navigation.navigate("FinalOtp",x)
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
                    Forget Password
                    </Text>
                        <Text style = {{marginLeft: '5%',width:'90%',color:'#1E1F20',fontSize: 14,marginTop: '4%',fontFamily:GLOBAL.regular,textAlign:'justify'}}>
  Please enter your email / mobile below to receive your password reset instructions.

                        </Text>

                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'6%'}}>



                        <Text style = {{fontFamily:GLOBAL.regular,fontSize:14,color:'#9393AA',marginTop:20}}>
                        Email/Mobile
                        </Text>

                         <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#D90000',borderWidth:1,borderRadius:8}}>
                         <TextInput
                                           style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}

                                           onChangeText={(text) => this.setState({phone:text})}
                                       />

                         </View>




                        </View>


                        <Button
                            style={{padding:12,marginTop:44,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:8}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            Send
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
