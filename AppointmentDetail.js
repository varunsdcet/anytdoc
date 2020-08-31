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
  import moment from 'moment';

import Loader from './Loader.js';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');


class AppointmentDetail extends React.Component {
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
onPressCanceld =(item)=>{

  GLOBAL.another = item.doctor_id,
  GLOBAL.anothername = item.doctor_name
GLOBAL.bookingid = item.group_id
  //GLOBAL.bookingid = item.group_id
  GLOBAL.mybookingid = item.booking_id
  this.props.navigation.navigate('MyChat')

}
renderRowItem = (itemData) => {



   return (
     <TouchableOpacity onPress = {()=> Linking.openURL(itemData.item)}>
     <View style={{flexDirection: 'column',
   flex : 1, backgroundColor:'white',borderRadius:5,  width : '95%' ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:30,height:150}}>


   <Image style={{width:130, height:130, margin:10}} source={{uri: itemData.item}}/>




</View>
</TouchableOpacity>



   )
 }
procedure = (item)=>{
  Linking.openURL(item.prescription_pdf);
}
  render() {
    var yeah = this.state.a_details
          var s = moment(yeah.appointment_date).format('DD MMMM YYYY')
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


      <View>
              <Text style={{fontSize:13,fontFamily:GLOBAL.semi,color:'#83878E',marginLeft:16.5,marginTop:20}}>Name</Text>

        <Text style={{fontSize:16,fontFamily:GLOBAL.semi,color:'black',marginLeft:16.5}}>{yeah.doctor_name}</Text>
      </View>


      <View>
              <Text style={{fontSize:13,fontFamily:GLOBAL.semi,color:'#83878E',marginLeft:16.5,marginTop:8}}>Date and time</Text>

        <Text style={{fontSize:16,fontFamily:GLOBAL.semi,color:'black',marginLeft:16.5}}>{s} - {yeah.appointment_time}</Text>
      </View>

      {yeah.doctor_address != "" && (
        <View>
              <Text style={{fontSize:13,fontFamily:GLOBAL.semi,color:'#83878E',marginLeft:16.5,marginTop:8}}>Date and time</Text>
                      <Text style={{fontSize:16,fontFamily:GLOBAL.semi,color:'black',marginLeft:16.5}}>{s} - {yeah.doctor_address}</Text>

      </View>
            )}

            <View>
                  <Text style={{fontSize:13,fontFamily:GLOBAL.semi,color:'#83878E',marginLeft:16.5,marginTop:8}}>Booked For</Text>
                          <Text style={{fontSize:16,fontFamily:GLOBAL.semi,color:'black',marginLeft:16.5}}> {yeah.booking_for}</Text>

          </View>

          <View>
                <Text style={{fontSize:13,fontFamily:GLOBAL.semi,color:'#83878E',marginLeft:16.5,marginTop:8}}>Booking ID</Text>
                        <Text style={{fontSize:16,fontFamily:GLOBAL.semi,color:'black',marginLeft:16.5}}> {yeah.booking_id}</Text>

        </View>

        <View>
              <Text style={{fontSize:13,fontFamily:GLOBAL.semi,color:'#83878E',marginLeft:16.5,marginTop:8}}>Type</Text>
                      <Text style={{fontSize:16,fontFamily:GLOBAL.semi,color:'black',marginLeft:16.5}}> {yeah.booking_type}</Text>

      </View>


        {yeah.cancel_power == 0 && (
        <Text style={{height:1}}></Text>
    )}
        {yeah.cancel_power != 0 && (
        <View style={{flexDirection:'row',marginLeft:20,marginTop:7,alignItems:'center'}}>


        <Button style={{paddingTop:12,fontSize:12,color:'white',backgroundColor:'#D90000',height:40,fontFamily:GLOBAL.semi,width:100}}
        containerStyle={{backgroundColor:'white'}}
        onPress={() =>this.clickResc()}>
         RESCHEDULE
        </Button>

                <Button style={{paddingTop:12,fontSize:12,color:'white',backgroundColor:'#D90000',height:40,fontFamily:GLOBAL.semi,width:100}}
        containerStyle={{marginLeft:25,backgroundColor:'white'}}
        onPress={()=> this.onPressCancel()}>
         CANCEL
        </Button>

        </View>

)}

        <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:2}}>
        </View>

{/*        <Text style={{fontSize:12,fontFamily:GLOBAL.regular,color:'#27272D',marginLeft:20,marginTop:6}}>19, Maurya Enclave, Poorvi Pitampura</Text>
*/}
        <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>

        {yeah.cancel_power == 0 && (
        <Text style={{height:1}}></Text>
        )}
        {yeah.cancel_power != 0 && (
        <Button style={{paddingTop:12,fontSize:12,color:'white',backgroundColor:'#D90000',height:40,fontFamily:GLOBAL.semi,width:100}}
        containerStyle={{backgroundColor:'white'}}
        onPress={()=> this.getDirections()}>
         GET DIRECTIONS
        </Button>

        )}

        </View>






        {yeah.online_type == "chat" && (
          <View style={{flexDirection:'column',alignSelf:'flex-end',marginRight:20}}>
        <Button style={{paddingTop:12,fontSize:12,color:'white',backgroundColor:'#D90000',height:40,fontFamily:GLOBAL.semi,width:100}}
                  containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:50,marginTop:-23}}
                  onPress={()=> this.onPressCanceld(yeah)}>
              View Chat
          </Button>
          </View>
        )}
        {yeah.online_type == "video" && (
          <View style={{flexDirection:'column',alignSelf:'flex-end',marginRight:20}}>
        <Button style={{paddingTop:12,fontSize:12,color:'white',backgroundColor:'#D90000',height:40,fontFamily:GLOBAL.semi,width:100}}
                  containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:50,marginTop:-23}}
                  onPress={()=> this.onPressCanceld(yeah)}>
              View Chat
          </Button>
          </View>
        )}
        <View style={{flexDirection:'column',marginLeft:22}}>
        {yeah.booking_status == "complete" && yeah.prescription_type == "2" && (

          <View>

              <Button style={{paddingTop:12,fontSize:12,color:'white',backgroundColor:'#D90000',height:40,fontFamily:GLOBAL.semi,width:100}}
                  containerStyle={{overflow:'hidden',width:100,marginLeft:-10,marginTop:0}}
                  onPress={()=> this.procedure(yeah)}>
              View Prescription
          </Button>

        </View>
      )}
      {yeah.booking_status == "complete" && yeah.prescription_type == "1" && (

        <View>

        <FlatList style= {{flexGrow:0, marginBottom:20}}
            data={yeah.prescription_images}
            numColumns={1}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={this.renderRowItem}
          />

      </View>
    )}

        </View>
      </View>




  </ScrollView>
    );
  }
}

export default AppointmentDetail;
