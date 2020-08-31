import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Linking,

    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');

import store from 'react-native-simple-store';
import Loader from './Loader.js';
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var arrayholder=[];

export default class Speciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            department :[],
            speciality :[],
            hospital:[],
            price:[],
            results: [],
            selectedState:0,
            location:'',
            array : [
             {
               title:'Book Appointment',
               sub:'No booking fees',
               selected:'Y'
             },
             {
               title:'Consult Online',
               sub:'Chat, Video',
               selected:''
             }


            ]
        };

    }

    componentWillUnmount() {

    }

    fetchSpeciality = (res,type,depart) => {
        var myArray = [];
        var speciality = '';
        if (res == null || res.length == 0) {
            this.fetchHospital(res,type,depart,'')
        } else {
            var array = res.array
            for (var i = 0; i < array.length; i++) {
                if (array[i].selected == "Y") {
                    speciality = speciality + array[i].id + ','
                    myArray.push(array[i])

                }
            }
            speciality = speciality.slice(0, -1);

            store.get('hospital')
                .then((res) =>
                    //  alert(JSON.stringify(res))
                    this.fetchHospital(res,type,depart,speciality)
                )

        }
        this.setState({speciality:myArray})

    }

    addBookmark = (id) =>{

          this.showLoading()
          const url =  GLOBAL.BASE_URL  + 'add_patient_doc_bookmark'

          fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },


              body: JSON.stringify({
                  "user_id":GLOBAL.user_id,
                  "doctor_id":id





              }),
          }).then((response) => response.json())
              .then((responseJson) => {


        this.hideLoading()


                  if (responseJson.status == true) {
                    alert('Bookmark Added Successfully')
                  }else{

                  }
              })
              .catch((error) => {
                  console.error(error);
                  this.hideLoading()
              });

        }

        deleteBookmark = (id) =>{
          this.showLoading()
          const url =  GLOBAL.BASE_URL  + 'delete_bookmark_patient'

          fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },


              body: JSON.stringify({
                  "user_id":GLOBAL.user_id,
                  "doctor_id":id





              }),
          }).then((response) => response.json())
              .then((responseJson) => {


        this.hideLoading()


                  if (responseJson.status == true) {
                    alert('Bookmark Delete Successfully')
                  }else{

                  }
              })
              .catch((error) => {
                  console.error(error);
                  this.hideLoading()
              });
        }

        bookmark = (item,index) => {

          if (item.is_bookmark == "0"){
            this.addBookmark(item.id)
            var a = this.state.results[index]
            a.is_bookmark = "1"
            this.state.results[index] = a
            this.setState({results:this.state.results})

          }else{
            this.deleteBookmark(item.id)
            var a = this.state.results[index]
            a.is_bookmark = "0"
            this.state.results[index] = a
              this.setState({results:this.state.results})
          }


        }


    call = () => {
  var phoneNumber = `tel:${'7724000070'}`;
    Linking.openURL(phoneNumber);
}
    fetchHospital = (res,type,depart,speciality) =>{
        var myArray = [];
        var hospital = '';
        if (res == null || res.length == 0) {
            this.setState({hospital:[]})

        } else {
            var array = res.array
            for (var i = 0; i < array.length; i++) {
                if (array[i].selected == "Y") {
                    hospital = hospital + array[i].id + ','
                    myArray.push(array[i])
                }
            }
            this.setState({hospital: myArray})
            hospital = hospital.slice(0, -1);
        }

            const url =  GLOBAL.BASE_URL  + 'fetch_nearest_doctor'

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
                    "lat":GLOBAL.lat,
                    "long":GLOBAL.long,
                    "doctor_condition":GLOBAL.doctor_condition,
                    "type":type,
                    "departments_filter":depart,
                    "hospital_filter":hospital,
                    "price_range_min":"",
                    "price_range_max":"",
                    "is_favrouite":"",
                    "specialty":speciality,




                }),
            }).then((response) => response.json())
                .then((responseJson) => {

//                    alert(JSON.stringify(responseJson))
console.log(responseJson.doctor_list_s);

                    if (responseJson.status == true) {
                        this.setState({results:responseJson.doctor_list_s})
                        arrayholder = responseJson.doctor_list_s
                  }else{
                        this.setState({results:[]})
                        arrayholder=[]
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });


    }

    fetchDepartment = (res,type) => {
        var myarray = [];
        var depart = '';
        if (res == null || res.length == 0) {
            this.fetchSpeciality(res,type,'')
        } else {
            var array = res.array
            for (var i = 0; i < array.length; i++) {
                if (array[i].selected == "Y") {
                    depart = depart + array[i].id + ','
                    myarray.push(array[i])

                }
            }
            depart = depart.slice(0, -1);


            store.get('speciality')
                .then((res) =>
                    //  alert(JSON.stringify(res))
                    this.fetchSpeciality(res,type,depart)
                )
        }
        this.setState({department:myarray})


    }

    getApicall(type)
        {

            store.get('departments')
                .then((res) =>
                    //  alert(JSON.stringify(res))
                    this.fetchDepartment(res,type)
                )



    }
    Capitalize(str){

  var a = ""
      if (typeof(str) !== 'undefined' || str != null) {
         console.log('Not Undefined or Not Null')
        // this.Capitalize(get)
        return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
        return a
  }


    }
    setModalVisible=(visible,get)=> {


    //  this.Capitalize(get)
        this.setState({text:get})
        if (typeof get !== 'undefined') {
            this.getApicall(get)
        }

        this.setState({modalVisible: visible});
    }


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'Doctor appointment',
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



    online = () =>{
      this.showLoading()
      const url =  GLOBAL.BASE_URL  + 'fetch_nearest_doctor'

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
              "lat":GLOBAL.lat,
              "long":GLOBAL.long,
              "doctor_condition":"online",
              "type":"",
              "departments_filter":"",
              "hospital_filter":"",
              "price_range_min":"",
              "price_range_max":"",
              "is_favrouite":"",
              "specialty":this.props.navigation.state.params,




          }),
      }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson.doctor_list_s)

    this.hideLoading()


              if (responseJson.status == true) {
                  this.setState({results:responseJson.doctor_list_s})
                  arrayholder = responseJson.doctor_list_s
              }else{
                  this.setState({results:[]})
                  arrayholder =[]
              }
          })
          .catch((error) => {
              console.error(error);
              this.hideLoading()
          });
    }

    offline = () =>{

      this.showLoading()
      const url =  GLOBAL.BASE_URL  + 'fetch_nearest_doctor'

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
              "lat":GLOBAL.lat,
              "long":GLOBAL.long,
              "doctor_condition":"offline",
              "type":"",
              "departments_filter":"",
              "hospital_filter":"",
              "price_range_min":"",
              "price_range_max":"",
              "is_favrouite":"",
              "specialty":this.props.navigation.state.params,




          }),
      }).then((response) => response.json())
          .then((responseJson) => {


    this.hideLoading()


              if (responseJson.status == true) {
                  this.setState({results:responseJson.doctor_list_s})
                  arrayholder = responseJson.doctor_list_s
              }else{
                  this.setState({results:[]})
                  arrayholder =[]
              }
          })
          .catch((error) => {
              console.error(error);
              this.hideLoading()
          });
    }


_handleStateChange = (state) => {
  this.getlog()

  this.setState({texts:''})


if (  GLOBAL.appply == 1){
    this.getApicall('')
}else{
  this.setState({department:[]})
  this.setState({speciality:[]})
  this.setState({hospital:[]})
  this.offline()



}

//         var values =  AsyncStorage.getItem('apply');
//         values.then((f)=> {
//
// alert(f)
//
//             if (f == 1){
//                 this.getApicall('')
//             }else {
//
//             }
//         })





    }

    getlog = ()=>{




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

                      if (this.state.selectedState == 1){
                        this.online()
                      }else{
                        this.offline()
                      }


                  }else{
                      this.setState({location:''})
                  }
              })
              .catch((error) => {
                  console.error(error);
                  this.hideLoading()
              });

      }

    componentDidMount(){
      this.setState({location:  GLOBAL.location})


        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }


    login = (s,item) => {

      if (this.state.selectedState == 1){
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s

        this.props.navigation.navigate('OnlineBooking')
      }else{
        GLOBAL.appointmentArray = item
     GLOBAL.speciality = s
     GLOBAL.price = item.normal_appointment_price
     GLOBAL.type = "5"
     GLOBAL.onlinetype = "normal"

     this.props.navigation.navigate('BookingAppointmentDetail')
      }
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item,speciality) => {
        GLOBAL.speciality = speciality
        GLOBAL.appointmentArray = item
            this.props.navigation.navigate('DoctorDetail')

    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _renderDepartmentss =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }
    _renderDepartments =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }


spec = (index) =>{

  if (index == 1){
    this.online()
  }else{
    this.offline()
  }
}


arrayselected = (item,indexs) =>{
  this.spec(indexs)
  this.setState({selectedState:indexs})
  var a = this.state.array
  for (var i = 0;i<this.state.array.length ;i ++){

      this.state.array[i].selected = ''
  }
  var index = a[indexs]
  if (index.selected == ""){
      index.selected = "Y"

  }else{
      index.selected = ""
  }
  this.state.array[indexs] = index
  this.setState({array:this.state.array})
}

arrays =   ({item,index}) => {
  var a = ''
  if (item.selected == 'Y'){
    a = '#D90000'
  }else{
    a = '#1E1F20'
  }

  return (
    <TouchableOpacity onPress={() => this.arrayselected(item,index)
    }>
      <View style = {{backgroundColor:'white',width:window.width/2,margin:1,marginTop:10,borderWidth:0.3,borderColor:'grey'}}>


          <Text style = {{color:a,fontFamily:GLOBAL.semi,margin:4,fontSize:14,alignSelf:'center'}}>
              {item.title}

          </Text>
          <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.regular,margin:4,marginTop:4,fontSize:12,alignSelf:'center',marginBottom:24}}>
              {item.sub}

          </Text>


      </View>
      </TouchableOpacity>




      )


}

    _renderDepartment =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




            )


    }

    _renderItems = ({item,index}) => {
        var speciality = item.speciality_detail_array


        const renderedButtons =  item.gallery.map((b, index) => {


          return(
            <View style = {{flexDirection:'row'}}>
            <Image style = {{width :60 ,height :60,margin:10,marginTop:17}}
                   source={{ uri: b.image }}/>
                   </View>


          )








          ;
        })

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item,speciality)
            }>
                <View style={{ flex: 1 ,marginLeft : 0,width:window.width , backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>







<View style = {{flexDirection:'row',width :'100%'}}>


                    <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10,marginTop:17}}
                           source={{ uri: item.image }}/>




                           <View>

    <View style = {{flexDirection:'row',width:window.width -80}}>
                    <Text style={{marginLeft : 5,fontSize : 14,color :'#1E1F20',fontFamily:GLOBAL.semi,width :'70%',marginTop:18}}>

                        {item.name}
                    </Text>

<View style = {{alignSelf:'flex-end',marginRight:20}}>
                    <View style = {{marginTop:18,flexDirection:'row'}}>
 {item.is_bookmark == "0" && (
   <TouchableOpacity onPress={()=>this.bookmark(item,index)}>
   <Image style = {{width :30 ,height :30,marginLeft:4,resizeMode:'contain'}}
          source={require('./like-un.png')}/>
          </TouchableOpacity>
 )}
 {item.is_bookmark == "1" && (
    <TouchableOpacity onPress={()=>this.bookmark(item,index)}>
   <Image style = {{width :30 ,height :30,marginLeft:4,resizeMode:'contain'}}
          source={require('./filled.png')}/>
            </TouchableOpacity>
 )}



                    </View>
                    <Text style={{marginLeft : 5,fontSize : 10,marginTop:8,color :'#83878E',fontFamily:GLOBAL.regular,}}>

                        {item.ratting} Ratings
                    </Text>

                    </View>

    </View>

                               <View style = {{flexDirection:'row'}}>
                               <Text style={{marginLeft : 5,fontSize : 12,color :'#83878E',height:'auto',fontFamily:GLOBAL.regular,width :'80%'}}>
                                   {speciality}
                               </Text>


                               </View>
                               <Text style={{marginLeft : 5,fontSize : 12,color :'#83878E',height:'auto',fontFamily:GLOBAL.regular,width :'70%'}}>
                                   {item.lat_long_address}
                               </Text>





    </View>

</View>

<View style = {{flexDirection:'row',marginLeft:10}}>
{renderedButtons}
</View>

<View style = {{alignSelf:'flex-end',marginRight:20}}>
{item.doctor_avail_status == 1 && (

    <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:60,textAlign:'center'}}>

        Available
    </Text>
)}
{item.doctor_avail_status == 0 && (

    <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>

        Offline
    </Text>
)}

{item.doctor_avail_status == 2 && (

    <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>

        Busy
    </Text>
)}
{item.can_book_doctor_free  != 0 &&(
    <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>
        Prime
    </Text>
)}


</View>

<Text style={{fontSize : 12,color :'#83878E',fontFamily:GLOBAL.regular,marginLeft:10}}>

    {item.experience} yrs exp
</Text>

<View style = {{flexDirection:'row',alignSelf:'flex-end',marginRight:30}}>

<Button
    style={{padding:7,marginTop:14,fontSize: 14,borderWidth:1,borderColor:'#D90000', color: '#D90000',width:78,height:33,fontFamily:GLOBAL.semi,borderRadius:12,marginBottom: 20}}
    styleDisabled={{color: 'red'}}
    onPress={() => this.call()}>
    Call
</Button>
                    <Button
                        style={{padding:7,marginTop:14,fontSize: 14, color: 'white',backgroundColor:'#D90000',width:78,height:33,marginLeft:15,fontFamily:GLOBAL.semi,borderRadius:12,marginBottom: 20}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login(speciality,item)}>
                        Consult
                    </Button>


                    </View>


                    <View style = {{margin:10,marginTop:-5,width:window.width-20,height:1,backgroundColor:'#EAEBEC'}}>
                    </View>

                    <View style = {{flexDirection:'row',margin:10}}>
                    <Image style = {{width :15 ,height :15,marginLeft:4,resizeMode:'contain',marginTop:3}}
                           source={require('./comment.png')}/>


{this.state.selectedState == 1 && (
  <View>


  </View>

)}
                    {item.can_book_doctor_free  == 0 &&(



                                                       <Text style={{fontSize : 12,color :'#D90000',fontFamily:GLOBAL.semi,marginLeft:10}}>

                                                           Consult online for ₹ {item.online_consult_chat_price} onwards
                                                       </Text>
                                                   )
                                                   }

                                                   {item.can_book_doctor_free  != 0 &&(
                                                       <Text style={{fontSize : 12,color :'#D90000',fontFamily:GLOBAL.semi,marginLeft:10}}>

                                                           Consult online for ₹ 0 onwards
                                                       </Text>
                                                   )
                                                   }

                                                   </View>

                </View>





            </TouchableOpacity>
        )
    }


     SearchFilterFunction(text){
  const newData = arrayholder.filter(function(item){
         const itemData = item.name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         results: newData,
         texts: text


     })

 }

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

                    <View style = {{margin :10,width:window.width - 20 ,height:45,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./search.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100, height:45}}
                                   placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                   value = {this.state.texts}

                                   onChangeText={(texts) => this.SearchFilterFunction(texts)}
                                   placeholder={"Search"}/>



{/*                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./speech.png')}/>
*/}

                    </View>




                    <View style = {{width:window.width,height:40,borderWidth:0.3,borderColor:'grey',justifyContent:'space-between',marginTop:8}}>

<View style = {{flexDirection:'row',margin:4}}>
<Image style = {{width :25 ,height: 25,alignSelf:'center',resizeMode: 'contain',marginLeft:10,marginTop:5}}
       source={require('./location.png')}/>
       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,marginTop:8,width:200,fontSize:13,fontWeight:'bold'}} numberOfLines = {1}>
        {this.state.location}
       </Text>
       <Button
           style={{marginLeft:28,padding:2,marginTop:4,fontSize: 14,borderWidth:1,borderColor:'#D90000', color: '#D90000',width:78,height:24,fontFamily:GLOBAL.semi,borderRadius:12}}
           styleDisabled={{color: 'red'}}
           onPress={() => this.props.navigation.navigate('Location')}>
           Change
       </Button>

</View>

          </View>

                    <FlatList style= {{flexGrow:0,margin:1}}
                              data={this.state.array}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this.arrays}
                    />







                    <FlatList style= {{flexGrow:0,margin:8,marginLeft:0,height:window.height - 160}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />





                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
                            this.setModalVisible(!this.state.modalVisible)
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            alignItems: 'center'}}>
                            <View style={{
                                width: 300,backgroundColor: 'white',
                                height: 300}}>
                                <View style={{width: '95%', margin: 10}}>
                                    <Text style={{fontSize: 30, color:'black', fontFamily: GLOBAL.regular, borderBottomWidth: 1, borderBottomColor: '#bfbfbf'}}>Sort By</Text>

                                    <View style={{marginTop: 10, flexDirection: 'column'}}>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'a to z')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: GLOBAL.regular}}>A to Z-</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'z to a')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: GLOBAL.regular}}>Z to A-</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'high to low')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: GLOBAL.regular}}>Price (High to Low)</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'low to high')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: GLOBAL.regular}}>Price (Low to High)</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'most liked')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: GLOBAL.regular}}>Most Liked</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                </View>


                            </View>

                        </View>
                    </Modal>





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
