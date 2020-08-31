import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage,
    ImageBackground,
      Share,
      Modal,
      Alert,
    StatusBar
} from 'react-native';

import ActionSheet from 'react-native-actionsheet'
import {NavigationActions,StackActions} from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Card} from 'react-native-shadow-cards';

import Carousel from 'react-native-snap-carousel';
import Loader from './Loader.js';
import Geolocation from '@react-native-community/geolocation';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import moment from 'moment';
type Props = {};
import { Dialog, DialogContent, DialogComponent, DialogTitle } from 'react-native-dialog-component';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
let customDatesStyles = [];
let options = {
    permissions: {
        read: ["Height", "Weight","DateOfBirth","StepCount","ActiveEnergyBurned","BiologicalSex","BloodGlucose","BodyMassIndex"],
        write: ["Height", "Weight"]
    }
};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Gulcose extends Component {
    state = {
        name :'',
        email:'',
        image :'',
        company :'',
        loading:false,
        visible:false,
        atleastSelected:0,
        selected:false,
              department:['Before Breakfast','After Breakfast','Before Lunch','After Lunch','Before Dinner','After Dinner','Fasting','Others'],
        data:[],
        call:'',
        speciality:[],
        banner:[],
        package:[],
        articles:[],
        relation:'',
        before:'',
        time:'',
        after:'',
        date:new Date('2020-06-12T14:42:42'),
  //  mode: 'date',
      mode: 'time',
    show: false,
    relation:'',

        value:0,
        mystate:0,
        height:'',
        weight:'',
        bmi:'',
        check:'',
ref_code:'',
        moviesLists :[
           {

               title :'About Us',
               image:require('./info.png')
           },


           {

               title :'Help & Support',
               image:require('./abc.png')
           },
           {

               title :'Privacy and Policy',
               image:require('./privacy.png')
           },





       ],

        moviesList :[
           {

               title :'All HealthRecord',
               image:require('./calendar.png')
           },


           {

               title :'Body Measurement',
               image:require('./order.png')
           },
           {

               title :'Allergies',
               image:require('./medicines.png')
           },

           {
               title :'Illness',
               image:require('./test.png')
           },
           {

               title :'Surgery',
               image:require('./nursehistory.png')
           },
           {

               title :'Blood Glucose',
               image:require('./test.png')
           },
           {

               title :'Blood Pressure',
               image:require('./test.png')
           },




       ],
        images :[

        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'Blood Gulcose',
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

     }
     showActionSheet = () => {
        this.ActionSheet.show()
      }
     _fancyShareMessage=()=>{
             var reefercode = this.state.ref_code
             var a = 'Hey! Checkout Anytimedoc app. ' +'https://play.google.com/store/apps/details?id=com.anytimedoc' +' .Use my referral code ' + reefercode+ ' to get 500 wallet points.'

             Share.share({
                     message:a
                 },{
                     tintColor:'green',
                     dialogTitle:'Share this app via....'
                 }
             ).then(this._showResult);
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

              _handleStateChange = state => {
this.getNewsUpdate()

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



               if (responseJson.status == true) {



                   this.setState({name :responseJson.user_details.name})


                   this.setState({height: responseJson.user_details.height})
                   this.setState({weight: responseJson.user_details.weight})
                   this.setState({email :responseJson.user_details.email})
                   this.setState({image :responseJson.user_details.image})
                    this.setState({ref_code: responseJson.refer_code})
               }else {
                   alert('Unable to Process your request')
               }
           })
           .catch((error) => {
               console.error(error);
           });

   }


   submit = ()=>{
     console.log(GLOBAL.user_id)
      console.log(this.state.before)
        console.log(this.state.after)
              console.log(this.state.dob)


              if (this.state.dob == ''){
                alert('Please select date')
              }
            else if (this.state.time == ''){
                alert('Please select time')
              }
              else if (this.state.relation == ''){
                  alert('Please select Measurement')
                }
                else if (this.state.before == ''){
                    alert('Please enter Concentration')
                  }
else {

  var b = {
    "sugar_concentration":this.state.before,
    "mesaurement":this.state.relation,
    "notes":""
  }

  console.log(JSON.stringify(b))
     this.showLoading()
             const url = GLOBAL.BASE_URL +  'add_sugar_bp'
console.log(url)
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
                     "user_id":GLOBAL.user_id,
                     "time":this.state.time,
                     "content":JSON.stringify(b),
                     "for_":"sugar",
                     "date":this.state.dob,




                 }),
             }).then((response) => response.json())
                 .then((responseJson) => {

     this.hideLoading()


                     if (responseJson.status == true) {

                       this.props
                       .navigation
                       .dispatch(StackActions.reset({
                         index: 0,
                         actions: [
                           NavigationActions.navigate({
                             routeName: 'MyHealthRecord',
                             params: { someParams: 'parameters goes here...' },
                           }),
                         ],
                       }))

                     }
                 })
                 .catch((error) => {
                     console.error(error);
                     this.hideLoading()
                 });
               }
   }
    componentDidMount(){
    //  this.getNewsUpdate()
      var a = ""
 this.props.navigation.addListener('willFocus',this._handleStateChange);

       //this.props.navigation.addListener('willFocus', this._handleStateChange);



    }
    // selectedFirst = (indexs) => {
    //         var a = this.state.images
    //         for (var i = 0;i<this.state.images.length ;i ++){
    //
    //             this.state.images[i].selected = ''
    //         }
    //         var index = a[indexs]
    //         if (index.selected == ""){
    //             index.selected = "Y"
    //         }else{
    //             index.selected = ""
    //         }
    //         this.state.images[indexs] = index
    //         this.setState({images:this.state.images})
    //         this.setState({atleastSelected:1})
    //     }


    login = () => {
        if(this.state.atleastSelected == 1){
        GLOBAL.nurseArray = this.state.images
        GLOBAL.type = "2"
        this.props.navigation.navigate('NurseTime')

        }
        else{
            alert('Please select nurse service')
        }
    }


    renderRowItem2 = (itemData) => {

           return (

             <View style = {{margin:8}}>

                   <View style = {{borderColor:'#83878E',borderWidth:1,width:50,height:50,borderRadius:30}}>




                       <Image source={{uri:itemData.item.image}}
                              style  = {{width:24, height:24,alignSelf:'center',marginLeft:2,resizeMode:'contain',marginTop:14
                              }}

                       />



                   </View>
                   <Text style = {{fontSize:12,margin:1,fontFamily:GLOBAL.semi,color:'#83878E',textAlign:'center',width:60,height:30}}>
                       {itemData.item.title}

                   </Text>
                   </View>


           )
       }

       selectedFirst = (index) =>{
         if (index == 6){
           this.props.navigation.navigate('Wallet')
         }else if (index == 6){
            this.props.navigation.navigate('ListMember')
          }
          else if (index == 4){
             this.props.navigation.navigate('MySurgery')
           }
           else if (index == 1){
              this.props.navigation.navigate('Body')
            }
           else if (index == 0){
              this.props.navigation.navigate('HealthRecord')
            }else if (index == 2){
               this.props.navigation.navigate('MyAllergies')
             }
             else if (index == 3){
                this.props.navigation.navigate('MyIllness')
              }
              else if (index == 7){
                 this.navigateToScreen1('Login')
               }
              //navigateToScreen1

       }
    renderRowItem1 = (itemData) => {
           return (
             <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
                       }>
             <View style = {{margin:2,flexDirection:'row',justifyContent:'space-between'}}>

             <View style = {{flexDirection:'row'}}>

                   <View style = {{backgroundColor:'#D90000',width:50,height:50,borderRadius:12,marginTop:6}}>




                       <Image source={itemData.item.image}
                              style  = {{width:24, height:24,alignSelf:'center',marginLeft:2,resizeMode:'contain',marginTop:12
                              }}

                       />



                   </View>
                   <Text style = {{fontSize:15,marginLeft:10,marginTop:21,fontFamily:GLOBAL.regular,color:'#1E1F20'}}>
                       {itemData.item.title}

                   </Text>
                   </View>
                   <Image style = {{width :22 ,height :22,marginRight:34,marginTop:18}}
                          source={require('./arrowlogo.png')}/>
                   </View>
</TouchableOpacity>

           )
       }

selectedFirstqw = (index) =>{
  if (index == 0){
    this.props.navigation.navigate('HealthRecord')
  }  else if (index == 1){
      this.props.navigation.navigate('Support')
    }else if (index == 2){
        this.props.navigation.navigate('Privacyp')
      }
}

       renderRowItem1s = (itemData) => {
              return (
                <TouchableOpacity onPress={() => this.selectedFirstqw(itemData.index)
                          }>
                <View style = {{margin:2,flexDirection:'row',justifyContent:'space-between'}}>

                <View style = {{flexDirection:'row'}}>

                      <View style = {{backgroundColor:'#D90000',width:50,height:50,borderRadius:12,marginTop:6}}>




                          <Image source={itemData.item.image}
                                 style  = {{width:24, height:24,alignSelf:'center',marginLeft:2,resizeMode:'contain',marginTop:12
                                 }}

                          />



                      </View>
                      <Text style = {{fontSize:15,marginLeft:10,marginTop:22,fontFamily:GLOBAL.regular,color:'#1E1F20'}}>
                          {itemData.item.title}

                      </Text>
                      </View>
                      <Image style = {{width :22 ,height :22,marginRight:34,marginTop:18}}
                             source={require('./arrowlogo.png')}/>
                      </View>
       </TouchableOpacity>

              )
          }

       _renderItem = ({item, index}) => {
               return (
                     <Image style={{ width: window.width - 40,borderRadius:12, height: 200 ,resizeMode:'stretch'}} source={{ uri: item }} />
               );
           }

    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-between'}}>

            <View>

                        <View style = {{flexDirection:'row'}}>



                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :window.width - 80,fontWeight:'bold'}}>

                        {item.title}
                    </Text>


                            {item.selected != '' &&(

                                <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:34,marginTop:20}}
                                       source={require('./check.png')}/>
                            )}
                            {item.selected == '' &&(

                                <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:34,marginTop: 20}}
                                       source={require('./uncheck.png')}/>
                            )}

                        </View>
                    <Text style={{marginTop:-8,fontSize : 14,color :'#D90000', height:'auto',fontFamily:GLOBAL.semi,marginBottom:8,marginLeft:10}}>

                      ₹ {item.price}
                    </Text>
            </View>


                </View>
            </TouchableOpacity>
        )
    }

login = () =>{
  if (this.state.mystate ==  0){

    if (this.state.value == 0) {
 this.props.navigation.navigate('DoctorVisitDetail')
    }else {

           this.props.navigation.navigate('Emergency')
}
  }

  else{
  if (this.state.value == 0) {
         GLOBAL.rentPurchase = "Rental"
         this.props.navigation.navigate('MedicalEquipment')
     }else
         GLOBAL.rentPurchase = "Purchase"
         this.props.navigation.navigate('MedicalEquipment')

}
}

    renderRowItem2s = (itemData) => {
      console.log(itemData.item.image)


        return (


          <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :3,marginLeft : 10,width:window.width - 100, shadowColor: '#D3D3D3',
              shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:400}}>

              <Image  source={{uri:itemData.item.image}}
                               style  = {{width:'100%', height:200,alignSelf:'center',marginLeft:4,resizeMode:'cover',marginTop:0,borderRadius:20
                               }}/>






              <Card style = {{marginTop:-40,marginLeft:20,width:window.width - 140,borderRadius:5,height:100,backgroundColor:'white',marginBottom:30}}>

              <Text  style = {{flexShrink: 1,fontSize:14,margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',textAlign:'center',width:window.width - 170,fontWeight:'bold',marginTop:12}}>
                  {itemData.item.title}

              </Text>

              <Text numberOfLines={2} style = {{flexShrink: 1,fontSize:14,margin:1,fontFamily:GLOBAL.regular,color:'#83878E',textAlign:'center',width:window.width - 170,fontWeight:'bold',marginBottom:12}}>
                  {itemData.item.description}

              </Text>

              </Card>




                </View>


        )
    }
    navigateToScreen1 = (route) => () => {
      alert('hi')

        Alert.alert('Logout!','Are you sure you want to Logout?',
          [{text:"Cancel"},
            {text:"Yes", onPress:()=>this._YesLogout()
     },
          ],
          {cancelable:false}
          )

      }
      show = mode => {
        this.setState({
          show: true,
          mode,
        });
      }
    _YesLogout=()=>{

    //        const url = GLOBAL.BASE_URL +  'logout'
    // //      this.showLoading()
    //       fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user_id : GLOBAL.userid,
    //   }),
    // }).then((response) => response.json())
    //     .then((responseJson) => {

    // //    alert(JSON.stringify(responseJson))
    //   //     this.hideLoading()
    //        if (responseJson.status == true) {
      AsyncStorage.removeItem('userID');

       this.props
       .navigation
       .dispatch(StackActions.reset({
         index: 0,
         actions: [
           NavigationActions.navigate({
             routeName: 'Login',
             params: { someParams: 'parameters goes here...' },
           }),
         ],
       }))




        //    }else {
        //        alert('Something Went Wrong.')
        //    }
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
        }
        blood = (index) => {
            this.setState({relation:this.state.department[index]})
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


              <View style={{backgroundColor:'#f1f1f1',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 100, shadowColor: '#D3D3D3',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>

                  <ImageBackground  source={k}
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
                      maxLines={2}>{item.include_string}</Text>
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


            );
        }
        datepicker = () => {
           //   alert('hi')
          this.show('date');
        }

        datepickers = () => {
           //   alert('hi')
          this.show('time');
        }
        setDate = (event, date,mode) => {
            this.setState({show:false})
        if (mode == "date"){

                      const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

                    this.setState({dob :moment(date).format("YYYY-MM-DD")})
        }else{
            this.setState({time :moment(date).format('hh:mm a')})
          //
        }




          // this.setState({
          //   show: Platform.OS === 'ios' ? true : false,
          //   date,
          // });
        }
    render() {
    const { show, date, mode } = this.state;
  var s = moment().format('DD MMMM')
        if(this.state.loading){
            return(
                <View style={styles.containers}>
                    <Loader>
                    </Loader>
                </View>
            )
        }
        return (

          <SafeAreaView style={styles.AndroidSafeArea}>
                         <StatusBar backgroundColor="#639ced" barStyle="light-content" />


  <KeyboardAwareScrollView style = {{backgroundColor:'#FAFAFA',height:window.height}} keyboardShouldPersistTaps='always'>







<Card style = {{marginLeft:10,width:window.width -20,borderRadius:8,marginTop:30,backgroundColor:'white',height:237}}>
  <TouchableOpacity onPress={()=>this.datepicker()}>
<View style = {{flexDirection:'row',justifyContent:'space-between',margin:10,marginTop:20}}>

<Text style = {{color:'black',fontSize:16,fontWeight:GLOBAL.medium}}>
Date
</Text>
<Text style = {{color:'black',fontSize:16,fontWeight:GLOBAL.medium}}>
{this.state.dob}
</Text>

</View>
</TouchableOpacity>

<View style = {{width:window.width - 20 ,height:1,backgroundColor:'black',marginTop:6}}>
</View>

<TouchableOpacity onPress={()=>this.datepickers()}>
<View style = {{flexDirection:'row',justifyContent:'space-between',margin:10,marginTop:20}}>

<Text style = {{color:'black',fontSize:16,fontWeight:GLOBAL.medium}}>
Time
</Text>
<Text style = {{color:'black',fontSize:16,fontWeight:GLOBAL.medium}}>
{this.state.time}
</Text>

</View>
</TouchableOpacity>
<View style = {{width:window.width - 20 ,height:1,backgroundColor:'black',marginTop:10}}>
</View>


<TouchableOpacity onPress={()=>this.showActionSheet()}>
<View style = {{flexDirection:'row',justifyContent:'space-between',margin:10,marginTop:20}}>

<Text style = {{color:'black',fontSize:16,fontWeight:GLOBAL.medium}}>
Measurement
</Text>
<Text style = {{color:'black',fontSize:16,fontWeight:GLOBAL.medium}}>
{this.state.relation}
</Text>

</View>
</TouchableOpacity>
<View style = {{width:window.width - 20 ,height:1,backgroundColor:'black',marginTop:10}}>
</View>
<View style = {{flexDirection:'row',justifyContent:'space-between',margin:10,marginTop:20}}>

<Text style = {{color:'black',fontSize:16,fontWeight:GLOBAL.medium}}>
Concentration
</Text>
<TextInput
                  style={{marginLeft:20,marginTop:-10, fontSize: 14,color:'#1E1F20',fontFamily:GLOBAL.semi,height:40}}
                  placeholder="Enter in mg/dl"
                     keyboardType={"numeric"}
                  onChangeText={(text) => this.setState({before:text})}
              />

</View>

<View style = {{width:window.width - 20 ,height:1,backgroundColor:'black',marginTop:-10}}>
</View>






               </Card>
               { this.state.show == true && (

                   <DateTimePicker value={date}
                                   mode={mode}
                                   is24Hour={false}
                                   maximumDate= {new Date()}
                                   display="default"
                                   onChange={(event,date)=>this.setDate(event, date,mode)} />
               )}

               <Button
                   style={{padding:12,marginTop:30,fontSize: 18, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
                   styleDisabled={{color: 'red'}}
                   onPress={() => this.submit()}>
            SUBMIT
               </Button>


               <ActionSheet
                       ref={o => this.ActionSheet = o}
                       title={'Select Measurement'}
                       options={this.state.department}
                       cancelButtonIndex={8}
                       destructiveButtonIndex={1}
                       onPress={(index) => { this.blood(index)}}
                     />













  </KeyboardAwareScrollView>



                </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor :'white',

    },
    containers: {

        backgroundColor :'white'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor: GLOBAL.COLOR.Header,
       paddingTop: Platform.OS === "android" ? 0 : 0
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
