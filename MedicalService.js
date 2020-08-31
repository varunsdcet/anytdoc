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
var arrayholder = [];
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MedicalService extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        images :[

        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SERVICES',
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
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }


    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){
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
                "type":"services"




            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == true) {
                    this.setState({images:responseJson.services})
                    arrayholder = responseJson.services
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }




    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (item) => {
     GLOBAL.serviceid = item.id

        GLOBAL.price = item.price
        GLOBAL.type = '3'
       this.props.navigation.navigate('MedicalServiceBooking')
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

    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    marginTop: 10,marginBottom:10,borderRadius:12}}>






                            <View style = {{flexDirection:'row'}}>
                            <Text style={{marginLeft : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi,width :window.width - 80}}>

                                {item.title}
                            </Text>



                                <Image style = {{width :22 ,height :22,alignSelf:'flex-end',marginRight:34,marginTop:20}}
                                       source={require('./arrowlogo.png')}/>

                            </View>




                <Text style={{marginLeft : 10,marginTop:0,fontSize : 14,color :'#D90000', height:'auto',fontFamily:GLOBAL.semi,width :window.width - 80,marginBottom:12}}>

                   ₹ {item.price}
                </Text>

 </View>



            </TouchableOpacity>
        )
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
            images: interest,
            text: text


        })

    }
    render() {

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
                              data={this.state.images}
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

        backgroundColor :'#f1f1f1',
        flex:1
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
