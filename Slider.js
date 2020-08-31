import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image, TouchableOpacity,
} from 'react-native';

import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import PageControl from 'react-native-page-control';

import SwiperFlatList from 'react-native-swiper-flatlist';
var array = ["Access thousands of trusted Doctors instantly!","Asking doctor a medical query has never been so easy!","Book an online in-person appointment with a Doctor","Consult Doctors via Video/Audio and Live chat"]
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
const window = Dimensions.get('window');
type Props = {};
export default class Slider extends Component<Props> {
    state = {
        value: '',
        index :'',
    }
    static navigationOptions = ({ navigation }) => {
        return {
            swipeEnabled: false,
            gesturesEnabled: false,
            header: () => null
        }
    }

    buttonClickListener = () =>{
        this.props.navigation.replace('Landing')
    }

    renders  = (index) => {
        this.setState({value:array[index]})
        this.setState({index:index})
    }


    _handlePress = () =>{
        this.props.navigation.replace('Login')
    }
    render(){
        return (

            <View style={{width: '100%', height: '100%',flex: 1, flexDirection: 'column' ,backgroundColor :'white'}}>


                <View style={{width :window.width,height :window.height}}>

                    <Image style = {{width :'100%' ,height : '100%'}}
                           source={require('./splash.png')}/>

                    <View style = {{position:'absolute',top:0,width :'100%' ,height : window.height - 200}}>
                        <SwiperFlatList
                            autoplay
                            autoplayDelay={2}
                            autoplayLoop
                            index={0}
                            showPagination = {false}
                            onChangeIndex ={ (index) => this.renders(index.index) }
                        >
                            <View style={[styles.child, { backgroundColor: 'transparent' }]}>
                                <Image style = {styles.text}
                                       source={require('./first.png')}/>
                                       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 20,margin:20,marginTop:-102,textAlign: 'center'}}>

                                           {this.state.value}


                                       </Text>
                            </View>
                            <View style={[styles.child, { backgroundColor: 'transparent' }]}>
                                <Image style = {styles.text}
                                       source={require('./second.png')}/>
                                       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 20,margin:20,marginTop:-102,textAlign: 'center'}}>

                                           {this.state.value}


                                       </Text>
                            </View>
                            <View style={[styles.child, { backgroundColor: 'transparent' }]}>
                                <Image style = {styles.text}
                                       source={require('./third.png')}/>
                                       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 20,margin:20,marginTop:-102,textAlign: 'center'}}>

                                           {this.state.value}


                                       </Text>
                            </View>
                            <View style={[styles.child, { backgroundColor: 'transparent' }]}>
                                <Image style = {styles.text}
                                       source={require('./four.png')}/>
                                       <Text style = {{color:'#1E1F20',fontFamily:GLOBAL.semi,fontSize: 20,margin:20,marginTop:-102,textAlign: 'center'}}>

                                           {this.state.value}


                                       </Text>
                            </View>


                        </SwiperFlatList>

                    </View>


                </View>


                <View style = {{position:'absolute',bottom:0,height:170,width:'100%',backgroundColor:'transparent',borderRadius:20}}>
                <PageControl
                    style={{width :100 ,marginTop:0,alignSelf:'center'}}
                    numberOfPages={4}
                    currentPage={this.state.index}
                    hidesForSinglePage
                    pageIndicatorTintColor='#CCCCCC'
                    currentPageIndicatorTintColor='black'
                    indicatorStyle={{borderRadius: 5}}
                    currentIndicatorStyle={{borderRadius: 5}}
                    indicatorSize={{width:8, height:8}}
                    onPageIndicatorPress={this.onItemTap}
                />





                    <View style = {{flexDirection:'row',marginTop:40,justifyContent:'space-between',marginLeft:10,width:window.width - 20}}>

                        <Button
                            style={{padding:12,marginTop:14,fontSize: 20, color: '#FFFFFF',marginLeft:10,width:window.width/2 - 50,height:50,fontFamily:GLOBAL.semi,borderRadius:12,borderWidth:1,borderColor:'#FFFFFF'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            LOGIN
                        </Button>


                        <Button
                            style={{padding:12,marginTop:14,fontSize: 20,backgroundColor:'#FFFFFF', color: '#D90000',marginRight:10,width:window.width/2 - 50,height:50,fontFamily:GLOBAL.bold,borderRadius:12}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.props.navigation.navigate('Register')}>
                            SIGN UP
                        </Button>

                    </View>


                </View>





            </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {

        marginLeft : 50,
        marginTop :75,
        width: window.width - 50,
        height:window.height - 250,
        resizeMode:'contain',


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

    child: {
        height: window.height * 0.7,
        width:window.width,
        justifyContent: 'center'
    },
    text: {
        resizeMode:'stretch',
        height: window.height * 0.7,
        width:window.width


    }
})
