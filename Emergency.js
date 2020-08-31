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
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import Loader from './Loader.js';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Emergency extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            company: '',
            address:[],
            loading: false,
            visible: false,
            price:'',

            selected: false,
            data: [],
            images: [
                {
                    days :'10.00',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.23',
                    selected:'',
                },
                {
                    days :'10.33',
                    selected:'',
                },
                {
                    days :'10.56',
                    selected:'',
                },
                {
                    days :'10.66',
                    selected:'',
                },
            ]
        }
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
            title: 'EMERGENCY',
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


    apicall() {
      this.showLoading()
        const url = 'https://anytimedoc.in/android_ios_sc/api/master_prices'

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
                "type":'emergency',





            }),
        }).then((response) => response.json())
            .then((responseJson) => {
  this.hideLoading()

                if (responseJson.status == true) {

                    GLOBAL.price = responseJson.price
                    this.setState({price:GLOBAL.price})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
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
    _handleStateChange = (state) => {
        this.apicall()

        this.setState({address :GLOBAL.selectedAddress})

    }
    call = ()=>{
      this.showLoading()
      const url = GLOBAL.BASE_URL +  'get_profile'


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
              user_id : GLOBAL.user_id,

          }),
      }).then((response) => response.json())
          .then((responseJson) => {
this.hideLoading()

              if (responseJson.status == true) {

              this.setState({address:responseJson.user_details.get_default_address})
GLOBAL.selectedAddress = responseJson.user_details.get_default_address
            }



          })
          .catch((error) => {
            this.hideLoading()
              console.error(error);
          });
    }
    componentDidMount(){
      this.call()
        this.props.navigation.addListener('willFocus',this._handleStateChange);



        //   this._handlePressLogin()
    }


    login = () => {
        GLOBAL.type = '1'
        this.props.navigation.navigate('Payment')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {

        this.setState({selected:true})
    }


    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }


    render() {


        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (

                <View style={styles.container}>
                    <KeyboardAwareScrollView>


              <View style={{ flex: 1 ,marginLeft : 15,width:window.width - 30, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10,flexDirection:'row'}}>
                        <Text style={{marginLeft : 20,fontSize : 16,color :'#1E1F20',fontFamily:GLOBAL.semi,width :'80%',marginTop:15,marginBottom:20}}>

                            Emergency Charge:   {this.state.price}
                        </Text>

                        </View>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListAddress')
                        }>




                             <Card style={{padding: 10, margin: 10,flexDirection:'row',width:window.width - 20,marginTop:20,borderRadius:12}}>
                            <Text style={{marginLeft : 10,marginTop:7,fontSize : 18,
                                color :'#D90000', height:'auto',
                            fontFamily:GLOBAL.semi,width :window.width - 80,fontWeight:'bold'}}>
                                Select Address
                            </Text>

                            <Image style={{marginLeft:-20, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                            source={require('./arrowlogo.png')}/>
                            </Card>
                        </TouchableOpacity>


                        <Card style={{ flex: 1 ,marginLeft : 10,width:window.width - 20, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                                <Text style={{marginLeft : 5,fontSize : 16,color :'black',fontFamily:GLOBAL.semi,width :'80%',marginTop:15,fontWeight:'bold'}}>

                                    Address:   {this.state.address.address}
                                </Text>

                                <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:GLOBAL.semi,width :window.width - 20,fontWeight:'bold',marginTop:8}}>

                                    Area:   {this.state.address.area}
                                </Text>

                                <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:GLOBAL.semi,width :'80%',fontWeight:'bold',marginBottom:15,marginTop:8}}>

                                    State:   {this.state.address.city_state}
                                </Text>






                        </Card>





                        <Button
                            style={{padding:12,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            Proceed to Payment
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
        flex:1,
        backgroundColor :'#f1f1f1',

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
