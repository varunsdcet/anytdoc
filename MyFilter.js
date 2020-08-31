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
import store from 'react-native-simple-store';
import Filter from './Filter.js';
import * as EmailValidator from 'email-validator';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import Loader from './Loader.js';
import Department from './Department.js';
import SpecialityFilter from './SpecialityFilter.js';
import HospitalFilter from './HospitalFilter.js';
import { TextField } from 'react-native-material-textfield';
type Props = {};
var randomString = require('random-string');
const GLOBAL = require('./Global');

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MyFilter extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        stat:0,
shown :false,
shownn:false,
        selected:false,
        data:[],
        new:'',

    };

    static navigationOptions = ({ navigation }) => {
        return {
         //   header: () => null,
            title: 'Filter',
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
    login12 = ()=>{
        GLOBAL.appply = 0
        GLOBAL.low = 0
        GLOBAL.high = 0
        store.delete('hospital')
        store.delete('speciality')
        store.delete('departments')
        AsyncStorage.setItem('apply', "0");
          this.props.navigation.goBack()


    }

    logins123= ()=>{
        AsyncStorage.setItem('apply', "1");
        GLOBAL.appply = 1
        this.props.navigation.goBack()

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

                  <View style = {{flexDirection:'row',width:'100%'}}>
                  <View style = {{width:'40%'}}>
                  <TouchableOpacity onPress={()=>this.setState({stat:0})}>


                      <View>




<View style = {{flexDirection:'row'}}>
                      <Text style={{fontSize: 12, color:'black', fontFamily: GLOBAL.regular,width:window.width- 50,fontWeight:'bold',marginTop:10,marginLeft:9}}>Department</Text>


</View>
                          <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                          </View>


</View>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.setState({stat:1})}>



                      <View>




<View style = {{flexDirection:'row'}}>
                      <Text style={{fontSize: 12, color:'black', fontFamily: GLOBAL.regular,width:window.width- 50,fontWeight:'bold',marginTop:10,marginLeft:9}}>Speciality</Text>


</View>
                          <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                          </View>


</View>

                  </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({stat:2})}>


                      <View>




<View style = {{flexDirection:'row'}}>
                      <Text style={{fontSize: 12, color:'black', fontFamily: GLOBAL.regular,width:window.width- 50,fontWeight:'bold',marginTop:10,marginLeft:9}}>Hospital</Text>


</View>
                          <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                          </View>


</View>

                  </TouchableOpacity>


                  </View>
                  {this.state.stat == 0 && (
                      <Department/>
                  )}
                  {this.state.stat == 1 && (
                      <SpecialityFilter/>
                  )}
                  {this.state.stat == 2 && (
                      <HospitalFilter/>
                  )}

                  </View>



                  <View style = {{flexDirection:'row',alignSelf:'center'}}>

                      <Button
                          style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'grey',marginLeft:'5%',width:window.width/2 - 50,height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                          styleDisabled={{color: 'red'}}
                          onPress={() => this.logins123()}>
                          APPLY
                      </Button>
                                          <Button
                                              style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:window.width/2 - 50,height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                                              styleDisabled={{color: 'red'}}
                                              onPress={() => this.login12()}>
                                              CLEAR
                                          </Button>
                  </View>


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
