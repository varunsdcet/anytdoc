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
const window = Dimensions.get('window');
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class BookingDetailFinal extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            company: '',
            loading: false,
            visible: false,
            time:[],
            problem:'',
            morning:[],
            evening:[],
            afternoon:[],
            night:[],
            ismorning:false,
            isafternoon:false,
            isEvening:false,
            isNight:false,

            selected: false,
            data: [],
            images: [
                {
                    days :'10.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
            ]
        }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING',
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

    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
//        alert(GLOBAL.date)
        this.calculateDay(s)
    }
    componentDidMount(){


        let startDate = moment();
        for (let i=0; i<700; i++) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.dateNameStyle,
                dateNumberStyle: styles.dateNumberStyle,

                // Random color...
                dateContainerStyle: {shadowOpacity: 1.0,
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
            });
        }
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

        this.calculateDay(s)

    }


login = () => {
        if(GLOBAL.date=='' ||  GLOBAL.time==''){
            alert('Please select date and time')
            return
        }
  GLOBAL.problem = this.state.problem
        if(GLOBAL.appointmentArray.can_book_doctor_free  != 0) {

            const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                    "for": "4",
                    "module": GLOBAL.onlinetype,
                    "doctor_id": GLOBAL.appointmentArray.id,
                    "booking_for": "self",
                    "member_id": '',
                    "problem":GLOBAL.problem,
                    "booking_time": GLOBAL.time,
                    "booking_date": GLOBAL.date,
                    "name": GLOBAL.onlinename,
                    "gender": GLOBAL.onlinegender,
                    "dob": GLOBAL.onlinedob,
                    "address": GLOBAL.onlineaddress,
                    "area": GLOBAL.onlinearea,
                    "pincode": GLOBAL.onlinecity,
                    "city_state": GLOBAL.onlinecity,
                    "coupan_code": 0,
                    "coupan_code_id": 0,
                    "total_amount": 0,
                    "discount_amount": 0,
                    "images": GLOBAL.listofimages,
                    "wallet_amount": '',
                    "referral_amount": '',
                    "is_package":"1"


                }),
            }).then((response) => response.json())
                .then((responseJson) => {


                    // alert(JSON.stringify(responseJson))

                    //  this.rajorPay()
                    if (responseJson.status == true) {


                        this.props.navigation.navigate('Thankyou')
                        //   this.props.navigation.navigate('Thankyou')

                    } else {


                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
        }else {


            this.props.navigation.navigate('Payment')
        }
    }


    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {
        var a = this.state.morning
        for (var i = 0;i<this.state.morning.length ;i ++){

            this.state.morning[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.morning[indexs] = index
        this.setState({morning:this.state.morning})
    }

    selectedFirsts = (indexs) => {
        var a = this.state.afternoon
        for (var i = 0;i<this.state.afternoon.length ;i ++){

            this.state.afternoon[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.afternoon[indexs] = index
        this.setState({afternoon:this.state.afternoon})
    }

    selectedFirstss = (indexs) => {
        var a = this.state.evening
        for (var i = 0;i<this.state.evening.length ;i ++){

            this.state.evening[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.evening[indexs] = index
        this.setState({evening:this.state.evening})
    }

    selectedFirstsss = (indexs) => {
        var a = this.state.night
        for (var i = 0;i<this.state.night.length ;i ++){

            this.state.night[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.night[indexs] = index
        this.setState({night:this.state.night})
    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }





    calculateDay(date){


        const url = GLOBAL.BASE_URL +  'common_time_slots_comm'

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

                "select_date":date,
                "for_time":GLOBAL.onlinetype,
                "id":GLOBAL.appointmentArray.id,
                "user_id":GLOBAL.user_id



            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                    this.setState({time:responseJson.slot})
                    this.setState({morning:responseJson.morning_slot})
                      this.setState({evening:responseJson.evening_slot})
                        this.setState({afternoon:responseJson.afternoon_slot})
                          this.setState({night:responseJson.night_slot})

                }else{
                    this.setState({time: []})
                    this.setState({morning:[]})
                      this.setState({evening:[]})
                        this.setState({afternoon:[]})
                          this.setState({night:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    showLoading() {
        this.setState({loading: true})
    }

    apicall () {
        const url = 'https://anytimedoc.in/android_ios_sc/api/master_prices'

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
                "type":"planned_visit"





            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {

                    GLOBAL.price = responseJson.price

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    showMorning = () =>{
      this.setState({ismorning:!this.state.ismorning})
            this.setState({isafternoon:false})
            this.setState({isEvening:false})
            this.setState({isNight:false})

    }




    showAfternoon= () =>{
      // this.setState({ismorning:false})
         this.setState({isafternoon:!this.state.isafternoon})
         this.setState({ismorning:false})
         this.setState({isEvening:false})
         this.setState({isNight:false})
      //     this.setState({isEvening:false})
      //       this.setState({isNight::false})
    }

    showEvening = () =>{
      // this.setState({ismorning:false})
      //   this.setState({isafternoon:false})
           this.setState({isEvening:!this.state.isEvening})
           this.setState({ismorning:false})
           this.setState({isafternoon:false})
           this.setState({isNight:false})
      //       this.setState({isNight::false})
    }

    showNight = () =>{
       this.setState({isNight:!this.state.isNight})
       this.setState({ismorning:false})
       this.setState({isafternoon:false})
       this.setState({isEvening:false})
      // this.setState({ismorning:false})
      //   this.setState({isafternoon:false})
      //     this.setState({isEvening:false})

    }
    _renderItemss = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirsts(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }
    _renderItems = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }
    _renderItemsss = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirstss(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }
    _renderItemssss = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirstsss(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }

    render() {
    let { problem } = this.state;
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
    let { name } = this.state;
     let { dob } = this.state;
     let { address } = this.state;
     let { area } = this.state;
     let { city } = this.state;

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


                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#000000', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80,fontWeight:'bold'}}>

                        Problem
                    </Text>
                    <View style = {{marginLeft:5,width:window.width - 10}}>

                    <TextField
                        label= 'Write a Problem'
                        value={problem}
                        onChangeText={ (problem) => this.setState({ problem }) }
                        tintColor = {'#D90000'}
                        multiline = {true}
                    />
                    </View>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 16,color :'#707070', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80,fontWeight:'bold'}}>

                        Select Date
                    </Text>

                    <CalendarStrip

                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#D90000'}}
                        style={{height:120, paddingTop: 15}}
                        calendarHeaderStyle={{color: 'black'}}
                        calendarColor={'white'}
                        highlightDateNameStyle={{color:'white'}}
                        highlightDateNumberStyle  ={{color:'white'}}

                        iconContainer={{flex: 0.1}}
                        onDateSelected={(date)=> this.dates(date)}
                    />

                    {this.state.morning.length != 0 && (
                      <View style = {{marginTop:10}}>
                      <TouchableOpacity onPress={() => this.showMorning()
                      }>
                      <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                      <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                      source={require('./sun.png')}/>
                      <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                          Select Morning Slot
                      </Text>

                      </View>
                      </TouchableOpacity>

                    {this.state.ismorning == true && (
                      <FlatList style= {{flexGrow:0,margin:8}}
                                data={this.state.morning}
                                numColumns={4}

                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={this._renderItems}
                      />
                    )}

                      </View>

                    )}



                    {this.state.afternoon.length != 0 && (
                      <View style = {{marginTop:10}}>
                      <TouchableOpacity onPress={() => this.showAfternoon()
                      }>
                      <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                      <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                      source={require('./sun.png')}/>
                      <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                          Select Afternoon Slot
                      </Text>

                      </View>
                      </TouchableOpacity>

                    {this.state.isafternoon == true && (
                      <FlatList style= {{flexGrow:0,margin:8}}
                                data={this.state.afternoon}
                                numColumns={4}

                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={this._renderItemss}
                      />
                    )}

                      </View>

                    )}

                    {this.state.evening.length != 0 && (
                      <View style = {{marginTop:10}}>
                      <TouchableOpacity onPress={() => this.showEvening()
                      }>
                      <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                      <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                      source={require('./moon.png')}/>
                      <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                          Select Evening Slot
                      </Text>

                      </View>
                      </TouchableOpacity>

                    {this.state.isEvening == true && (
                      <FlatList style= {{flexGrow:0,margin:8}}
                                data={this.state.evening}
                                numColumns={4}

                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={this._renderItemsss}
                      />
                    )}

                      </View>

                    )}


                    {this.state.night.length != 0 && (
                      <View style = {{marginTop:10}}>
                      <TouchableOpacity onPress={() => this.showNight()
                      }>
                      <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                      <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                      source={require('./moon.png')}/>
                      <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                          Select Night Slot
                      </Text>

                      </View>
                      </TouchableOpacity>

                    {this.state.isNight == true && (
                      <FlatList style= {{flexGrow:0,margin:8}}
                                data={this.state.night}
                                numColumns={4}

                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={this._renderItemssss}
                      />
                    )}

                      </View>

                    )}

                    <Button
                        style={{padding:7,marginTop:'20%',fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                        PROCEED
                    </Button>







</KeyboardAwareScrollView>

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
        color : '#D90000',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#D90000',
        textDecorationLine: 'underline',



    } ,
})
