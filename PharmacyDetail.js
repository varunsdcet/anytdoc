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

export default class PharmacyDetail extends Component {
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
            rescdate:GLOBAL.appointment_details.appointment_date,
            resctime:GLOBAL.appointment_details.appointment_time,
            selected: false,
            data: [],
        }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'PharmacyDetail',
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


    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
        this.setState({rescdate: s})
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


        // if(GLOBAL.date=='' ||  GLOBAL.time==''){
        //     alert('Please select date and time')
        //     return
        // }

//        this.props.navigation.navigate('Payment')
        var dataresc= GLOBAL.appointment_details
//        alert(dataresc.module)
        this.showLoading()
            const url = GLOBAL.BASE_URL + 'reshedule_booking'

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
                "booking_id": dataresc.booking_id,
                "booking_date":this.state.rescdate,
                "booking_time":this.state.resctime,
                "module":dataresc.module

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//               alert(JSON.stringify(responseJson))
                this.hideLoading()

                if (responseJson.status == true) {
                    this.props.navigation.goBack()
                    alert('Appointment has been resceduled successfully!')

                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }



    selectedFirst = (indexs) => {
        var a = this.state.time
        for (var i = 0;i<this.state.time.length ;i ++){

            this.state.time[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
            this.setState({resctime: index.time})
        }else{
            index.is_selected = ""
        }
        this.state.time[indexs] = index
        this.setState({time:this.state.time})
    }



    _renderItems = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:'auto',borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12, margin:5}}>
                            {item.time}

                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:'auto',borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:16, margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }



calculateDay(date){




        if (GLOBAL.appointment_details.module == "4" || GLOBAL.appointment_details.module == "5"){


            const url = GLOBAL.BASE_URL + 'common_time_slots_comm'

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

                    "select_date": date,
                    "for_time":GLOBAL.appointment_details.online_type,
                    "id":GLOBAL.appointment_details.doctor_id,
                    "user_id":GLOBAL.user_id


                }),
            }).then((response) => response.json())
                .then((responseJson) => {

              //  alert(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                        this.setState({time: responseJson.slot})


                    } else {
                        this.setState({time: []})
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });




        }else {

            const url = GLOBAL.BASE_URL + 'common_time'

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

                    "select_date": date,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {

//                alert(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                        this.setState({time: responseJson.times})


                    } else {
                        this.setState({time: []})
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
        }

    }
    _renderItemsd  = ({item,index}) => {


        return (



            <View style = {{backgroundColor:'transparent',margin:1}}>
                <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                       source={{uri:item}}/>


            </View>



        )

    }

    render() {

        var item = GLOBAL.pharacy
    console.log(item);

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

                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>


                    <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,
                        flex: 1 ,marginTop:15,marginLeft:15,marginBottom:10,
                        marginRight:15, height: 'auto',borderRadius :6,
                        width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                        shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2, }}>











                                <View style={{flexDirection: 'column', marginTop:5,marginLeft:5,width:'100%',marginBottom:10}}>




                                    {item.status == 0 && (
                                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                        <View style = {{flexDirection:'row'}}>
          <Text style={{color:'#1E1F20', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>Order Id :</Text>
            <Text style={{color:'#747A8D', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>{item.id}</Text>
                                        </View>

                                        <Text style={{color:'#19AB2B', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>Pending</Text>
                                        </View>
                                            )}

                                    {item.status == 2 && (
                                      <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                      <View style = {{flexDirection:'row'}}>
        <Text style={{color:'#1E1F20', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>Order Id :</Text>
          <Text style={{color:'#747A8D', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>{item.id}</Text>
                                      </View>

                                      <Text style={{color:'#19AB2B', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>Cancelled By User</Text>
                                      </View>
                                    )}


                                    {item.status == 3 && (
                                      <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                      <View style = {{flexDirection:'row'}}>
        <Text style={{color:'#1E1F20', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>Order Id :</Text>
          <Text style={{color:'#747A8D', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>{item.id}</Text>
                                      </View>

                                      <Text style={{color:'#19AB2B', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>Cancelled By Admin</Text>
                                      </View>
                                    )}

                                    {item.status == 1 && (

                                      <View >
                                      <View style = {{flexDirection:'row'}}>
                                    <Text style={{color:'#1E1F20', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>Order Id :</Text>
                                    <Text style={{color:'#747A8D', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8}}>{item.id}</Text>
                                      </View>




                                      <Text style={{color:'#1E1F20', fontSize:14,fontFamily:GLOBAL.semi,marginTop:0}}>{item.pharmacy_detail}</Text>
                                      <Text style={{color:'#1E1F20', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8}}>₹{item.amount}</Text>
                                                                        <Text style={{color:'#1E1F20', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8}}>{item.added_on}</Text>
    </View>
                                    )}





                                </View>












                    </View>

                    <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,
                        flex: 1 ,marginTop:5,marginLeft:15,marginBottom:10,
                        marginRight:15, height: 'auto',borderRadius :6,
                        width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                        shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2, }}>

                                    <Text style={{color:'#1E1F20', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8,marginLeft:4}}>Shipping Address:</Text>
                                        <Text style={{color:'#747A8D', fontSize:13,fontFamily:GLOBAL.semi,marginTop:8,marginBottom:10,marginLeft:4}}>{item.address},{item.area},{item.city_state},{item.pincode}</Text>
                        </View>
                        <FlatList style= {{flexGrow:0,backgroundColor:'transparent'}}
                                  horizontal = {true}
                                  data={item.images}
                                  numColumns={1}
                                  horizontal={true}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItemsd}
                        />
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

})
