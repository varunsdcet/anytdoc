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
var arrayholder=[]
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Insurance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            images: [
            ]

        };

    }






    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SEARCH HOSPITAL',
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



        //   this._handlePressLogin()
    }


    selectedFirst = (item) => {
        if (item.type  == "hospital") {
            GLOBAL.hids = item.id
            this.props.navigation.navigate('HospitalDetail')
        }else{
            GLOBAL.hid = item.id
            this.props.navigation.navigate('HospitalList')
        }
    }



    _renderItems = ({item,index}) => {
        var a = ""
if (item.type == "hospital"){
    a = this.state.path  + item.display_image
}

        {/*<TouchableOpacity onPress = {()=>this.selectedFirst(item)} >*/}


        {/*    <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>*/}


        {/*        <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:GLOBAL.semi,width :window.width -120,marginTop:8,marginBottom:8}}>*/}

        {/*            {item.insurance_name}*/}
        {/*        </Text>*/}



        {/*    </View>*/}
        {/*</TouchableOpacity>*/}
        return (
            <TouchableOpacity onPress = {()=>this.selectedFirst(item)} >
            <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>



{item.type == "hospital" && (
    <View style = {{flexDirection:'row',width :'100%'}}>
        <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
               source={{uri:item.image}}/>

        <View style = {{width :window.width -120}}>


            <Text style={{marginLeft : 5,fontSize : 14,color :'#1E1F20',fontFamily:GLOBAL.semi,width :window.width -120,marginTop:8}}>

                {item.name}
            </Text>








            <View style = {{flexDirection:'row',marginBottom:4}}>


                <Text style={{marginLeft : 5,fontSize : 12,color :'#4C475A',fontFamily:GLOBAL.regular,}}>

                    {item.lat_long_address}
                </Text>

            </View>


        </View>

    </View>
)}


                {item.type != "hospital" && (
                            <Text style={{marginLeft : 5,fontSize : 14,fontWeight:'bold',color :'#3A3A3A',fontFamily:GLOBAL.semi,width :window.width -120,marginTop:8,marginBottom:8}}>

                            {item.name}
                        </Text>

                )}




            </View>
            </TouchableOpacity>


        )
    }

             SearchFilterFunction(text){


                 const url = GLOBAL.BASE_URL +  'search_hospital_ins'

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
                         "keyword":text


                     }),
                 }).then((response) => response.json())
                     .then((responseJson) => {

                         this.setState({results:[]})

                         if (responseJson.status == true) {
                             this.setState({results:responseJson.list})




                         }
                     })
                     .catch((error) => {
                         console.error(error);
                         this.hideLoading()
                     });






  // const newData = arrayholder.filter(function(item){
  //        const itemData = item.insurance_name.toUpperCase()
  //        const textData = text.toUpperCase()
  //        return itemData.indexOf(textData) > -1
  //    })
  //    this.setState({
  //        results: newData,
  //        text: text
  //
  //
  //    })

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

    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
