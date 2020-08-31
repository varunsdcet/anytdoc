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

    AsyncStorage, ScrollView
} from 'react-native';
import Stars from 'react-native-stars';
import Button from 'react-native-button';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            results: [],
            speciality:[],
            practice:[],
            avg_rat:0,
            rate_type:'',

        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    renderRowItem1 = (itemData) => {
   var ra = itemData.item.rating
   var ras = parseInt(ra)
     var idex;
     if (itemData.index % 3 == 0){
         idex = '#7BAAED'
     }else if  (itemData.index % 3 == 1){
         idex = '#F2C1D7'
     }else{
         idex = '#8E9198'
     }
     const x = itemData.item.review
     return (

         <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20, shadowColor: '#000',
         }}>

<View style = {{flexDirection: 'row',justifyContent:'space-between'}}>

 <View style = {{flexDirection:'row'}}>
     <View style = {{backgroundColor:idex,width:40,height:40,borderRadius:20,marginTop: 10}}>
         <Text style={{fontFamily:GLOBAL.medium,fontSize:26,color:'white',margin:7,alignSelf:'center'}}>
             {x.substring(0, 1)}

         </Text>

     </View>

     <View>

 <Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginLeft:12,marginTop:18}}>
     {itemData.item.review}

 </Text>

<View style = {{marginLeft:12}}>
         <Stars
             display={ras}
             spacing={2}
             count={5}
             starSize={12}

             backingColor='cornsilk'
             fullStar= {require('./star.png')}
             emptyStar= {require('./star.png')}/>



</View>






     </View>


 </View>
 <Text style={{fontFamily:GLOBAL.medium,fontSize:12,marginRight:12,marginTop:18,color:'#8E9198'}}>
   {itemData.item.date}

 </Text>

</View>



             <Text style={{fontFamily:GLOBAL.medium,fontSize:12,marginLeft:50,marginTop:8,width:window.width - 118}}>
               {itemData.item.review}

             </Text>







         </View>

     )
 }
    componentWillUnmount() {

    }

    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        this.setState({modalVisible: visible});
    }



    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            title: 'BOOKING APPOINTMENT',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#7BAAED',
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
    _renderItems = ({item,index}) => {


        return (
            <View>
                <Text style={{fontSize:15, color:'#grey'}}>{item.hospital_name}</Text>
                <Text style={{fontSize:15, color:'#grey'}}>{item.hospital_address}</Text>
            </View>


        )
    }



    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){


      const url = GLOBAL.BASE_URL +  'list_rating'

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                user_id:GLOBAL.user_id,
                                doctor_id :GLOBAL.appointmentArray.id



                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {







                                if (responseJson.status == true) {
         this.setState({speciality:responseJson.list})
      //video_timing

                                }else {

                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
    }



    login = () => {
        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }


    render() {


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
           <View style = {{flex:1}}>


           <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 10}}
                                 data={this.state.speciality}

                                 keyExtractor={this._keyExtractor}
                                 renderItem={this.renderRowItem1}
                                 extraData={this.state}
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
        fontFamily:'Poppins-Regular',


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
