import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import { StyleSheet,Text,TextInput,AsyncStorage, View,Image,Modal ,Alert,FlatList,Dimensions ,Platform,TouchableHighlight,TouchableOpacity,ActivityIndicator,SafeAreaView,
  StatusBar} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import Loader from './Loader.js';
type Props = {};

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';
// or ES6+ destructured imports
import { getUniqueId, getManufacturer } from 'react-native-device-info';

var codes = '';
export default class FinalOtp extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        modalVisible: false,
        visible:false,
        visibles:false,
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

    hideLoading() {
        this.setState({loading: false})
    }


    showLoading() {
        this.setState({loading: true})
    }

    componentDidMount(){
//        alert(GLOBAL.otps)
    }

    valide = () =>{

//        alert(GLOBAL.myname)

        if (codes == ''){
            alert('Please Enter OTP')
        }    else if(this.props.navigation.state.params==codes){

            this.props.navigation.navigate("ChangePassword",this.props.navigation.state.params)

        }
        else {
            alert('Entered OTP is Invalid.')
        }
    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    _onFulfill =(code) => {
        codes = code
        console.log('Pressed!');



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
          <SafeAreaView style={styles.AndroidSafeArea}>
                         <StatusBar backgroundColor="#639ced" barStyle="light-content" />

                                             <KeyboardAwareScrollView style = {{backgroundColor:'white',height:window.height}} keyboardShouldPersistTaps='always'>

                                             <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                                                    source={require('./logologin.png')}/>


                                                    <Text style = {{fontFamily:GLOBAL.semi,fontSize:24,color:"#1E1F20",marginTop:20,marginLeft:20}}>
                                                    Verification
                                                    </Text>
                                                        <Text style = {{marginLeft: '5%',width:'90%',color:'#1E1F20',fontSize: 14,marginTop: '4%',fontFamily:GLOBAL.regular,textAlign:'justify'}}>
                                          Please check you message for a four-digit security code and enter it below.

                                                        </Text>



                        <CodeInput
                            ref="codeInputRef1"
                            keyboardType="numeric"

                            className={'border-box'}
                            space={38}
                            codeLength ={4}
                            size={50}

                            activeColor = '#D90000'
                            inactiveColor =  '#D90000'
                            onFulfill={(code) => this._onFulfill(code)}
                        />



                        <TouchableOpacity  onPress={() =>  this.buttonClickListenerss()}>

                                <Text style={{color:'#1DA1F2',fontSize:14,fontFamily:GLOBAL.semi,alignSelf:'center',marginTop:20}} >

                               <Text style={{color:'#1E1F20',fontSize:14,fontFamily:GLOBAL.semi}} >
                               Didn'nt get a code?
                               </Text>
                               &nbsp; Send again
                               </Text>
                               </TouchableOpacity>





                               <Button
                                   style={{padding:12,marginTop:34,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                                   styleDisabled={{color: 'red'}}
                                   onPress={() => this.valide()}>
                                   SUBMIT
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
        flex:1,
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


    AndroidSafeArea: {
       flex: 0,
       backgroundColor: GLOBAL.COLOR.Header,
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})
