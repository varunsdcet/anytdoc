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
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');


class LabHistoryDetail extends React.Component {
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
            title: 'Lab Detail',
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
        const url = GLOBAL.BASE_URL + 'patient_lab_history_detail'

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
                "id": GLOBAL.labdetail.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              
                this.hideLoading()
                this.setState({response:responseJson.list.booking_details})
                this.setState({responses:responseJson.list})
//                alert(JSON.stringify(responseJson))
//responses

            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    confirmCancel=()=>{
        this.showLoading()
        alert(GLOBAL.labdetail.booking_id)
        const url = GLOBAL.BASE_URL + 'cancel_lab_test'

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
                "booking_id": GLOBAL.labdetail.id,


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
            'Are you sure you want to cancel this Lab Booking?',
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


            <Card style = {{margin:5,width:window.width - 10}}>

                <Image source={{uri :item}}
                       style  = {{width:100, height:100,marginTop: 3,marginLeft:5
                       }}

                />

            </Card>



</TouchableOpacity>



        );
    }

    renderItem=({item}) => {
        return(





                    <Card style = {{margin:5,width:window.width - 10}}>

                        <Text style={{color:'grey', fontSize:14,fontFamily:GLOBAL.regular,margin:8}}>{item.test_name}</Text>

                    </Card>







        );
    }

    render() {
        var yeah =  GLOBAL.labdetail
        if(this.state.loading){
            return(
                <View style={{
                    flex:1,
                    backgroundColor :'#f1f1f1'

                }}>
                    <ActivityIndicator style = {{
                        position: 'absolute',
                        left: window.width/2 - 30,

                        top: window.height/2,

                        opacity: 0.5,

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                                       size="large" color='#006FA5' />
                </View>
            )
        }

        return(
            <ScrollView>

                <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height, flexDirection:'column'}}>


                <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

              <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Booking ID</Text>
                    <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}>{this.state.responses.booking_id}</Text>

                </Card>

                <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

              <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Order Placed Date </Text>
                    <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}>{this.state.responses.added_on}</Text>

                </Card>

{this.state.responses.lab_assign_id !="0" && (
                <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

              <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Assign Lab </Text>
                    <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}>{this.state.responses.lab_name}</Text>

                </Card>
              )}

              <Card style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

            <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Payment Amount </Text>
                  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}>₹{this.state.responses.order_amount}</Text>

              </Card>

              <Card style={{marginLeft:10,marginTop:10,width:window.width - 20,marginBottom:10}}>

            <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12}}>Address </Text>
                  <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'black',marginLeft:10,marginTop:12,marginRight:12}}> {this.state.responses.address},{this.state.responses.area},{this.state.responses.city_state},{this.state.responses.pincode}</Text>

              </Card>









                    {this.state.responses.cancel_power == 0 && (
                        <Text style={{height:1}}></Text>
                    )}
                    {this.state.responses.cancel_power != 0 && (
                        <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>




                            <Button style={{fontSize:18,color:'#D90000',borderWidth:1,borderColor:'#D90000',fontFamily:GLOBAL.medium,height:40,width:200,paddingTop:10}}
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

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>

                    <Text style={{fontSize:15,fontFamily:GLOBAL.regular,color:'#757585',marginLeft:20,marginTop:20}}>Item</Text>

                    <FlatList
                        data={this.state.response}

                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderItem}
                    />


                    <Text style={{fontSize:15,fontFamily:GLOBAL.regular,color:'#000000',marginLeft:20,marginTop:20}}>Reports</Text>

                    <FlatList
                        data={this.state.responses.records_images}

                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderItems}
                    />


                </View>

            </ScrollView>
        );
    }
}

export default LabHistoryDetail;
