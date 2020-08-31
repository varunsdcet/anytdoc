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

    ActivityIndicator,TouchableOpacity,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import Loader from './Loader.js';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class PharmacyOrder extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,results:[],
        visible:false,
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'PHARMACY ORDER',
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
        this.loadAppointments()
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }

    _handleStateChange = state => {

        this.loadAppointments()
    };

    loadAppointments(){
      this.showLoading()
        const url = GLOBAL.BASE_URL + 'list_pharmacy_history'

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
              console.log(responseJson)

this.hideLoading()

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


    confirmCancel=(item, index)=>{
        this.showLoading()
        const url = GLOBAL.BASE_URL + 'cancel_pharmacy_booking'

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
                "booking_id": item.id,
                "user_id":GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    alert('Order cancelled successfully!')
                   this.props.navigation.goBack()


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
        alert(JSON.stringify(item))
        GLOBAL.appointment_details = item
        this.props.navigation.navigate('AppointmentResc')
    }

        onPressCancels=(item, index)=>{
          GLOBAL.pharacy = item
          this.props.navigation.navigate('PharmacyDetail')
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


    openDetail=(item)=>{

        GLOBAL.appointment_details = item
        this.props.navigation.navigate('AppointmentDetail')
    }

    renderItem=({item, index}) => {
        return(


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,
                    flex: 1 ,marginTop:15,marginLeft:15,marginBottom:10,
                    marginRight:15, height: 'auto',borderRadius :6,
                    width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2, }}>











                            <View style={{flexDirection: 'column', marginTop:5,marginLeft:5,width:'100%'}}>




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



                                <View style={{flexDirection:'row',marginTop:15,marginBottom:15,justifyContent:'space-between'}}>



                                    {item.status == 0 && (
                                        <Button style={{fontSize:14,color:'#1E1F20',borderWidth:1,borderColor:'#FF0000',fontFamily:GLOBAL.semi,width:100,borderRadius:4,height:30,paddingTop:5}}
                                                containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:1}}
                                                onPress={()=> this.onPressCancel(item, index)}>
                                            Cancel
                                        </Button>
                                    )}


                                    <Button style={{fontSize:14,color:'#1E1F20',borderWidth:1,borderColor:'#FF0000',fontFamily:GLOBAL.semi,width:100,borderRadius:4,height:30,marginRight:12,paddingTop:5}}
                                            containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:1}}
                                            onPress={()=> this.onPressCancels(item, index)}>
                                        See Detail
                                    </Button>
                                </View>

                            </View>












                </View>

        );
    }

    _keyExtractor=(item, index)=>item.key;



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
