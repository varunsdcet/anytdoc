import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import Loader from './Loader.js';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyA6wDJM-prsJa00_NMLcHiLEPsdhPTwB5w';
const { width, height } = Dimensions.get('window');
import {NavigationActions,StackActions} from 'react-navigation';
let textRef = React.createRef();
let menuRef = null;
import Geolocation from '@react-native-community/geolocation';
type Props = {};
const GLOBAL = require('./Global');
import {Card} from 'react-native-shadow-cards';

var length = 0;
var commonHtml = "";

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class AmbulanceBooking extends Component {
    state = {
        text: '',
        currentLongitude: 0,//Initial Longitude
        currentLatitude: 0,
        imageurl:'',
        status :'',data:[],
        ipAdd : '',
        loading:false,location:GLOBAL.currLoc,catid:'',
        marker :[1],
        name :'',        initialPosition: {
latitude: 0,
longitude: 0,
latitudeDelta: 0,
longitudeDelta: 0,
},


    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'AMBULANCE BOOKING',
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

    selectVehicle=(item, indexs)=>{
//        alert(JSON.stringify(item))
                var a = this.state.data
        for (var i = 0;i<this.state.data.length ;i ++){

            this.state.data[i].is_selected = '0'
        }
        var index = a[indexs]
        if (index.is_selected == "0"){
            index.is_selected = "1"
            this.setState({catid : item.id})

        }else{
            index.is_selected = "0"
        }
        this.state.data[indexs] = index
        this._handlePress()

    }

    renderRowItem2 = ({item,index}) => {

        let ic_url = this.state.imageurl + item.icon
        return (
            <TouchableOpacity onPress={() => this.selectVehicle(item,index)
            }
            activeOpacity={0.99}>

            <View   style  = {{width:window.width/2 - 10,margin:5, height:150,backgroundColor:'white',shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
            >
                <Image source={{uri : ic_url}}
                       style  = {{width:window.width/2 - 10, height:70,marginTop: 3,alignSelf:'center',marginLeft:5,resizeMode:'cover',
                       }}

                />



                <Text style = {{fontSize:14,margin:1,marginTop:7,fontFamily:GLOBAL.semi,color:'#1E1F20',textAlign:'center',width:window.width/2 - 10}}>
                    {item.name}

                </Text>
                <View style = {{flexDirection:'row'}}>
                <Text style = {{fontSize:12,margin:1,fontFamily:GLOBAL.semi,color:'#D90000',textAlign:'center',width:window.width/2 - 10, alignSelf:'center'}}>
                    ₹{item.price}/- onwards

                </Text>

                            </View>

                            <Button
                             style={{padding:4,marginTop:2,fontSize: 20, color: 'white',backgroundColor:'#D90000',width:window.width/2 - 10,height:40,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
                             styleDisabled={{color: 'red'}}
                             onPress={() => this.selectVehicle(item,index)}>
                             SUBMIT
                         </Button>

            </View>
            </TouchableOpacity>
        )
    }

    _handleStateChange = (state) =>{
        this.setState({location:GLOBAL.currLoc})
        this.loadData()
    }

    liketogo=()=>{
        GLOBAL.like=2
        this.props.navigation.navigate('Location')
    }

    currentPos=()=>{
        GLOBAL.like=1
        this.props.navigation.navigate('Location')
    }

    hideLoading() {
        this.setState({loading: false})
    }



    showLoading() {
        this.setState({loading: true})
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
                      GLOBAL.location = responseJson.address
                      GLOBAL.currLoc = responseJson.address
                      GLOBAL.currentAddress = responseJson

                  }else{
                      this.setState({results:[]})
                  }
              })
              .catch((error) => {
                  console.error(error);
                  this.hideLoading()
              });

      }

    _handlePress=()=>{


      if (this.state.location == ""){
    alert('Please add location')
        return ;
      }
      if (GLOBAL.locationliketogo == "Where would you like to go?"){
alert('Please add destination')
        return ;
      }
      //alert(this.state.location)
//        alert(this.state.catid)
this.showLoading()
        const url = GLOBAL.BASE_URL +  'add_ambulence_booking'

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
                "cat_id":this.state.catid,
                "from_":this.state.location,
                "to_": GLOBAL.locationliketogo
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
                    routeName: 'TabNavigator',
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


    componentDidMount(){
    this.props.navigation.addListener('willFocus', this._handleStateChange);
    Geolocation.getCurrentPosition((position) =>{
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      this.getlog(position)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition: initialRegion})
      //  this.mapView.animateToRegion(initialRegion, 1);

    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 20000,});

    this.loadData()
    }

    loadData=()=>{
                const url = GLOBAL.BASE_URL +  'ambulance_cat'

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
                "key":"all_specialty"

            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                  this.setState({data:responseJson.list})
                  this.setState({imageurl: responseJson.image_url})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

  _onMapReady = () => this.setState({marginBottom: 0})

    render() {
      const origin = {latitude: GLOBAL.lat , longitude:GLOBAL.long};
          const destination = {latitude: GLOBAL.lats, longitude: GLOBAL.longs};
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

                <MapView
                    clusterColor = '#77869E'
                    clusterTextColor = 'white'
                    clusterBorderColor = '#77869E'
                    clusterBorderWidth = {4}
                    showsUserLocation = {true}
                    showsMyLocationButton = {true}
                    pitchEnabled={true} rotateEnabled={true} zoomEnabled={true} scrollEnabled={true}
                    onMapReady={this._onMapReady}
                    ref = {(ref)=>this.mapView=ref}
                    region = {this.state.initialRegion}


                    style={{ flex:1, marginBottom:this.state.marginBottom }}
                >
                <MapViewDirections
                                          origin={origin}
                                          destination={destination}
                                          strokeWidth={3}
                                          strokeColor="hotpink"
                                          apikey={GOOGLE_MAPS_APIKEY}
                                      />









                </MapView>

                <Card  style = {{position:'absolute',top :10 ,borderRadius:13,
                width:window.width - 20,height:120 ,flexDirection:'column',alignSelf:'center', alignItems:'center'}}>

                    <View >

                    <View style = {{borderRadius:13,width:window.width - 20,height:45,
                        backgroundColor:'white',borderWidth:0,borderColor:'black',flexDirection:'row', marginTop:10, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={{width:'80%',}}
                onPress={()=> this.currentPos()}>
                 <Text style = {{textAlign: 'center',color:'#5A5A5A',fontFamily: GLOBAL.regular,alignSelf:'center', width:'80%'}}
                 numberOfLines={2}>
                  {this.state.location}

                 </Text>
                 </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')
                    }>

                    <Image style={{width:20, height:20, resizeMode:'contain', marginLeft:30}}
                    source={require('./checks.png')}/>
                    </TouchableOpacity>

                 </View>
                 <View style = {{backgroundColor:'grey',marginTop:5,width:window.width - 20,height:1}}>

                 </View>

                    <TouchableOpacity onPress={() => this.liketogo()
                    }>
                    <View style = {{borderRadius:13,width:window.width - 20,height:45,backgroundColor:'white',borderWidth:0,borderColor:'black', marginTop:10, justifyContent:'center'}}>
                      <Text style = {{textAlign: 'center',color:'#5A5A5A',fontFamily: GLOBAL.regular,alignSelf:'center', width:'80%'}}
                      numberOfLines={2}>
                      {GLOBAL.locationliketogo}
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>
                </Card>


                <View style= {{margin:8, position:'absolute', bottom:10, flexDirection:'column'}}>
                    <FlatList style= {{flexGrow:0, }}
                                horizontal={true}
                              data={this.state.data}

                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this.renderRowItem2}
                    />



                    </View>

                    </View>


        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'white'
    },

})
