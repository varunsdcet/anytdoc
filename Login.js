
import React, {Component} from 'react';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
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
    SafeAreaView,
    StatusBar,


    Platform
} from 'react-native';
const GLOBAL = require('./Global');
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Loader.js';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import DeviceInfo from 'react-native-device-info';
// or ES6+ destructured imports
import { getUniqueId, getManufacturer } from 'react-native-device-info';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        shown :false,
        results:[],

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
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





    componentDidMount(){

    }


    login = () => {

        if (this.state.phone == ''){
            alert('Please Enter Username')
        }    else if (this.state.company == '') {
            alert('Please Enter Password')
        }  else {
            this.showLoading()
            const url = GLOBAL.BASE_URL + 'Signin'
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
                    phone: this.state.phone,
                    password: this.state.company,
                    deviceID: DeviceInfo.getUniqueId(),
                    deviceType: Platform.OS,
                    deviceToken: GLOBAL.firebaseToken,
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory: '',
                    has_notch: '',
                    manufacture: '',
                    ip_address: '',
                    voip_token:GLOBAL.voip,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {

                    this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({results: responseJson.user_detail})
                        GLOBAL.user_id = this.state.results.user_id
                        GLOBAL.myname= this.state.results.name
                        GLOBAL.myemail = this.state.results.email
                        AsyncStorage.setItem('userID', this.state.results.user_id.toString());
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                       this.props.navigation.replace('TabNavigator')
                    } else {
                        alert(responseJson.msg)
                    }
                })
                .catch((error) => {
                   alert(JSON.stringify(error))
                });
        }

    }
    otp =  () => {
        this.props.navigation.replace('MyOtp')
    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    toggle = () =>{
      this.setState({shown:!this.state.shown})
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
                <Loader>

                </Loader>

            )
        }
        return (
          <SafeAreaView style={styles.AndroidSafeArea}>
                         <StatusBar backgroundColor="#639ced" barStyle="light-content" />

                    <KeyboardAwareScrollView style = {{backgroundColor:'white',height:window.height}} keyboardShouldPersistTaps='always'>

                        <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'5%',resizeMode: 'contain'}}
                               source={require('./logologin.png')}/>


                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'1%'}}>


                        <Text style = {{alignSelf:'center',fontFamily:GLOBAL.semi,fontSize:22,color:"#1E1F20"}}>
                        Welcome to Anytimedoc
                        </Text>
                        <Text style = {{alignSelf:'center',fontFamily:GLOBAL.regular,fontSize:16,color:'#1E1F20'}}>
                        Good Health Made Easy
                        </Text>



                        <Text style = {{fontFamily:GLOBAL.regular,fontSize:14,color:'#9393AA',marginTop:20}}>
                        Email
                        </Text>

                         <View style = {{marginTop:10,width:'100%',height:50,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8}}>
                         <TextInput
                                           style={{height: 40,marginLeft:20,marginTop:4, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi}}
                                           placeholder="Email/Mobile"
                                           onChangeText={(text) => this.setState({phone:text})}
                                       />

                         </View>



                         <Text style = {{fontFamily:GLOBAL.regular,fontSize:14,color:'#9393AA',marginTop:30}}>
                         Password
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




                        </View>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')
                        }>
                        <Text style={{textAlign:'right',marginRight:40 ,width:'95%',color :'#91A4AF',fontFamily:GLOBAL.regular,fontSize: 14,marginTop:20}} >

                            Forgot Password ?
                        </Text>
                        </TouchableOpacity>





  <View style = {{flexDirection:'row',marginTop:5,justifyContent:'space-around'}}>
                        <Button
                            style={{paddingTop:12,marginTop:14,fontSize: 16, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:window.width/2 - 30,height:50,fontFamily:GLOBAL.semi,borderRadius:12,fontWeight:'bold'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            SIGN IN
                        </Button>






                        <Button
                            style={{paddingTop:12,marginTop:14,fontSize: 16, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:window.width/2 - 30,height:50,fontFamily:GLOBAL.semi,borderRadius:12,fontWeight:'bold'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.otp()}>
                            SIGN IN WITH OTP
                        </Button>

</View>
                        <Text style={{textAlign:'center',marginRight:40 ,width:'95%',color :'#000000',fontFamily:GLOBAL.semi,fontSize: 14,marginTop:10}} >

                           OR
                        </Text>
                        <Button
                            style={{padding:12,marginTop:8,fontSize: 18, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.props.navigation.navigate('Register')}>
                         CREATE ACCOUNT
                        </Button>





                    </KeyboardAwareScrollView>

                </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor: GLOBAL.COLOR.Header,
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

})
