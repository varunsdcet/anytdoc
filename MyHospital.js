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

    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var arrayholder=[];
export default class MyHospital extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            path:'',
            results: [],
            images: [

            ]

        };

    }
    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'HOSPITALS',
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



    selectedFirst = (item) =>{
        GLOBAL.hids = item.hospital_id
        this.props.navigation.navigate('HospitalDetail')
    }
    componentDidMount(){
        const url = GLOBAL.BASE_URL +  'insurance_for_hospital'

        fetch(url, {
            method: 'get',
                sslPinning: {
                certs: ['anytimedoc_in']
                  },}).then((response) => response.json())
            .then((responseJson) => {

alert(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({results:responseJson.hospital})
                    this.setState({path:responseJson.hosptal_path})
                    arrayholder = responseJson.hospital



                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }



    _renderItems = ({item,index}) => {

        var a = this.state.path  + item.display_image

        return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Insurance')
                }>


                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                    <View style = {{flexDirection:'row',width :'100%'}}>
                        <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                               source={{uri:a}}/>

                        <View style = {{width :window.width -120}}>


                            <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :window.width -120,marginTop:8}}>

                                {item.hospital_name}
                            </Text>








                            <View style = {{flexDirection:'row',marginBottom:4}}>
                                <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                                       source={require('./location.png')}/>

                                <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium',}}>

                                    {item.lat_long_address}
                                </Text>

                            </View>


                        </View>

                    </View>




                </View>




                </TouchableOpacity>

        )
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

            <View style={styles.container}>

                <View style = {{margin :10,width:window.width - 20 ,height:50,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                    <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                           source={require('./search.png')}/>

                    <TextInput style={{marginLeft:10 ,width:window.width - 100}}
                               placeholderTextColor='rgba(0, 0, 0, 0.4)'
                               onChangeText={(text) => this.SearchFilterFunction(text)}
                               placeholder={"Search"}/>




                </View>





                <FlatList style= {{margin:8}}
                          data={this.state.results}
                          numColumns={1}
                          keyExtractor = { (item, index) => index.toString() }
                          renderItem={this._renderItems}
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
