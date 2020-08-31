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
const GLOBAL = require('./Global');
import Loader from './Loader.js';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';
import MaterialTabs from 'react-native-material-tabs';
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Appointment extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,results:[],
        visible:false,
        selectedTab:0,
        movieList:["Upcoming Appointment","Past Appointment"]
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'YOUR APPOINTMENTS',
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

        this.loadAppointments('new')
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }

_handleStateChange = state => {

   this.loadAppointments("new")
 };

loadAppointments = (type) => {
  this.showLoading()
            const url = GLOBAL.BASE_URL + 'list_apointment'

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
                "condition":type


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(JSON.stringify(responseJson))

this.hideLoading()


                if (responseJson.status == true) {
                    this.setState({results: responseJson.list_appointment})


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
                "booking_id": item.booking_id,


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

onPressCanceld =(item)=>{
  GLOBAL.another = item.doctor_id,
  GLOBAL.anothername = item.doctor_name
GLOBAL.bookingid = item.group_id
  //GLOBAL.bookingid = item.group_id
  GLOBAL.mybookingid = item.booking_id
  this.props.navigation.navigate('MyChat')

}
openDetail=(item)=>{
 //   alert(JSON.stringify(item))
GLOBAL.appointment_details = item
this.props.navigation.navigate('AppointmentDetail')
}


rating =(item) => {

  this.props.navigation.navigate('Rating',item)

}

    renderItem=({item, index}) => {
        var s = item.appointment_date
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

<TouchableOpacity onPress={()=> this.openDetail(item)}>
            <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,
             flex: 1 ,marginTop:5,marginBottom:10,
           height: 'auto',
            width : Dimensions.get('window').width,borderWidth:0.2,borderColor:'grey' }}>


                {item.module == "1" && item.booking_type == "Emergency Visit" && (

<View style = {{flexDirection:'row'}}>

                    <View>

                    <Text style={{color:'black', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2}}> Appointment ID :{item.appointment_id}</Text>
                    <Text style={{color:'black', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2}}> Booking Type   :{item.booking_type}</Text>
                        <Text style={{color:'black', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2,}}> Booking ID :{item.booking_id}</Text>
                        <Text style={{color:'black', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2,textTransform: 'capitalize'}}> Booking Status :{item.booking_status}</Text>
                          {item.status == "1" && item.rating_flag == 0 &&  (
                            <Button style={{fontSize:20,color:'#7BAAED',fontFamily:GLOBAL.semi}}
                                    containerStyle={{overflow:'hidden',justifyContent:'center'}}
                                    onPress={()=> this.rating(item)}
                          >
                                Rate Your Doctor
                            </Button>
                          )}
                    </View>

                    </View>
                )}



                {item.booking_type != "Emergency Visit" &&  (

                    <View style={{flexDirection:'row'}}>




                        <View style={{flexDirection: 'column', marginTop:5,marginLeft:5,width:window.width - 20}}>

<View style = {{flexDirection:'row'}}>
                        <Image style={{width:50, height:50,borderRadius:25,marginTop:5,marginLeft:5}}
                            source={{uri : item.doctor_image}}/>
                                <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:20,marginLeft:10,textAlign:'center'}}>{item.doctor_name}</Text>
                            </View>
                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2}}>Appointment Id :{item.appointment_id}</Text>
                            <View style = {{margin:2}}>
                                <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2,marginRight:10,textAlign:'center'}}>{item.appointment_time}</Text>
                                    <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2,marginRight:10,textAlign:'center'}}> {s}</Text>
                                </View>
</View>

  <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:-16, width:'70%'}}> {item.speciality_detail_array}</Text>
                            <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2, width:'80%'}}>Booking Type    :{item.booking_type}</Text>
                            <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2,textTransform: 'capitalize'}}>Booking Status :{item.booking_status}</Text>

    <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2,textTransform: 'capitalize'}}>Booking Mode  :{item.booking_type}</Text>

{item.remain_days != "0" && (
              <Text style={{color:'#1E1F20', fontSize:12,fontFamily:GLOBAL.semi,marginTop:2}}>{item.remain_days} Days Remaining</Text>
)}



                            <View style={{flexDirection:'row',marginTop:5,alignSelf:'flex-end',marginBottom:10}}>

                            {item.status == "1" && item.rating_flag == 0 &&  (
                              <Button style={{fontSize:14,color:'#D90000',fontFamily:GLOBAL.semi}}
                                      containerStyle={{overflow:'hidden',justifyContent:'center'}}
                                      onPress={()=> this.rating(item)}
                            >
                                  Rate Your Doctor
                              </Button>
                            )}
                                {item.reshedule_power == 1 && (
                                    <Button style={{width:90,fontSize:14,color:'#27CD01',fontFamily:GLOBAL.semi}}
                                            containerStyle={{overflow:'hidden',justifyContent:'center'}}
                                            onPress={()=> this.onPressResc(item,index)}
>
                                        Reschedule
                                    </Button>
                                )}

                                {item.cancel_power == 1 && (
                                <Button style={{width:70,fontSize:14,color:'#D90000',fontFamily:GLOBAL.semi}}
                                        containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:10}}
                                        onPress={()=> this.onPressCancel(item, index)}>
                                    Cancel
                                </Button>
                                )}
                            </View>





                        </View>



                    </View>
                )}









            </View>
</TouchableOpacity>
        );
    }

categorySelect = (index) =>{
  this.setState({selectedTab:index})
  if (index == 0){
    this.loadAppointments('new')
  }else{
      this.loadAppointments('old')
  }
}

    _keyExtractor=(item, index)=>item.key;



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
            <MaterialTabs
                      items={this.state.movieList}



                      barColor = 'white'
                      selectedIndex={this.state.selectedTab}
                      indicatorColor = '#c43b42'
                      activeTextColor = '#D90000'
                      inactiveTextColor = 'black'
                      allowFontScaling ={true}
                      textStyle ={ {fontSize:12,}}


                      onChange={index =>

                          this.categorySelect(index)
                      }




                  />
                <FlatList
                    data={this.state.results}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />
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
