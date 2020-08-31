import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,
ImageBackground,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
import Loader from './Loader.js';
import Button from 'react-native-button';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
const window = Dimensions.get('window');

var arrayholder=[];
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class LabDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            visible:false,
            department :[],
            description:'',
            speciality :[],
            hospital:[],
            price:[],
            results: [],
            images: [
                {
                    days :'10.00',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.23',
                    selected:'',
                },
                {
                    days :'10.33',
                    selected:'',
                },
                {
                    days :'10.56',
                    selected:'',
                },
                {
                    days :'10.66',
                    selected:'',
                },
            ]

        };

    }

    componentWillUnmount() {

    }



    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        if (typeof get !== 'undefined') {
            this.getApicall(get)
        }

        this.setState({modalVisible: visible});
    }


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'LAB TEST',
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



    _handleStateChange = (state) => {
      this.showLoading()


            const url =  GLOBAL.BASE_URL  + 'lab_test_list'

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





                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  this.hideLoading()

               //     alert(JSON.stringify(responseJson))


                    if (responseJson.status == true) {
                        this.setState({results:responseJson.list})
                        arrayholder = responseJson.list

                    }else{
                        this.setState({results:[]})
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });





    }

    componentDidMount(){

        this.props.navigation.addListener('willFocus',this._handleStateChange);

        //   this._handlePressLogin()
    }


    login = (s,item) => {
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s
        GLOBAL.price = item.normal_appointment_price
        GLOBAL.type = "5"
        GLOBAL.onlinetype = "normal"

        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = () => {
      this.showLoading()


      const url = GLOBAL.BASE_URL +  'count_cart'

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
              "type":'lab'




          }),
      }).then((response) => response.json())
          .then((responseJson) => {
            this.hideLoading()

              //    alert(JSON.stringify(responseJson))

             GLOBAL.counter = responseJson.count
             GLOBAL.labid = this.props.navigation.state.params.id

             GLOBAL.lab = this.props.navigation.state.params
             this.props.navigation.navigate('LabMember')
              if (responseJson.status == true) {

              }
          })
          .catch((error) => {
              console.error(error);
              this.hideLoading()

          });




    }

    desc = (itemData) => {

       // this.setState({description:itemData.item.description})

        Alert.alert(
            itemData.item.test_name,
            itemData.item.description,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
        );

    }









    render() {
      var k ;

        k = require('./packagesw.png')

var item = this.props.navigation.state.params
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


  <KeyboardAwareScrollView  style = {{height:window.height - 200}}>
                <View style={{  marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10,fontWeight:'bold'}}>

                <ImageBackground  source={k}
                                             style  = {{width:'100%', height:200,alignSelf:'center',marginLeft:4,resizeMode:'contain',marginTop:0,borderRadius:20
                                             }}>
<View style = {{flexDirection:'row',marginTop:160}}>
             <Text  style = {{fontFamily:GLOBAL.semi,color:'white',fontSize:14,marginLeft:4,width:window.width - 100,fontWeight:'bold'}}>
                {item.test_name}

             </Text>









                    <View style = {{marginLeft:5,width:'100%'}}>
                        {item.discount_price == "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'white', height:'auto',fontFamily:GLOBAL.semi,width :'60%',}}>

                                ₹{item.sell_price} /-
                            </Text>
                        )}
                        {item.discount_price != "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'white', height:'auto',fontFamily:GLOBAL.semi,width :'60%',textDecorationLine: 'line-through',}}>

                                ₹{item.sell_price}/-
                            </Text>
                        )}
                        {item.discount_price != "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'white', height:'auto',fontFamily:GLOBAL.semi,width :'50%'}}>

                                ₹{item.discount_price}/-
                            </Text>
                        )}
                        {item.discount_price == "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'white', height:'auto',fontFamily:GLOBAL.semi,width :'50%'}}>


                            </Text>
                        )}



                    </View>
                    </View>

</ImageBackground>
                    <Text  style = {{fontFamily:GLOBAL.semi,color:'#1E1F20',fontSize:14,marginLeft:4,width:window.width - 20,marginTop:10}}>
                       {item.test_name}

                    </Text>

                    <Text  style = {{fontFamily:GLOBAL.regular,color:'#83878E',fontSize:14,marginLeft:4,width:window.width - 20,marginTop:10}}>
                       {item.description}

                    </Text>

{/*
                    <TouchableOpacity onPress={() => this.desc(itemData)
                    }>
                    <Image style = {{width :30 ,height: 30,resizeMode: 'contain',marginRight:13,marginLeft:window.width - 70,marginBottom:8}}
                           source={require('./info.png')}/>


                    </TouchableOpacity>

{/*                    <Text  style = {{fontFamily:"Poppins-SemiBold",color:'#7BAAED',fontSize:16,textAlign:'right',width:window.width- 50}}>
                        ADD CART

                    </Text>
*/}

                </View>




                        {/*                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./speech.png')}/>
*/}



</KeyboardAwareScrollView>
<Button
    style={{padding:12,marginTop:0,fontSize: 18, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
    styleDisabled={{color: 'red'}}
    onPress={() => this.selectedFirst()}>
 BOOK NOW
</Button>

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

    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
