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

    ActivityIndicator,TouchableOpacity,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import Loader from './Loader.js';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NurseHistory extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,results:[],
        visible:false,
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'NURSE APPOINTMENTS',
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



    componentDidMount() {
        this.loadAppointments()
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }

    _handleStateChange = state => {

        this.loadAppointments()
    };

    loadAppointments(){
      this.showLoading()
        const url = GLOBAL.BASE_URL + 'nurse_booking_history'

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
                "user_id": GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)

this.hideLoading()


                if (responseJson.status == true) {
                    this.setState({results: responseJson.list})


                } else {
                    this.setState({results: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    confirmCancel=(item, index)=>{
    //  alert(JSON.stringify(item))
        this.showLoading()
        const url = GLOBAL.BASE_URL + 'cancel_appointment'

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
                "booking_id": item.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    alert('Appointment cancelled successfully!')
                    this.loadAppointments()


                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    onPressResc=(item,index)=>{
        alert(JSON.stringify(item))
        GLOBAL.appointment_details = item
        this.props.navigation.navigate('AppointmentResc')
    }

    onPressCancel=(item, index)=>{
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel this appointment?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => this.confirmCancel(item,index)
                }
            ],
            {
                cancelable: false
            }
        );
        return true;
    }


    openDetail=(item)=>{

        GLOBAL.nurseDetail = item
        this.props.navigation.navigate('NurseHistoryDetail')
    }

    renderItem=({item, index}) => {
        var s = moment(item.booking_date).format('DD MMMM YY')
  var discount_amount = parseFloat(item.discount_amount)
    var payment_gateway_amount = parseFloat(item.payment_gateway_amount)
      var referral_amount = parseFloat(item.referral_amount)
        var wallet_amount = parseFloat(item.wallet_amount)
        var amount =  discount_amount + payment_gateway_amount + referral_amount + wallet_amount

        return(

            <TouchableOpacity onPress={()=> this.openDetail(item)}>
                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,
                    flex: 1 ,marginTop:15,marginLeft:15,marginBottom:10,
                    marginRight:15, height: 'auto',borderRadius :6,
                    width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2, }}>






                        <View style={{flexDirection:'row'}}>



                            <View style={{flexDirection: 'column', marginTop:15,marginLeft:5,width:'100%'}}>
                            <Text style={{color:'#D90000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8}}>Order {item.booking_status}</Text>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

              <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>Booking ID</Text>
                                <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{item.id}</Text>


                                </View>

                                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                              <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>Services</Text>
                                                                <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{item.service_name}</Text>


                                                                </View>


                                                                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                                                              <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>Booking Date</Text>
                                                                                                <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{s}</Text>


                                                                                                </View>

                                                                                                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                                                                                              <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>No of Days</Text>
                                                                                                                                <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{item.days}</Text>


                                                                                                                                </View>
<Text style={{color:'#D90000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginLeft:1}}>₹ {amount}</Text>


                                <View style={{flexDirection:'row',marginTop:15}}>

                                    {item.reshedule_power == 1 && (
                                        <Button style={{fontSize:20,color:'#7BAAED',fontFamily:GLOBAL.semi}}
                                                containerStyle={{overflow:'hidden',justifyContent:'center'}}
                                                onPress={()=> this.onPressResc(item,index)}
                                        >
                                            RESCHEDULE
                                        </Button>
                                    )}

                                    {item.cancel_power == 1 && (
                                        <Button style={{fontSize:20,color:'#FF0000',fontFamily:GLOBAL.semi}}
                                                containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:50}}
                                                onPress={()=> this.onPressCancel(item, index)}>
                                            CANCEL
                                        </Button>
                                    )}
                                </View>

                            </View>



                        </View>








                </View>
            </TouchableOpacity>
        );
    }

    _keyExtractor=(item, index)=>item.key;



    render() {

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
                {this.state.results.length== 0 && (
                 <Text style={{marginTop:'20%',fontSize : 18,color :'black', height:'auto',fontFamily:GLOBAL.regular,alignSelf:'center'}}>
                 No nurse appointments found!
                    </Text>

                    )}
                    {this.state.results.length!=0 &&(
                <FlatList
                    data={this.state.results}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />

                        )}
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

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})
