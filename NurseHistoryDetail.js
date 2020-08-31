import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    Linking,
    FlatList,
    Dimensions,
    ActivityIndicator,


} from 'react-native';
import Loader from './Loader.js';
import {Card} from 'react-native-shadow-cards';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');

import moment from 'moment';
class NurseHistoryDetail extends React.Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,results:[],
        visible:false,a_details:''
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'NURSE DETAILS',
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


    componentDidMount(){
        this.showLoading()
        this.timeoutCheck = setTimeout(() => {
            this.setState({a_details: GLOBAL.appointment_details})
            this.hideLoading()

        }, 1000);
    }

    confirmCancel=()=>{
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
                "booking_id": GLOBAL.appointment_details.booking_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    alert('Appointment cancelled successfully!')
//                    this.loadAppointments()


                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

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


    getDirections=()=>{
        var lat= GLOBAL.appointment_details.doctor_lat
        var lot= GLOBAL.appointment_details.doctor_long

        var url = `https://www.google.com/maps?saddr=My+Location&daddr=`+lat+','+lot;
//    alert(url)
        Linking.openURL(url);


    }

    clickResc=()=>{

        this.props.navigation.navigate('AppointmentResc')
    }

    render() {
        var yeah =  GLOBAL.nurseDetail
  var s = moment(yeah.booking_date).format('DD MMMM YY')

  var discount_amount = parseFloat(yeah.discount_amount)
    var payment_gateway_amount = parseFloat(yeah.payment_gateway_amount)
      var referral_amount = parseFloat(yeah.referral_amount)
        var wallet_amount = parseFloat(yeah.wallet_amount)
        var amount =  discount_amount + payment_gateway_amount + referral_amount + wallet_amount
        if(this.state.loading){
            return(
                <View style={{
                    flex:1,
                    backgroundColor :'#f1f1f1'

                }}>
                    <Loader>
                    </Loader>
                </View>
            )
        }

        return(
            <ScrollView>

                <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height, flexDirection:'column'}}>

                    <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Booking ID</Text>
                        <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}>{yeah.id}</Text>

                    </Card>


                    <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Services</Text>
                        <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}>{yeah.service_name}</Text>

                    </Card>


                    <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Amount</Text>
                        <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}>₹ {amount}</Text>

                    </Card>

                    <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>No of Days</Text>
                        <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}> {yeah.days}</Text>

                    </Card>

                    <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Booking Date</Text>
                        <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}> {s}</Text>

                    </Card>

                    <Card style={{marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',marginBottom:10}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Address</Text>
                        <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}> {yeah.address}</Text>

                    </Card>

                    {yeah.current_nurse != '' && (
                        <View>
                        <Card style={{marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',marginBottom:10}}>

                      <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Current Nurse</Text>
                            <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}> {yeah.current_nurse}</Text>

                        </Card>
                        </View>

                    )}

                    {yeah.cancel_power == 0 && (
                        <Text style={{height:1}}></Text>
                    )}
                    {yeah.cancel_power != 0 && (
                        <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>




                            <Button style={{fontSize:18,color:'#FF2D00',fontFamily:GLOBAL.medium}}
                                    containerStyle={{marginLeft:25,backgroundColor:'white'}}
                                    onPress={()=> this.onPressCancel()}>
                                CANCEL
                            </Button>

                        </View>

                    )}




                    {/*        <Text style={{fontSize:15,fontFamily:GLOBAL.regular,color:'#27272D',marginLeft:20,marginTop:6}}>19, Maurya Enclave, Poorvi Pitampura</Text>
*/}
                    <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>

                        {yeah.cancel_power == 0 && (
                            <Text style={{height:1}}></Text>
                        )}


                    </View>








                  

                </View>

            </ScrollView>
        );
    }
}

export default NurseHistoryDetail;
