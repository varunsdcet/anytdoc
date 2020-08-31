import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,ScrollView,Platform,FlatList,Dimensions ,PermissionsAndroid,TouchableOpacity,TouchableNativeFeedback,ActivityIndicator,Linking,ImageBackground} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import NotifService from './NotifService';
import {withNavigationFocus} from 'react-navigation';
import Images from 'react-native-android-image-polyfill';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import requestCameraAndAudioPermission from './permission';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { DialogComponent, DialogTitle } from 'react-native-dialog-component';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Geolocation from 'react-native-geolocation-service';
import Geolocations from '@react-native-community/geolocation';
import Loader from './Loader.js';
import PushNotification from 'react-native-push-notification';
import { BackHandler } from 'react-native';
let textRef = React.createRef();
let menuRef = null;
import {AppState} from 'react-native'
import Carousel from 'react-native-snap-carousel';
const GLOBAL = require('./Global');
import getYouTubeID from 'get-youtube-id';
//import Geolocation from '@react-native-community/geolocation';
type Props = {};
import moment from 'moment';
import appConfig from './app.json';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';


import VideoPlayer from 'react-native-video-controls';

var length = 0;
var commonHtml = "";
const { width, height } = Dimensions.get('window');

var booking_type ='';
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


 class Home extends Component {

  constructor(props) {
      super(props);

    this.state = {
       appState: AppState.currentState,
        text: '',
            senderId: appConfig.senderID,
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',
        username: '',
        password: '',
        atleastSelected:0,
        status :'',
        ipAdd : '',
        banner_link :[],
        loading:'',
        marker :[],
        statuss :'',
        isok:0,
           varticles:[],
        detail:'',
        package :[],
        speciality:[],
        value:0,
     mystate:0,
        banner:[],
        visible:false,
        call:'',
        articles:[],
        location:'',
        is_chat_or_video_start:'',
      moviesList :[
           {

               title :'Home Visit',
               image:require('./doctor.png')
           },


           {

               title :'Lab Test',
               image:require('./lab.png')
           },
           {

               title :'Nursing',
               image:require('./nurse.png')
           },

           {
               title :'Health \nPackages',
               image:require('./packages.png')
           },
           {

               title :'Doctor \n Consultation',
               image:require('./online.png')
           },

           {

               title :'Ambulance',
               image:require('./ambulance.png')
           },


           {

               title :' Medical \nServices',
               image:require('./equipment.png')
           },
           {

               title :'Medical \nEquipments',
               image:require('./medical-services.png')
           },
           {

               title :'OPD \nHealth Plans',
               image:require('./opd.png')
           },

           {

               title :'Pharmacy',
               image:require('./medicine.png')
           },

           {

               title :'Surgical \nPackages',
               image:require('./surgical.png')
           },


           {

               title :'Hospitals',
               image:require('./hospital.png')
           },

       ],


        results: [],
        selected:[],
        name :'',

    };

  //  this.notif.localNotif()
  }

    static navigationOptions = ({ navigation }) => {
        return {
              header: () => null,

        }
    }
    login = () =>{
    if (this.state.mystate ==  0){

      if (this.state.value == 0) {
   this.props.navigation.navigate('DoctorVisitDetail')
      }else {

             this.props.navigation.navigate('Emergency')
  }
}  else{
  if (this.state.value == 0) {
         GLOBAL.rentPurchase = "Rental"
         this.props.navigation.navigate('MedicalEquipment')
     }else
         GLOBAL.rentPurchase = "Purchase"
         this.props.navigation.navigate('MedicalEquipment')

}
  }
selectedFirstw = (name) =>{
this.props.navigation.navigate('Speciality',name)
}
 requestCameraPermission() {
                try {
                    const granted = PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
//                        that.callLocation(that);
                    } else {
                       // alert("Permission Denied");
                    }
                } catch (err) {
                    alert("err",err);
                    console.warn(err)
                }
            }

    hideLoading() {
        this.setState({loading: false})
    }

    onNotif =()=> {

      const url = GLOBAL.BASE_URL +  'home_patient'

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
              "type":"home_patient",
              "user_id":GLOBAL.user_id,




          }),
      }).then((response) => response.json())
          .then((responseJson) => {

              if (responseJson.status == true) {
                  this.getRespone(responseJson)
              }
          })
          .catch((error) => {
              console.error(error);
              this.hideLoading()
          });
    //  alert(JSON.stringify(notif))

  //      Alert.alert(notif.title, notif.message);

    }



    getRespone1 = (res) => {


        GLOBAL.user_details = res.user_detail
        GLOBAL.another = res.doctor_id,
        GLOBAL.anothername = res.doctor_name

        GLOBAL.bookingid = res.chat_g_id
        GLOBAL.mybookingid = res.booking_id



        this.setState({banner_link:res.banners_link})

        this.setState({is_chat_or_video_start:res.is_chat_or_video_start})
//        GLOBAL.profileImage = res.user_detail.image
        booking_type = res.booking_type

        this.setState({isok:res.is_booking})

if (res.is_booking == 1){
  this.setState({visible:true})
}else{
    this.setState({visible:false})
}



    }


    getRespone = (res) => {
//        alert(JSON.stringify(res.user_detail))
        GLOBAL.user_details = res.user_detail
        GLOBAL.another = res.doctor_id,
        GLOBAL.anothername = res.doctor_name
        GLOBAL.referal = res.user_detail.referral_code
        GLOBAL.bookingid = res.chat_g_id
        GLOBAL.mybookingid = res.booking_id
        GLOBAL.emergency_number = res.emergency_number
        this.setState({is_chat_or_video_start:res.is_chat_or_video_start})
//        GLOBAL.profileImage = res.user_detail.image
        booking_type = res.booking_type

        this.setState({isok:res.is_booking})

if (res.is_booking == 1){
  this.setState({visible:true})
}else{
    this.setState({visible:false})
}

        this.setState({call:res.emergency_number})
        this.setState({speciality:res.specialty})
        this.setState({banner:res.banners})
        this.setState({articles:res.articles})
        this.setState({package:res.package})
          this.setState({varticles:res.varticles})

    }

        getNewsUpdate(){

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
//                alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {



                    // this.setState({name :responseJson.user_details.name})
                    // this.setState({address: responseJson.user_details.address})
                    // this.setState({area: responseJson.user_details.area})
                    // this.setState({city: responseJson.user_details.city})
                    // this.setState({description :responseJson.user_details.email})
                    // this.setState({image :responseJson.user_details.image})
                    // this.setState({username: responseJson.user_details.username})
                    // if(responseJson.user_details.dob==''){
                    //     this.setState({dob:'Select Date of Birth'})
                    // }else{
                    //     this.setState({dob: responseJson.user_details.dob})
                    // }
                    GLOBAL.profileImage = responseJson.user_details.image
                }else {
                    alert('No News Found')
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }


    call1 = ()=>{
        const url = GLOBAL.BASE_URL +  'get_check_chat_flag'
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
                "user_id":GLOBAL.user_id
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              //  alert(JSON.stringify(responseJson))
             //   this.call1()
                if (responseJson.status == true) {
                        this.setState({detail:responseJson.detail})
                        GLOBAL.bookingflag = responseJson.list.flag;
                    GLOBAL.bookingid = responseJson.list.g_booking_id
                    GLOBAL.another = responseJson.list.doctor_id
                    GLOBAL.bookingstatus = responseJson.list.booking_status
                    this.setState({statuss:"0"})
                    if (GLOBAL.bookingflag == "1"){
                        this.setState({statuss:"1"})
                    }
                }else{
//                    this.call1()
                    this.setState({statuss:"0"})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
  //      this.setState({location:GLOBAL.location})
    }

ss = () =>{
  const url = GLOBAL.BASE_URL +  'home_patient'

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
          "type":"home_patient",
          "user_id":GLOBAL.user_id,




      }),
  }).then((response) => response.json())
      .then((responseJson) => {
        console.log('bye')

      //  alert(JSON.stringify(responseJson))
          if (responseJson.status == true) {
              this.getRespone1(responseJson)
          }
          if (this.state.visible == false){
if (this.state.appState == "active"){
          this.ss()
        }
        }
      })
      .catch((error) => {
          console.error(error);
          this.hideLoading()
      });
}
getlog = (position)=>{


             var s = position.coords.latitude
             var e = position.coords.longitude
             GLOBAL.lat = s.toString()
             GLOBAL.long = e.toString()

             const url =  GLOBAL.BASE_URL  + 'lat_long_address'

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
                     "latitude": GLOBAL.lat,
                     "longitude":GLOBAL.long,





                 }),
             }).then((response) => response.json())
                 .then((responseJson) => {




                     if (responseJson.status == true) {
                     //  alert(JSON.stringify(responseJson.address))


                         this.setState({location:responseJson.address})
                     GLOBAL.location =  responseJson.address

                     }else{
                         this.setState({location:''})
                     }
                 })
                 .catch((error) => {
                     console.error(error);
                     this.hideLoading()
                 });

         }

video = (item) =>{
     var videoid = getYouTubeID(item.content, {fuzzy: true});
     this.props.navigation.navigate('VideoView',videoid)
}
    _handleStateChange = state =>{
      GLOBAL.mera = "1"
//        alert(GLOBAL.user_id)

  //  this.getNewsUpdate()
        Geolocation.getCurrentPosition(
            (position) => {
              var s = position.coords.latitude
                    var e = position.coords.longitude
                    GLOBAL.lat = s.toString()
                    GLOBAL.long = e.toString()
  this.getlog(position)

            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        length = 500
        GLOBAL.time=''
        GLOBAL.date=''
        GLOBAL.selectedAddress=[]

        const url = GLOBAL.BASE_URL +  'home_patient'

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
                "type":"home_patient",
                "user_id":GLOBAL.user_id,




            }),
        }).then((response) => response.json())
            .then((responseJson) => {
            //   alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.getRespone(responseJson)
                    this.ss()
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });






        this.setState({location:GLOBAL.location})
    }



fg = (index) => {
//  alert(this.state.banner_link[index])
  var b ;
  var a =  this.state.banner_link[index]
  if (a == "no"){

  }else if (a == "doorstep"){
    b = 0
  }else if (a == "nurse"){
    b = 1
  }else if (a == "lab"){
    b = 2
  }
  else if (a == "online"){
    b = 3
  }
  else if (a == "pharmacy"){
    b = 4
  }
  else if (a == "ambulance"){
    b = 5
  }
  else if (a == "offline"){
    b = 6
  }
  else if (a == "medical_services"){
    b = 7
  }
  else if (a == "medical_equipment"){
    b = 8
  }
  else if (a == "medical_equipment"){
    b = 9
  }
  else if (a == "opd"){
    b = 10
  }
  else if (a == "health_package"){
    b = 11
  }
  else if (a == "surgery"){
    b = 12
  }
  else if (a == "hospital"){
    b = 13
  }
  this.selectedFirst(b)

}

    renderPage(image, index) {
//        alert(image)
        return (
          <TouchableOpacity onPress={() => this.fg(index)
          }>
            <View key={index}>
                   <Image style={{ width: window.width ,borderRadius:12, height: 200 ,resizeMode:'stretch'}} source={{ uri: image }} />
            </View>
            </TouchableOpacity>
        );
    }

    handleBackButton = () => {
        if (this.props.isFocused == true){
        BackHandler.exitApp()
        }

   console.log(this.props.isFocused)
  }
    showLoading() {
        this.setState({loading: true})
    }

    componentWillUnmount(){
       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
       }
    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
          this.requestCameraPermission()
      if (Platform.OS === 'android') {                    //Request required permissions from Android
           requestCameraAndAudioPermission().then(_ => {
               console.log('requested!');
           });
       }

//        setInterval(() => alert('hi'), 1000)

        var s = moment().format('YYYY-MM-DD')
        GLOBAL.date = s
        GLOBAL.time=''
        GLOBAL.selectedAddress=[]




           this.props.navigation.addListener('willFocus', this._handleStateChange);

    }








    selectedFirst123 = (item) =>{
          GLOBAL.mera = "0"
        GLOBAL.lab = item
        this.props.navigation.navigate('PackageMember')
      //  alert(JSON.stringify(item))
    }

    renderRowItem3=({item,index}) => {



    var k ;

      k = require('./packagesw.png')

            // var test_included = item.test_included
             var s = "";
            // if (test_included.length == 1){
            //     s = test_included[0]
            // }else {
            //     s = test_included.join(",")
            // }
            return(

              <TouchableOpacity onPress={() => this.selectedFirstLab(item)
                        }>
              <View style={{backgroundColor:'#f1f1f1',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 100, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>

                  <ImageBackground  source={{uri:item.path}}
                                 style  = {{width:'100%', height:200,alignSelf:'center',marginLeft:4,resizeMode:'contain',marginTop:0,borderRadius:20
                                 }}>
                  <View style={{flexDirection: 'row', marginTop:6}}>
                      <Text style={{color:'white',fontWeight:'bold', fontSize:15,marginLeft:5,fontFamily:GLOBAL.semi,alignItems:'flex-start'}}>{item.package_name}</Text>

                  </View>

                  <View style={{flexDirection:'column', marginTop:5}}>
                      <View style={{flexDirection:'row', marginTop:5}}>
                          <Text style={{color:'white', fontSize:13,fontFamily:GLOBAL.regular,marginLeft:5}}>
                              Includes
                          </Text>
                          <Text style={{color:'white',fontSize:13,fontFamily:GLOBAL.semi,marginLeft:3}}>{item.includes} Tests</Text>
                      </View>
                      <Text style={{color:'white',fontFamily:GLOBAL.regular,fontSize:15,marginTop:3,marginLeft:5}}
                      numberOfLines={2}>{item.include_string}</Text>
                  </View>

<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{marginTop:30}}>

<View style = {{flexDirection:'row'}}>
                          <Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>Recomended for:</Text>

        <Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>{item.recommed_for} {item.recommand_for}</Text>
</View>
<View style = {{flexDirection:'row'}}>
        <Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>Age Group:</Text>

<Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>{item.age_group}yrs.</Text>

</View>



                  </View>


                  <View style={{marginRight:30,marginTop:30}}>
                      <View >

                          {item.discount_price != "0.00" && (

                              <Text style={{fontSize:15,color:'white',textDecorationLine:'line-through',marginLeft:5,fontFamily:GLOBAL.semi}}>₹{item.base_price}/-</Text>

                          )}
                          {item.discount_price != "0.00" && (

                              <Text style={{fontSize:15,color:'white',marginLeft:5,fontFamily:GLOBAL.semi}}>₹{item.discount_price}/-</Text>

                          )}

                          {item.discount_price == "0.00" && (

                              <Text style={{fontSize:15,color:'white',marginLeft:5,fontFamily:GLOBAL.semi}}>₹{item.base_price}/-</Text>

                          )}
                          {item.discount_price == "0.00" && (

                              <Text style={{fontSize:15,color:'white',textDecorationLine:'line-through',marginLeft:5,fontFamily:GLOBAL.semi}}></Text>

                          )}


                  </View>

                  </View>

                  </View>





</ImageBackground>
              </View>
              </TouchableOpacity>


            );
        }
    setMenuRef = ref => menuRef = ref;
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    selectedFirst = (index) =>{

  GLOBAL.mera = "0"
        var t = new Date();
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s

        GLOBAL.time=''
        GLOBAL.selectedAddress=[]
        GLOBAL.price=''
        this.setState({mystate:index})
       if (index == 10){
         this.props.navigation.navigate('Quatation')
       }else if (index == 9){
         this.props.navigation.navigate('Pharmacy')
       }else if (index == 2){
         this.props.navigation.navigate('NurseScreen')
       }else if (index == 11){
         this.props.navigation.navigate('MyMap')
       }else if (index == 8){
         this.props.navigation.navigate('OpdHealth')
       }

       else if (index == 5){
         this.props.navigation.navigate('AmbulanceBooking')
       }else if (index == 7 || index == 0){

          this.dialogComponent.show();
       }
       else if (index == 6){

          this.props.navigation.navigate('MedicalService')
       }
         else if (index == 1){

             this.props.navigation.navigate('Labtest')
          }
          else if (index == 3){

              this.props.navigation.navigate('HealthPackege')
           }
           else if (index == 4 ){

               this.props.navigation.navigate('BookingAppointment')
            }
    }

    selectedFirstLab = (item) =>{
        GLOBAL.lab = item
        this.props.navigation.navigate('HealthDetail')
      //  alert(JSON.stringify(item))
    }
    selectedFirst1 = (itemData) => {
        GLOBAL.mera = "0"
        GLOBAL.artdesc= itemData.item
 //       alert(JSON.stringify(itemData.item))
        this.props.navigation.navigate('ArticleDescription')
    }
    selectedFirstsd = (item) => {
        GLOBAL.mera = "0"
        GLOBAL.searchSpeciality = item
        this.props.navigation.navigate('SearchSpeciality')
    //  this.props.navigation.navigate('ArticleDescription')
}
renderRowItem2s = (itemData) => {
//  alert(JSON.stringify(itemData))


    return (

   <TouchableOpacity onPress={()=> this.props.navigation.navigate('ArticleDescription',itemData.item.website_url)}>
      <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :3,marginLeft : 10,width:window.width - 100, shadowColor: '#D3D3D3',
          shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:400}}>

          <Image  source={{uri:itemData.item.image}}
                               style  = {{width:'100%', height:200,alignSelf:'center',marginLeft:4,resizeMode:'cover',marginTop:0,borderRadius:20
                               }}/>






          <View style = {{marginTop:-40,marginLeft:20,width:window.width - 140,borderRadius:5,height:100,backgroundColor:'white',marginBottom:30}}>

          <Text  style = {{flexShrink: 1,fontSize:14,margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',textAlign:'center',width:window.width - 170,fontWeight:'bold',marginTop:12}} numberOfLines = {2}>
              {itemData.item.title}

          </Text>

          <Text numberOfLines={2} style = {{flexShrink: 1,fontSize:14,margin:1,fontFamily:GLOBAL.regular,color:'#83878E',textAlign:'center',width:window.width - 170,fontWeight:'bold',marginBottom:12}}numberOfLines = {1}>
              {itemData.item.subtitle}

          </Text>

          </View>




            </View>
            </TouchableOpacity>


    )
}
_handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    if (nextAppState == "active"){
      this.ss()
    }
    this.setState({appState: nextAppState});
  }


    renderRowItem2 = (itemData) => {

          return (
            <TouchableOpacity onPress={() => this.selectedFirstw(itemData.item.title)
                      }>

            <View style = {{margin:8}}>

                  <View style = {{borderColor:'#83878E',borderWidth:1,width:60,height:60,borderRadius:30}}>




                      <Image source={{uri:itemData.item.image}}
                             style  = {{width:28, height:28,alignSelf:'center',marginLeft:2,resizeMode:'contain',marginTop:14
                             }}

                      />



                  </View>
                  <Text style = {{fontSize:9,margin:1,fontFamily:GLOBAL.semi,color:'#83878E',textAlign:'center',width:60,height:37}}>
                      {itemData.item.title}

                  </Text>
                  </View>
                  </TouchableOpacity>


          )
      }

    renderRowItem1 = (itemData) => {
             return (
               <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
                         }>
               <View style = {{margin:8}}>

                     <View style = {{borderColor:'#83878E',borderWidth:1,width:60,height:60,borderRadius:30}}>




                         <Image source={itemData.item.image}
                                style  = {{width:34, height:34,alignSelf:'center',marginLeft:4,resizeMode:'contain',marginTop:10
                                }}

                         />



                     </View>
                     <Text style = {{fontSize:12,margin:1,fontFamily:GLOBAL.semi,color:'#83878E',textAlign:'center'}}>
                         {itemData.item.title}

                     </Text>
                     </View>
  </TouchableOpacity>

             )
         }

    calls = () =>{
        var phoneNumber = `tel:${this.state.call}`;
          Linking.openURL(phoneNumber);
    }
cancel = () =>{
  this.setState({visible:false})
}
renderRowItem2svarticles = (itemData,index) => {
//  alert(JSON.stringify(itemData))

var k ;

  k = require('./packagesw.png')
    return (

   <TouchableOpacity onPress={()=> this.video(itemData.item)}>
      <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :3,marginLeft : 10,width:window.width - 100, shadowColor: '#D3D3D3',
          shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:150}}>

          <ImageBackground  source={k}
                               style  = {{width:'100%', height:150,alignSelf:'center',marginLeft:4,resizeMode:'cover',marginTop:0,borderRadius:20
                               }}>




<Text  style = {{flexShrink: 1,fontSize:14,margin:1,marginTop:100,fontFamily:GLOBAL.semi,color:'white',textAlign:'center',width:window.width - 100,fontWeight:'bold'}}>
    {itemData.item.title}

</Text>

</ImageBackground>






            </View>
            </TouchableOpacity>


    )
}

_renderItem = ({item, index}) => {


             return (
               <TouchableOpacity onPress={() => this.fg(index)
               }>
                   <Image onError={(e) => console.log(e.nativeEvent.error) }style={{ width: window.width - 40,borderRadius:12, height: 200 ,resizeMode:'stretch'}} source={{ uri: item }} />
</TouchableOpacity>
             );
         }
call = () =>{
    GLOBAL.mera = "0"
  this.setState({visible:false})


if (this.state.is_chat_or_video_start == "1"){
  const url = GLOBAL.BASE_URL +  'start_status_online_consult'

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
     "booking_id":GLOBAL.mybookingid,
     "what":"2",
     "from":"patient"





 }),
 }).then((response) => response.json())
 .then((responseJson) => {

   var phoneNumber = `tel:${this.state.call}`;
  //  Linking.openURL(phoneNumber);
    if (booking_type == "chat"){
        this.props.navigation.navigate('Chat')
    }else {
        this.props.navigation.navigate("VideoCall", {
            channelName: GLOBAL.bookingid,
            onCancel: (message) => {
                this.setState({
                    visible: true,
                    message
                });
            }
        })
    }


 })
 .catch((error) => {
 console.error(error);
 this.hideLoading()
 });
}else {
  var phoneNumber = `tel:${this.state.call}`;
 //  Linking.openURL(phoneNumber);
   if (booking_type == "chat"){
       this.props.navigation.navigate('Chat')
   }else {
       this.props.navigation.navigate("VideoCall", {
           channelName: GLOBAL.bookingid,
           onCancel: (message) => {
               this.setState({
                   visible: true,
                   message
               });
           }
       })
   }

}




    }

        render() {


          var radio_props  = []
      if (this.state.mystate == 0){
        radio_props = [
         {label: 'Planned ', value: 0 },
         {label: 'Emergency', value: 1 }
       ];
      }else {
             radio_props = [
              {label: 'Rental', value: 0 },
              {label: 'Purchase', value: 1 }
            ];
          }
              if(this.state.loading){
                  return(
                      <View style={styles.containers}>
                          <Loader>
                          </Loader>
                      </View>
                  )
              }
        return (

                <View style={styles.container}>


 {this.state.statuss == "1" && (
                        <TouchableOpacity onPress = {()=> this.props.navigation.navigate('Chat')}>

                            <View style = {{width:window.width,height:50,backgroundColor:'black'}}>
                                <Text style = {{alignSelf:'center',marginTop:8,color:'white'}}>
                                    Your Booking Start on {this.state.detail}

                                </Text>


                            </View>
                        </TouchableOpacity>
                    )}


                    <ScrollView keyboardShouldPersistTaps='always'>

                    <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
<Text style = {{color:'#83878E',fontFamily:GLOBAL.regular,fontSize:14,marginLeft:17,marginTop:22}}>
Connect with Doctor
</Text>

<View style = {{flexDirection:'row',marginRight:18}}>
     <TouchableOpacity onPress={()=> this.calls()}>
<View style = {{backgroundColor:'#EAEBEC',width:40,height:40,marginTop:8,borderRadius:20}}>
<Image style = {{width :20 ,height: 20,marginTop:10,marginLeft:10,resizeMode: 'contain',marginRight:18}}
       source={require('./phone_call.png')}/>
       </View>
       </TouchableOpacity>
                                                                     <TouchableOpacity onPress={()=> this.props.navigation.navigate('Wallet')}>
       <View style = {{backgroundColor:'#EAEBEC',width:40,height:40,marginTop:8,borderRadius:20,marginLeft:6}}>
       <Image style = {{width :20 ,height: 20,marginTop:10,marginLeft:10,resizeMode: 'contain',marginRight:18}}
              source={require('./wallet.png')}/>
              </View>
              </TouchableOpacity>

</View>



</View>

<Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize:22,marginLeft:17,marginTop:3}}>
Good Advice
</Text>
<TouchableOpacity onPress={() => this.props.navigation.navigate('Search')
}>
<View style = {{marginTop:10,marginLeft:17,width:window.width - 34 ,backgroundColor:'#EAEBEC',height:41,borderRadius:5,flexDirection:'row'}}>
<Image style = {{width :18 ,height: 18,marginTop:10,marginLeft:15,resizeMode: 'contain',marginRight:18}}
source={require('./search.png')}/>
<TextInput
         style={{height: 40,marginLeft:2,marginTop:0, fontSize: 14,color:'#83878E',fontFamily:GLOBAL.semi}}
         placeholder="Search health issues, doctors, clinics…"
         editable = {false}
         onChangeText={(text) => this.setState({phone:text})}
     />



</View>
</TouchableOpacity>

                    <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize:16,marginLeft:17,marginTop:11}}>
    Trending Services
    </Text>
    <FlatList style = {{marginLeft:5,width:window.width - 10}}
                             data={this.state.moviesList}
                             horizontal


                             keyExtractor={this._keyExtractor}
                             renderItem={this.renderRowItem1}

                   />

                   <View style={{width:window.width-40,alignSelf:'center',borderRadius:12}}>
                   <Carousel style = {{alignSelf:'center'}}
                                            ref={(c) => { this._carousel = c; }}
                                            data={this.state.banner}
                                            renderItem={this._renderItem}
                                            sliderWidth={window.width - 40}
                                            itemWidth={window.width - 40 }
                                          />
                                            </View>

                                            <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                               <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize:16,marginLeft:17,marginTop:11}}>
                                               Trending Specialities
                                               </Text>
                                                                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('SearchSpeciality')}>
                                               <Text style = {{color:'#D90000',fontFamily:GLOBAL.semi,fontSize:14,marginRight:17,marginTop:11}}>
                                               View All
                                               </Text>
                                               </TouchableOpacity>

                                               </View>

                                               <FlatList style = {{marginLeft:5,width:window.width - 10}}
                                                                        data={this.state.speciality}
                                                                        horizontal


                                                                        keyExtractor={this._keyExtractor}
                                                                        renderItem={this.renderRowItem2}

                                                              />

                                                              <View style={{width:window.width,alignSelf:'center',borderRadius:12,marginTop:4,height:200}}>

                                       <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize:16,marginLeft:17,marginTop:11}}>
                                       Health Packages
                                       </Text>
                                       <TouchableOpacity onPress={() => this.props.navigation.navigate('HealthPackege')
                                       }>
                                       <Text style = {{color:'#D90000',fontFamily:GLOBAL.semi,fontSize:14,marginRight:17,marginTop:11}}>
                                       View All
                                       </Text>
                                       </TouchableOpacity>
</View>
                                       <FlatList style = {{marginLeft:5,width:window.width - 10,marginBottom:10}}
                                data={this.state.package}
                                horizontal

                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderRowItem3}

                      />





                                       </View>



                                       <View style={{width:window.width,alignSelf:'center',borderRadius:12,marginTop:4,height:330}}>

                                                                           <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                                                           <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize:16,marginLeft:17,marginTop:11}}>
                                                                           Top Articles
                                                                           </Text>
                                                                           <TouchableOpacity onPress={() => this.props.navigation.navigate('ArticleList')
                                                                           }>
                                                                           <Text style = {{color:'#D90000',fontFamily:GLOBAL.semi,fontSize:14,marginRight:17,marginTop:11}}>
                                                                           View All
                                                                           </Text>
                                                                           </TouchableOpacity>
                                                                         </View>
                                                                           <FlatList style = {{marginLeft:5,width:window.width - 10,marginBottom:10}}
                                                                         data={this.state.articles}
                                                                         horizontal

                                                                         keyExtractor={this._keyExtractor}
                                                                         renderItem={this.renderRowItem2s}

                                                                         />





                                                                           </View>


                                                                           <View style={{width:window.width,alignSelf:'center',borderRadius:12,marginTop:4,height:200}}>

                                                                                           <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                                                                           <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize:16,marginLeft:17,marginTop:11}}>
                                                                                           Top Videos
                                                                                           </Text>

                                                                                           <TouchableOpacity onPress={()=> this.props.navigation.navigate('VideoList')}>
                                                                                   <Text style = {{color:'#D90000',fontFamily:GLOBAL.semi,fontSize:14,marginRight:17,marginTop:11}}>
                                                                                   View All
                                                                                   </Text>
                                                                                   </TouchableOpacity>

                                                                                         </View>
                                                                                           <FlatList style = {{marginLeft:5,width:window.width - 10,marginBottom:10}}
                                                                                         data={this.state.varticles}
                                                                                         horizontal

                                                                                         keyExtractor={this._keyExtractor}
                                                                                         renderItem={this.renderRowItem2svarticles}

                                                                                         />





                                                                                           </View>

                        <View style = {{height:70}}>

                        </View>

                        <DialogComponent
                                                         dialogStyle = {{backgroundColor:'transparent'}}
                                                         dialogTitle={<DialogTitle title="Dialog Title" />}
                                                         dismissOnTouchOutside={true}
                                                         dismissOnHardwareBackPress={true}
                                                         ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
                                                     >
                                                         <View style = {{width :window.width - 30 ,alignSelf:'center',backgroundColor:'transparent',flexDirection:'column'}}>

                                                         <View style = {{backgroundColor:'#D90000',width:'100%',height :50, justifyContent:'space-between', flexDirection:'row'}}>

                                                             <Text style = {{margin:15,marginTop:10,color:'white',fontFamily:GLOBAL.semi,fontSize:17, }}>
                                                             Choose Booking Type
                                                             </Text>
                                                           <TouchableOpacity onPress={()=> this.dialogComponent.dismiss()}>
                                                           <Image style={{width:25, height:25, resizeMode:'contain',  margin:15}} source={require('./remove.png')}/>
                                                           </TouchableOpacity>

                                                             </View>

                                                             <View style = {{width:window.width - 30,backgroundColor:'white',height:140,}}>
                                                             <View style={{marginTop:20, width:'100%', marginLeft:20, alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                                                                 <RadioForm
                                                                     radio_props={radio_props}
                                                                     initial={0}
                                                                     buttonColor={'#D90000'}
                                                                     buttonOuterColor = {'#D90000'}
                                                                     selectedButtonColor = {'#D90000'}
                                                                     animation={false}
                                                                     buttonSize={12}
                                                                     labelColor={'black'}
                                                                     buttonStyle={{marginTop:20,}}
                                                                     buttonWrapStyle={{marginTop:20}}
                                                                     labelStyle = {{fontSize:16,fontFamily:GLOBAL.semi,width:'90%',marginLeft:10,paddingBottom:10}}
                                                                     onPress={(value) => {this.setState({value:value})}}
                                                                 />

                                                             </View>

                                                                 <Button
                                                                     style={{padding:6,marginTop:5,width:100,fontSize: 14, color: 'white',backgroundColor:'#D90000',alignSelf:'center',height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                                                                     styleDisabled={{color: 'red'}}
                                                                     onPress={() => this.login()}>
                                                                     SUBMIT
                                                                 </Button>

                                                             </View>
                                                         </View>
                                                     </DialogComponent>
    </ScrollView>


    <Dialog
        visible={this.state.visible}
        onTouchOutside={() => {
          this.setState({ visible: false });
        }}
      >
        <DialogContent>

        <View style = {{width:'80%',alignSelf:'center',backgroundColor:'white',height:150,borderRadius:12}}>
 {booking_type == "chat" && (
 <Text style = {{color:'1E2432',fontSize:22, fontSize:13,alignSelf:'center',marginTop:20}}>
 Your Chat Session has been Started. Please Join to get Benefit for this Service.


 </Text>

 )}

 {booking_type != "chat" && (
 <Text style = {{color:'1E2432',fontSize:22, fontSize:13,alignSelf:'center'}}>
 Your Video Session has been Started. Please Join to get Benefit for this Service.


 </Text>

 )}

 <View style = {{flexDirection:'row',width:300,alignSelf:'center',alignSelf:'center'}}>
 <Button
     style={{padding:4,marginTop:28,fontSize: 20, color: 'white',backgroundColor:'#7BAAED',marginLeft:30,width:100,height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
     styleDisabled={{color: 'red'}}
     onPress={() => this.call()}>
     JOIN
 </Button>

 <Button
     style={{padding:4,marginTop:28,fontSize: 20, color: 'white',backgroundColor:'#7BAAED',marginLeft:30,width:100,height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
     styleDisabled={{color: 'red'}}
     onPress={() => this.cancel()}>
     CANCEL
 </Button>

 </View>


        </View>


        </DialogContent>
      </Dialog>
                </View>


        );
    }
}
export default withNavigationFocus(Home);
const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f7f8f9'
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
    }
})
