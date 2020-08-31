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
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class LabHistory extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        FlatListItems: [
            {"key": "#1",
                "name": "Appointment with Dr.priya Dua(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinc & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "http://venushospital.in/wp-content/uploads/2019/07/noopurchhasatiya-236x300.png",
                "time": "26 Aug 2019, 8:00 AM",
            },
            {"key": "#2",
                "name": "Appointment with Dr.Rinki Mehta(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinic & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "http://venushospital.in/wp-content/uploads/2019/08/Gulfisha_Ahmed-229x300.png",
                "time": "26 Aug 2019, 8:00 AM",
            },
            {"key": "#3",
                "name": "Appointment with Dr.Payal Khatri(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinc & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "https://letsgetsciencey.com/wp-content/uploads/2019/03/wright_jane.jpg",
                "time": "26 Aug 2019, 8:00 AM",
            },
            {"key": "#4",
                "name": "Appointment with Dr.Riyanshi(PT)",
                "address": "Dermatologist, Skin ethics Skin Clinc & Dermatosurgery Center",
                "Backchodi": "Branch famous hai inka",
                "imageUrl": "http://www.tessgerritsen.com/wp-content/files/Tess-Gerritsen.jpg",
                "time": "26 Aug 2019, 8:00 AM",
            },


        ]
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'LAB BOOKING',
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
      this.showLoading()


        const url = GLOBAL.BASE_URL + 'patient_lab_history'

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


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.hideLoading()
              console.log(responseJson)

//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results: responseJson.list})


                } else {
                    this.setState({results: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    selectedFirst = (item) => {
     GLOBAL.labdetail = item
        this.props.navigation.navigate('LabHistoryDetail')

    }

    renderItem=({item}) => {
        var s = moment(item.booking_date).format('DD MMMM YY')
        var ss = moment(item.added_on).format('DD MMMM YY')
        return(
            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>
            <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop:15,marginLeft:15,marginRight:15, height: 'auto',borderRadius :6,width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2}}>
                        <View style={{flexDirection: 'column', marginTop:15,marginLeft:5}}>
                        <Text style={{color:'#D90000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8}}>Order {item.booking_status}</Text>
                      <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                      <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>Booking ID</Text>
                            <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{item.booking_id}</Text>


                            </View>



                            {item.lab_assign_id !="0" && (
                                <View style = {{flexDirection:'row',width:'100%'}}>

                                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>Assign Lab </Text>
                                      <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{item.lab_name}</Text>


                                      </View>

                                </View>
                            )}

                            <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                            <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>Collection Date</Text>
                                  <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{s}</Text>


                                  </View>


                                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                  <Text style={{color:'#83878E', fontSize:12,fontFamily:GLOBAL.semi,marginTop:8}}>Collection Time</Text>
                                        <Text style={{color:'#000000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:10}}>{item.booking_time}</Text>


                                        </View>
                                      

                            <Text style={{color:'#D90000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8}}>₹{item.order_amount}</Text>
                            </View>

                        </View>
</TouchableOpacity>

        );
    }

    _keyExtractor=(item, index)=>item.key;



    render() {


        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <Loader >
                    </Loader>
                </View>
            )
        }
        return (
            <View style={{width : Dimensions.get('window').width,flex:1,backgroundColor:'#F2F5F7'}}>
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

        backgroundColor :'#f1f1f1',
        flex:1
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
