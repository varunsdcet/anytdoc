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
import {Card} from 'react-native-shadow-cards';
import Loader from './Loader.js';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');


class HistoryDetail extends React.Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        response :[],
        responses :[],
        loading:false,results:[],
        visible:false,a_details:''
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING DETAILS',
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


    }

    confirmCancel=()=>{
      alert(GLOBAL.equipment.id)
        this.showLoading()
        const url = GLOBAL.BASE_URL + 'cancel_medical_equipment'

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
                "booking_id": GLOBAL.equipment.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    alert('Booking cancelled successfully!')
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

    renderItems=({item}) => {

        return(


            <TouchableOpacity onPress={() => Linking.openURL(item)
            }>


                <View style={{flexDirection: 'row', marginTop:2,marginLeft:2,borderBottomColor:'grey',borderBottomWidth:1,marginBottom:4}}>

                    <Image source={{uri :item}}
                           style  = {{width:100, height:100,marginTop: 3,marginLeft:5
                           }}

                    />

                </View>



            </TouchableOpacity>



        );
    }

    renderItem=({item}) => {
        return(





            <View style={{flexDirection: 'row', marginTop:2,marginLeft:2,borderBottomColor:'grey',borderBottomWidth:1,marginBottom:4}}>

                <Text style={{color:'grey', fontSize:14,fontFamily:GLOBAL.regular,margin:8}}>{item.test_name}</Text>

            </View>







        );
    }

    render() {
        var yeah =  GLOBAL.labdetail
        var item = GLOBAL.equipment
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

                <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height, flexDirection:'column',backgroundColor:'white'}}>


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop:15,marginLeft:15,marginRight:15, height: 'auto',borderRadius :6,width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2}}>





                    <View style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

<View style = {{flexDirection:'row'}}>
                    <Text style={{fontSize:12,fontFamily:GLOBAL.semi,color:'#1E1F20',marginLeft:10,marginTop:12}}>Booking ID</Text>
                        <Text style={{fontSize:12,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:10,marginTop:12}}>{item.id}</Text>

                    </View>
  <Text style={{color:'#19AB2B', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:32}}>{item.booking_status}</Text>
                    </View>




                    <View style={{flexDirection: 'row', marginTop:1,marginLeft:5}}>

                        <Image style = {{width :100 ,height :100,borderRadius: 30,margin:10,resizeMode:'stretch'}}
                               source={{ uri: item.product_image }}/>


                        <View style = {{flexDirection:'row'}}>
                        <View>

                            <Text style={{color:'black', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2,width:window.width - 160}}> {item.product_name}</Text>


                            <View style = {{flexDirection:'row',width:'100%'}}>
                                <Text style={{color:'grey', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}>Quantity :</Text>
                                <Text style={{color:'black', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}> {item.quantity}</Text>
                            </View>
                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style={{color:'grey', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}>Equipment Type :</Text>
                            <Text style={{color:'black', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}> {item.equipment_type}</Text>
                        </View>

                        <Text style={{color:'#D90000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8}}>₹{item.order_price}</Text>

</View>
</View>

                    </View>

                    <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 50,justifyContent:'space-between',height:50}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Delivery Date</Text>
                        <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}> {GLOBAL.equipment.delivery_date}</Text>

                    </Card>

                    <Card style={{marginLeft:10,marginTop:10,width:window.width - 50,justifyContent:'space-between',marginBottom:10}}>

  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Shipping Address</Text>
                        <Text style={{fontSize:12,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:10,marginTop:12,marginRight:12}}> {GLOBAL.equipment.address}{GLOBAL.equipment.area}{GLOBAL.equipment.city_state}{GLOBAL.equipment.pincode}</Text>

                    </Card>

                    {GLOBAL.equipment.cancel_power == 0 && (
                        <Text style={{height:1}}></Text>
                    )}
                    {GLOBAL.equipment.cancel_power != 0 && (
                        <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>




                                                      <Button style={{fontSize:18,color:'#D90000',borderWidth:1,borderColor:'#D90000',fontFamily:GLOBAL.medium,height:40,width:200,paddingTop:10}}
                                    containerStyle={{marginLeft:25,backgroundColor:'white'}}
                                    onPress={()=> this.onPressCancel()}>
                                CANCEL
                            </Button>

                        </View>

                    )}




                </View>















                </View>

            </ScrollView>
        );
    }
}

export default HistoryDetail;
