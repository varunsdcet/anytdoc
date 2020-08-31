import React, { Component } from 'react';
import { StyleSheet, ScrollView,View, Image, Text, Platform, Dimensions,StatusBar, TouchableOpacity,TextInput ,Linking} from 'react-native';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Button from 'react-native-button';
const { width, height } = Dimensions.get('window');
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
type Props = {};
const FirstRoute = () => (
    <ScrollView style={styles.container} >
        <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row', margin:10,}}>
                <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dplus.png')}/>
                <View style={{flexDirection:'column', marginLeft:30}}>
                    <Text style={{fontSize:15, color:'black'}}>Experience</Text>
                    <Text style={{fontSize:15, color:'grey'}}>10 yrs</Text>
                </View>
                <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3,marginLeft:window.width/6 }} source={require('./loc.png')}/>
                <View style={{flexDirection:'column', marginLeft:30}}>
                    <Text style={{fontSize:15, color:'black'}}>Distance</Text>
                    <Text style={{fontSize:15, color:'grey'}}>10 Km</Text>
                </View>

            </View>
        </View>
        <View style={{width:window.width-20, height:1, backgroundColor:'#bfbfbf', marginLeft:10,marginRight:10,marginTop:5}}></View>


        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dre.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'black'}}>Review</Text>
                <Text style={{fontSize:15, color:'grey'}}>10 </Text>
            </View>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3,marginLeft:window.width/6 }} source={require('./recommended.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'black'}}>Recommendtions</Text>
                <Text style={{fontSize:15, color:'grey'}}>168</Text>
            </View>

        </View>

        <View style={{width:window.width-20, height:1, backgroundColor:'#bfbfbf', marginLeft:10,marginRight:10,marginTop:5}}></View>


        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dhouse.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'black'}}>Medeor Hospital</Text>
                <Text style={{fontSize:15, color:'grey'}}>Chaudhary Chandu Singh Marg, Block A2 Building</Text>
                <Text style={{fontSize:15, color:'grey'}}>Landmark: Green Field School</Text>

            </View>
        </View>

        <View style={{flexDirection:'row', margin:10,}}>

            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'#8BC60D'}}>AVAILABLE TODAY</Text>
                <Text style={{fontSize:15, color:'grey'}}>10:30 AM - 05:00 PM</Text>
                <Text style={{fontSize:13, color:'blue'}}>ALL TIMINGS</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtick.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'#010101'}}>SERVICES</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-Aesthetics Dentistry</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-Laser Bleaching</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-Office Bleaching</Text>
                <Text style={{fontSize:13, color:'red',marginTop:5}}>ALL SERVICES</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtick.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'#010101'}}>ALSO PRACTICES AT</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>Noida Family Dentistry & TCC</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>Block-D House No. 127-A ( Landmark : The millenium School, Block-D park )</Text>

            </View>
        </View>
    </ScrollView>
);
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export default class HospitalDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    constructor(props) {
        super(props);



        this.state = {
            position: 1,
            interval: null,
            password:'',
            timings:'',
            results:[],
            image:'',
            index: 0,
            lat:'',
            lng:'',
            tpa:[],
            routes: [
                { key: 'first', title: 'Details' },
                { key: 'second', title: 'Rating' },
            ],
        };
    }

    componentDidMount() {

        const url = GLOBAL.BASE_URL +  'hospital_detail'

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
                "id":GLOBAL.hids,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.data_list})
                    this.setState({image:responseJson.data_list.image})
  this.setState({lat:responseJson.data_list.lat})
  this.setState({tpa:responseJson.data_list.tp})
    this.setState({lng:responseJson.data_list.long})

                console.log(responseJson.data_list.image)


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    renderTabBar(props) {
        return (<TabBar
                style={{backgroundColor: '#FFFFFF', elevation: 0, borderColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 2.5, height:50}}
                labelStyle={{color: 'rgba(0,0,0,0.5)', fontSize: 18, fontWeight: 'bold'}}

                {...props}
                indicatorStyle={{backgroundColor: '#7BAAED', height: 2.5}}
            />
        );
    }
    _handlePress = () =>{
        Linking.openURL(`tel:${this.state.results.number}`)
    }

openMap = () =>{
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
const latLng = `${this.state.lat},${this.state.lng}`;
const label = 'Anytimedoc';
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`
});


Linking.openURL(url);
}

    componentWillUnmount() {
    }

    render() {
  const renderd =      this.state.tpa.map((item, key)=>(
              <Text key={key} style={{color:'#83878E',fontSize:14,margin:5}} > { item } </Text>)
              )

        return (

            <View style={styles.container}>
                <Image style={{width:window.width, height:250,resizeMode:'cover'}}
source={{uri:this.state.image}}

                 />

                <ScrollView style={styles.container} >
                    <View style={{flexDirection:'column'}}>

                    </View>



                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./location.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                            <Text style={{fontSize:15, color:'black'}}>{this.state.results.name}</Text>
                            <Text style={{fontSize:15, color:'grey',marginRight:12}}>{this.state.results.address}</Text>
                            <Button
                                style={{padding:4,marginTop:8,fontSize: 12, color: '#D90000',width:'20%',height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this.openMap()}>
                              Show Map
                            </Button>

                        </View>
                    </View>



                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./services.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                            <Text style={{fontSize:15, color:'#010101'}}>TPA Available</Text>
                          {renderd}


                        </View>
                    </View>

                    <Button
                        style={{padding:12,marginTop:8,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                      CALL NOW
                    </Button>



                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        backgroundColor:'#000000',
    },
})
