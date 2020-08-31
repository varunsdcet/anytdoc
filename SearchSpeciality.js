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
    SafeAreaView,
    AsyncStorage
} from 'react-native';
var arrayholder =[];
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SearchSpeciality extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        text:'',

        selected:false,
        data:[],
        images :[
        ],

    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'Speciality',
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


    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){


        const url = GLOBAL.BASE_URL +  'view_all_specialty'

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
              this.setState({data:responseJson.specialty})
arrayholder = responseJson.specialty

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }

    login = () => {
        //this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {
        //  this.props.navigation.navigate('MedicalServiceBooking')
    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    SearchFilterFunction(text){


        // let tracks = arrayholder
        // let filterTracks = tracks.filter(item => {
        //     if(item.test_name.toLowerCase().match(text)) {
        //         return item
        //     }
        // })
        // this.setState({ results: filterTracks })
        // this.setState({ text: text })


        const newData = arrayholder.filter(function(item){

            const mergetwo= item.title
            const itemData = mergetwo.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })


        const interest = newData;
        this.setState({
            data: interest,
            text: text


        })

    }

    speciality = (item) => {
      

        this.props.navigation.navigate('Speciality',item)
    }

    renderRowItem2 = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.speciality(itemData.item.title)
            }>

            <View   style  = {{width:window.width ,margin:4,backgroundColor:'white',shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
            >



<View style = {{flexDirection:'row'}}>
                <Image source={{uri :itemData.item.image}}
                       style  = {{width:40, height:40,marginTop: 12,marginLeft:10,alignSelf:'center',marginLeft:5,resizeMode:'stretch',marginBottom:10
                       }}

                />

                <Text style = {{fontSize:14,margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',marginLeft:10,marginTop:20,width:window.width - 100,height:40,}}>
                    {itemData.item.title}

                </Text>
                </View>

            </View>
            </TouchableOpacity>
        )
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

                <View style = {{margin :10,width:window.width - 20 ,height:45,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                    <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                           source={require('./search.png')}/>




                    <TextInput style={{marginLeft:10 ,width:window.width - 100, height:45}}
                               placeholderTextColor='rgba(0, 0, 0, 0.4)'
                               onChangeText={(text) => this.SearchFilterFunction(text)}
                               placeholder={"Search"}/>

                </View>

                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.data}

                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this.renderRowItem2}
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

})
