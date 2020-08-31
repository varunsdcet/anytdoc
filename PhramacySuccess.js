import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import { StyleSheet,Text,TextInput,AsyncStorage, View,Image,Modal ,Alert,FlatList,Dimensions ,Platform,TouchableHighlight,TouchableOpacity,ActivityIndicator,SafeAreaView,
  StatusBar} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import Loader from './Loader.js';
type Props = {};
import {NavigationActions,StackActions} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';
// or ES6+ destructured imports
import { getUniqueId, getManufacturer } from 'react-native-device-info';

var codes = '';
export default class PhramacySuccess extends Component {
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

    logout = ()=>{
      this.props
  .navigation
  .dispatch(StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'TabNavigator',
        params: { someParams: 'parameters goes here...' },
      }),
    ],
  }))
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

                                             <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'30%',resizeMode: 'contain'}}
                                                    source={require('./sent_message.png')}/>


                                                    <Text style = {{fontFamily:GLOBAL.semi,fontSize:24,color:"#1E1F20",marginTop:20,alignSelf:'center'}}>
                                                  Sent successful!
                                                    </Text>
                                                        <Text style = {{width:'72%',color:'#1E1F20',fontSize: 14,marginTop: '4%',fontFamily:GLOBAL.regular,alignSelf:'center'}}>
                                                        Your messeage sent successfully.
                                                        Our team will contact you shortly.

                                                        </Text>













                               <Button
                                   style={{alignSelf:'center',padding:12,marginTop:34,fontSize: 20, color: 'white',backgroundColor:'#D90000',width:'60%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                                   styleDisabled={{color: 'red'}}
                                   onPress={() => this.logout()}>
                                  GO TO HOMEPAGE
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
