import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,
    Platform,
    Linking,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage, ScrollView
} from 'react-native';
import Button from 'react-native-button';
import HTML from 'react-native-render-html';
const window = Dimensions.get('window');
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};
const { width, height } = Dimensions.get('window');

let customDatesStyles = [];
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// var lat = parseFloat(position.coords.latitude)
// var long = parseFloat(position.coords.longitude)

export default class FullDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            results: [],
            practice:[],
            remark:'',
            firstService:'',
            secondService:'',noloc:0,
            timing :'',
            timings :'',        marker :[1],
 initialPosition: {
latitude: 0,
longitude: 0,
latitudeDelta: LATITUDE_DELTA,
longitudeDelta: LONGITUDE_DELTA,
},

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
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {

    }

    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        this.setState({modalVisible: visible});
    }


    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

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
        console.log(GLOBAL.appointmentArray.id+'log')
        const url =   GLOBAL.BASE_URL +  'full_dr_detail'

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
                "id":GLOBAL.appointmentArray.id,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {



                if (responseJson.status == true) {
this.setState({remark:responseJson.doctor_detail.remarks})
                    if(responseJson.doctor_detail.lat == "" || responseJson.doctor_detail.lon ==""){
                        this.setState({noloc: 1})
                    }else{

      var lat = parseFloat(responseJson.doctor_detail.lat)
      var long = parseFloat(responseJson.doctor_detail.lon)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({noloc:0})
      this.setState({initialPosition: initialRegion})
        this.mapView.animateToRegion(initialRegion, 1);

                    }

                     this.setState({results:responseJson.doctor_detail})
                     this.setState({practice:responseJson.doctor_detail.practices_at})
                    this.setState({firstService:responseJson.doctor_detail.services[0]})
                    this.setState({secondService:responseJson.doctor_detail.services[1]})

                    for (var i = 0 ; i< responseJson.doctor_detail.normal_timing.length;i++){
                        if (responseJson.doctor_detail.normal_timing[i].flag == 1){
                            var a  =  ` ${responseJson.doctor_detail.normal_timing[i].start1} - ${responseJson.doctor_detail.normal_timing[i].end1}`;
                            var b  =  ` ${responseJson.doctor_detail.normal_timing[i].start2} - ${responseJson.doctor_detail.normal_timing[i].end2}`;
                           this.setState({timings:b})
                        }
                    }


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
  _onMapReady = () => this.setState({marginBottom: 0})


    login = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${this.state.results.lat},${this.state.results.lon}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }


    render() {

                console.log(this.state.initialPosition)

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
            <ScrollView style={styles.container} >
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dplus.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                            <Text style={{fontSize:15, color:'black'}}>Experience</Text>
                            <Text style={{fontSize:15, color:'grey'}}>{GLOBAL.appointmentArray.experience} yrs</Text>
                        </View>


                    </View>
                </View>
                <View style={{width:window.width-20, height:1, backgroundColor:'#bfbfbf', marginLeft:10,marginRight:10,marginTop:5}}></View>




<View style = {{marginLeft:10,width:window.width - 20}}>
  <HTML html={this.state.remark}  />

</View>
                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dhouse.png')}/>
                    <View style={{flexDirection:'column', marginLeft:30}}>

                        <Text style={{fontSize:15, color:'grey', width:'40%', marginBottom:5}}>{this.state.results.lat_long_address}</Text>
                        {this.state.noloc == 1 &&(
                        <Text style={{fontSize:15, color:'black', marginTop:5}}>No location added!</Text>

                            )}


                    {this.state.noloc == 0 &&(

                <MapView
                    clusterColor = '#77869E'
                    clusterTextColor = 'white'
                    clusterBorderColor = '#77869E'
                    clusterBorderWidth = {4}
                    showsUserLocation = {true}
                    showsMyLocationButton = {false}
                    pitchEnabled={true} rotateEnabled={true} zoomEnabled={true} scrollEnabled={true}
                    onMapReady={this._onMapReady}
                    ref = {(ref)=>this.mapView=ref}
                    region = {this.state.initialPosition}


                    style={{ width:300, height:100, marginBottom:this.state.marginBottom }}
                >

                    {this.state.marker.map(marker => (

                        <Marker coordinate={this.state.initialPosition}
                        title={'Hi User!'}
                        description={'You are here!'}
                        />
                    ))}



                </MapView>

                        )}



                    </View>

                </View>

                <Button
                    style={{padding:4,marginTop:40,fontSize: 20, color: 'white',backgroundColor:'#7BAAED',alignSelf:'center',width:'80%',height:40,fontFamily:'Poppins-Medium',borderRadius:4,marginBottom:20}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.login()}>
                    GET DIRECTION
                </Button>


            </ScrollView>
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
