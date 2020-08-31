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
    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';

const window = Dimensions.get('window');

var arrayholder=[];
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};
const { width, height } = Dimensions.get('window');
import Geolocation from '@react-native-community/geolocation';
import Loader from './Loader.js';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';


const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
let customDatesStyles = [];


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class MyMAP extends Component {
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
            results: [],markers:[],
            marginBottom:1,
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
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
            title: 'Hospital Admissions',
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

    _onMapReady = () => this.setState({marginBottom: 0})


    _handleStateChange = (state) => {
        Geolocation.getCurrentPosition((position) => {
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)

                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }

                this.setState({initialPosition: initialRegion})

            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000,});
            this.showLoading()

        const url = GLOBAL.BASE_URL +  'insurance_for_hospital'

        fetch(url, {
            method: 'get',
                sslPinning: {
                certs: ['anytimedoc_in']
                  },}).then((response) => response.json())
            .then((responseJson) => {

this.hideLoading()

                if (responseJson.status == true) {
                    this.setState({results:responseJson.hospital})
                    this.setState({path:responseJson.hosptal_path})
                    this.setState({results:responseJson.hospital})
                    // alert(JSON.stringify(this.state.results))
                    var rece = responseJson.list
                    // var allmarkers = responseJson.list.length
                    // var markarray = [allmarkers]

                    this.setState({markers: responseJson.hospital})
//                       alert(this.state.markarray)

                    // const transformed = rece.map(({ id, state_name }) => ({ label: state_name, value: id }));
                    // console.log(transformed)

                    arrayholder = responseJson.hospital

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


    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }



    _renderItems = (itemData) => {
        var item = itemData.item
        return (

            <TouchableOpacity onPress={() => this.selectedFirst(itemData)
            } activeOpacity={0.9}>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>


                    <View style = {{flexDirection:'row',width :'100%'}}>
                        <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                               source={{uri:item.display_image}}/>

                        <View style = {{width :window.width -120}}>

                            <Text  style = {{fontFamily:GLOBAL.regular,color:'black',fontSize:14,marginLeft:4,marginTop:1}}>
                                {item.name}

                            </Text>


                            <Text  style = {{fontFamily:GLOBAL.regular,color:'grey',fontSize:14,marginLeft:4,marginTop:1}}>
                                {item.lat_long_address}

                            </Text>

                            <Text  style = {{fontFamily:GLOBAL.regular,color:'black',fontSize:14,marginLeft:4,marginTop:1}}>
                                {item.mobile}

                            </Text>

                            {/*                    <Text  style = {{fontFamily:"Poppins-SemiBold",color:'#800000',fontSize:16,textAlign:'right',width:window.width- 50}}>
                        ADD CART

                    </Text>
*/}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    SearchFilterFunction(text){
        const newData = arrayholder.filter(function(item){
            const itemData = item.test_name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            results: newData,
            text: text


        })

    }

    onMarkerClick=(item)=>{
       // GLOBAL.hids = item.hospital_id
      //  this.props.navigation.navigate('HospitalDetail')
//        alert(JSON.stringify(item.id))
        //GLOBAL.markid = item.id
      //  this.flatList_Ref.scrollToIndex({animated: true,index:item.id});

    }

    SearchFilterFunction(text){
        // search with single value test_name ie. search with only test name of items in flatlist
        const newData = arrayholder.filter(function(item){
            const itemData = item.hospital_name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            results: newData,
            text: text


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

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Insurance')
                }>

                <View style = {{margin :10,width:window.width - 20 ,height:50,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                    <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                           source={require('./search.png')}/>

                    <Text style={{marginLeft:10 ,width:window.width - 100,color:'rgba(0, 0, 0, 0.4)',marginTop:16}}>
                    Search
                               </Text>




                </View>
                </TouchableOpacity>


                {/*                    <View style = {{margin :10,width:window.width - 20 ,height:45,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./search.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100, height:45}}
                                   placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                   onChangeText={(text) => this.SearchFilterFunction(text)}
                                   placeholder={"Search"}/>

                    </View>
*/}


                {/*                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./speech.png')}/>
*/}

                <MapView
                   // remove if not using Google Maps
                    style={{width:width, height:height, marginTop:10, marginBottom:this.state.marginBottom}}
                    region={this.state.initialPosition}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    onMapReady={this._onMapReady}

                >

                    {this.state.markers.map((marker,id) =>

                    //
                    //     var a = "";
                    //     var b = "";
                    //     if (marker.latiude == ""){
                    //     a = "0.0"
                    //     b = "0.0"
                    // }else{
                    //     a =   marker.latitude
                    //     b =   marker.longitude
                    // }

                        (

                        <Marker
                            coordinate={{latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude)}}
                            title= {marker.hospital_name}
                            description={marker.address}
                            onPress={() => this.onMarkerClick(marker)}

                        >

  <Image source={require('./hos.png')} style={{height: 35, width:35 }} />

                        </Marker>
                    ))}


                </MapView>




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

})
