
import React, {Component} from 'react';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
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
import Loader from './Loader.js';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NurseBooking extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        atleastSelected:0,
        selected:false,
        data:[],
        images :[

        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'NURSE BOOKING',
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



    componentDidMount(){
this.showLoading()
        const url = GLOBAL.BASE_URL +  'get_services'


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
                "type":"nurse"




            }),
        }).then((response) => response.json())
            .then((responseJson) => {
this.hideLoading()
            //    alert(JSON.stringify(responseJson))

                if (responseJson.status == true) {


                    var array = [];
                    for (var i = 0; i < responseJson.services.length; i++) {
                        var dict = {
                            title: responseJson.services[i].title,
                            id: responseJson.services[i].id,
                            price: responseJson.services[i].price,
                            selected: '',


                        }
                        array.push(dict)

                    }
                    this.setState({images :array})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }
    selectedFirst = (indexs) => {
            var a = this.state.images
            for (var i = 0;i<this.state.images.length ;i ++){

                this.state.images[i].selected = ''
            }
            var index = a[indexs]
            if (index.selected == ""){
                index.selected = "Y"
            }else{
                index.selected = ""
            }
            this.state.images[indexs] = index
            this.setState({images:this.state.images})
            this.setState({atleastSelected:1})
        }


    login = () => {
        if(this.state.atleastSelected == 1){
        GLOBAL.nurseArray = this.state.images
        GLOBAL.type = "2"
        this.props.navigation.navigate('NurseTime')

        }
        else{
            alert('Please select nurse service')
        }
    }






    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-between'}}>

            <View>

                        <View style = {{flexDirection:'row'}}>



                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :window.width - 80,fontWeight:'bold'}}>

                        {item.title}
                    </Text>


                            {item.selected != '' &&(

                                <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:34,marginTop:20}}
                                       source={require('./check.png')}/>
                            )}
                            {item.selected == '' &&(

                                <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:34,marginTop: 20}}
                                       source={require('./uncheck.png')}/>
                            )}

                        </View>
                    <Text style={{marginTop:-8,fontSize : 14,color :'#D90000', height:'auto',fontFamily:GLOBAL.semi,marginBottom:8,marginLeft:10}}>

                      ₹ {item.price}
                    </Text>
            </View>


                </View>
            </TouchableOpacity>
        )
    }
    render() {


        if(this.state.loading){
            return(
                <View style={styles.containers}>
                    <Loader>
                    </Loader>
                </View>
            )
        }
        return (

                <View style={styles.container}>



                    <FlatList style= {{flexGrow:0,margin:8,height:window.height - 180}}
                              data={this.state.images}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                    <Button
                        style={{padding:12,marginTop:8,fontSize: 18, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                     BOOK
                    </Button>

                </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor :'white',

    },
    containers: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

})
