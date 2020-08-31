import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Linking,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';

type Props = {};
import Loader from './Loader.js';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SurgicalPackage extends Component {
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
            title: 'SURGICAL PACKAGES',
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

        const url = GLOBAL.BASE_URL +  'list_quoation_history'

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





            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.hideLoading()

//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


        //   this._handlePressLogin()
    }



    logind = (item) => {
        var url =  item.resolve
        Linking.openURL(url)
        //this.props.navigation.navigate('NurseTime')
    }


    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {
      //  this.props.navigation.navigate('MedicalServiceBooking')
    }



    _renderItems = ({item,index}) => {

        return (


                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-around',marginTop: 10,marginBottom:10,borderRadius:4}}>







                    <Text style={{marginLeft : 5,marginTop:5,fontSize : 13,color :'#4C475A', height:'auto',fontFamily:GLOBAL.semi,width :window.width - 80}}>

                    Problem: {item.problem}
                    </Text>

                    <View style = {{flexDirection:'row',marginBottom:10}}>




{item.resolve!='' && (
                        <Button
                            style={{padding:6,marginTop:10,fontSize: 14.5, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:window.width/2 - 50,height:35,fontFamily:GLOBAL.regular,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.logind(item)}>
                            Get quotation
                        </Button>

)}
                    </View>


<View style = {{width:'100%',backgroundColor:'#4C475A',height:0.3}}>

</View>


                </View>

        )
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
        flex:1,
        backgroundColor :'white',

    },

})
