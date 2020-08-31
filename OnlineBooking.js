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

    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');

import { TextField } from 'react-native-material-textfield';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class OnlineBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            member:[
                {
                    "id": "0",
                    "user_id": "2",
                    "member_name": "Self",
                    "member_dob": "Ert",
                    "gender": "male",
                    "added_on": "2019-09-21 14:02:01",
                    "member_mobile": "Fgg",
                    "email": "Ggg",
                    "relation": "Fg"
                },



            ],
            images: [


            ]

        };

    }

    componentWillUnmount() {

    }



    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING ',
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



    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){

        //   this._handlePressLogin()
    }
    _handlePress() {




        this.props.navigation.navigate('BookingDetailFinal')
    }







Calcprice = (dd,get)=>{
        GLOBAL.type = "4"
        GLOBAL.price = dd
        if (get == 1){
            GLOBAL.onlinetype = "chat"
//BookingDetailFinal

       if ( GLOBAL.appointmentArray.can_book_doctor_free  != 0)   {
           this.props.navigation.navigate('BookingDetailFinal')

       }else{
           this.props.navigation.navigate('BookingAppointmentDetail')
       }

        //     GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
        //         this.props.navigation.navigate('BookingAppointmentDetail')
        //     )}
        //
        // GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(
        //
        // )}



        }else {
            GLOBAL.onlinetype = "video"
            this.props.navigation.navigate('OnlineVideo')
        }

    }

    render() {
//        alert(JSON.stringify(GLOBAL.appointmentArray))

      //  var speciality =  GLOBAL.speciality
        var speciality = GLOBAL.appointmentArray.speciality_detail_array
        const renderedButtons =  GLOBAL.appointmentArray.gallery.map((b, index) => {


          return(
            <View style = {{flexDirection:'row'}}>
            <Image style = {{width :60 ,height :60,margin:10,marginTop:17}}
                   source={{ uri: b.image }}/>
                   </View>


          )








          ;
        })
        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
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

                    <View style={{ flex: 1 ,marginLeft : 0,width:window.width , backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>







    <View style = {{flexDirection:'row',width :'100%'}}>


                        <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10,marginTop:17}}
                               source={{ uri: GLOBAL.appointmentArray.image }}/>




                               <View>

        <View style = {{flexDirection:'row',width:window.width -80}}>
                        <Text style={{marginLeft : 5,fontSize : 14,color :'#1E1F20',fontFamily:GLOBAL.semi,width :'70%',marginTop:18}}>

                            {GLOBAL.appointmentArray.name}
                        </Text>

  

        </View>

                                   <View style = {{flexDirection:'row'}}>
                                   <Text style={{marginLeft : 5,fontSize : 12,color :'#83878E',height:'auto',fontFamily:GLOBAL.regular,width :'80%'}}>
                                       {speciality}
                                   </Text>


                                   </View>
                                   <Text style={{marginLeft : 5,fontSize : 12,color :'#83878E',height:'auto',fontFamily:GLOBAL.regular,width :'70%'}}>
                                       {GLOBAL.appointmentArray.lat_long_address}
                                   </Text>





        </View>

    </View>

    <View style = {{flexDirection:'row',marginLeft:10}}>
    {renderedButtons}
    </View>

    <View style = {{alignSelf:'flex-end',marginRight:20}}>
    {GLOBAL.appointmentArray.doctor_avail_status == 1 && (

        <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:60,textAlign:'center'}}>

            Available
        </Text>
    )}
    {GLOBAL.appointmentArray.doctor_avail_status == 0 && (

        <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>

            Offline
        </Text>
    )}

    {GLOBAL.appointmentArray.doctor_avail_status == 2 && (

        <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>

            Busy
        </Text>
    )}
    {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
        <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>
            Prime
        </Text>
    )}


    </View>

    <Text style={{fontSize : 12,color :'#83878E',fontFamily:GLOBAL.regular,marginLeft:10}}>

        {GLOBAL.appointmentArray.experience} yrs exp
    </Text>






                    </View>








                    </KeyboardAwareScrollView>

                    <View style={{ flexDirection:'column',backgroundColor:'#F5F5F5'}}>

                        <TouchableOpacity onPress = {()=>this.Calcprice(GLOBAL.appointmentArray.online_consult_chat_price,1)}>
                            <View style={{height:120,width:window.width,marginTop:10,backgroundColor:'white'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image
                                        style={{height:20,width:20,marginTop:22,marginLeft:20}}
                                        source={require('./chat.png')}
                                    />

                                    <View style={{flexDirection:'column',marginTop:18,marginLeft:12}}>
                                        <Text style={{fontSize:14,fontFamily:GLOBAL.semi,marginTop:1,color:'#1E1F20'}}>Chat Us</Text>
                                        <Text style={{fontSize:14,fontFamily:GLOBAL.semi,marginTop:2,color:'#83878E'}}>Schedule for your preferred date/time</Text>
 {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
                                            <Text style={{fontSize : 12,color :'#7BAAED',fontFamily:GLOBAL.semi,}}>

                                                <Text style={{fontSize:12,fontFamily:GLOBAL.regular,color:'#1E1F20',marginTop:4}}>15 minutes call duration ₹ 0 Consultation Fee</Text>
                                            </Text>
                                        )}

                                        {GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(
                                            <Text style={{fontSize : 12,color :'#7BAAED',fontFamily:GLOBAL.semi,}}>

                                                <Text style={{fontSize:12,fontFamily:GLOBAL.regular,color:'#1E1F20',marginTop:4}}>15 minutes call duration ₹{GLOBAL.appointmentArray.online_consult_chat_price} Consultation Fee</Text>
                                            </Text>
                                        )}



                                    </View>
                                    <Image
                                        style={{height:20,width:20,marginTop:35,marginLeft:25}}
                                        source={require('./arrowlogo.png')}/>



                                </View>


                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=>this.Calcprice(GLOBAL.appointmentArray.online_consult_video_price,2)}>
                            <View style={{height:115,width:400,marginTop:1,backgroundColor:'white'}}>

                                <View style={{flexDirection:'row'}}>
                                    <Image
                                        style={{height:20,width:20,marginTop:22,marginLeft:20}}
                                        source={require('./video.png')}
                                    />

                                    <View style={{flexDirection:'column',marginTop:18,marginLeft:12}}>
                                        <Text style={{fontSize:14,fontFamily:GLOBAL.semi,marginTop:1,color:'#1E1F20'}}>Video Consult</Text>
                                        <Text style={{fontSize:14,fontFamily:GLOBAL.semi,marginTop:2,color:'#83878E'}}>Schedule for your preferred date/time</Text>
 {GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(
                                            <Text style={{fontSize:12,fontFamily:GLOBAL.regular,color:'#1E1F20',marginTop:4}}>15 minutes call duration ₹{GLOBAL.appointmentArray.online_consult_video_price} Consultation Fee</Text>
                                        )}
                                        {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
                                            <Text style={{fontSize:12,fontFamily:GLOBAL.regular,color:'#1E1F20',marginTop:4}}>15 minutes call duration ₹ 0 Consultation Fee</Text>
                                        )}

                                    </View>

                                    <Image
                                        style={{height:20,width:20,marginTop:35,marginLeft:25}}
                                        source={require('./arrowlogo.png')}/>


                                </View>



                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

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
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:GLOBAL.regular,


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#7BAAED',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#7BAAED',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
