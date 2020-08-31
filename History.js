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
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import Loader from './Loader.js';
import {Card} from 'react-native-shadow-cards';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class History extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        results:[],

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'ORDER',
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
    componentDidMount() {
      this.showLoading()


        const url = GLOBAL.BASE_URL + 'medical_equipment_history'

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
                "user_id": GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              this.hideLoading()

            //    alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results: responseJson.list})


                } else {
                    this.setState({results: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    selectedFirst = (item) => {
        GLOBAL.equipment = item
        this.props.navigation.navigate('HistoryDetail')

    }

    renderItem=({item}) => {
        return(

            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>
                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop:15,marginLeft:15,marginRight:15, height: 'auto',borderRadius :6,width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2}}>





                    <View style={{flexDirection:'row',marginLeft:10,marginTop:10,width:window.width - 20,justifyContent:'space-between',height:50}}>

<View style = {{flexDirection:'row'}}>
                    <Text style={{fontSize:12,fontFamily:GLOBAL.semi,color:'#1E1F20',marginLeft:10,marginTop:12}}>Booking ID</Text>
                        <Text style={{fontSize:12,fontFamily:GLOBAL.semi,color:'#747A8D',marginLeft:10,marginTop:12}}>{item.id}</Text>

                    </View>
  <Text style={{color:'#19AB2B', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8,marginRight:32}}>{item.booking_status}</Text>
                    </View>




                    <View style={{flexDirection: 'row', marginTop:1,marginLeft:5}}>

                        <Image style = {{width :100 ,height :100,borderRadius: 30,margin:10,resizeMode:'stretch'}}
                               source={{ uri: item.product_image }}/>


                        <View style = {{flexDirection:'row'}}>
                        <View>

                            <Text style={{color:'black', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2,width:window.width - 160}}> {item.product_name}</Text>


                            <View style = {{flexDirection:'row',width:'100%'}}>
                                <Text style={{color:'grey', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}>Quantity :</Text>
                                <Text style={{color:'black', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}> {item.quantity}</Text>
                            </View>
                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style={{color:'grey', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}>Equipment Type :</Text>
                            <Text style={{color:'black', fontSize:14,fontFamily:GLOBAL.regular,marginTop:2}}> {item.equipment_type}</Text>
                        </View>

                        <Text style={{color:'#D90000', fontSize:14,fontFamily:GLOBAL.semi,marginTop:8}}>₹{item.order_price}</Text>

</View>
</View>

                    </View>

                </View>



            </TouchableOpacity>

        );
    }

    _keyExtractor=(item, index)=>item.key;



    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <Loader>
                    </Loader>
                </View>
            )
        }
        return (
            <View style={{width : Dimensions.get('window').width,flex:1,backgroundColor:'#F2F5F7'}}>
{this.state.results.length == 0 && (
                 <Text style={{marginTop:'20%',fontSize : 18,color :'black', height:'auto',fontFamily:GLOBAL.regular,alignSelf:'center'}}>
                 No order placed yet!
                    </Text>

    )}
    {this.state.results.length!=0 &&(

                <FlatList
                    data={this.state.results}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />

        ) }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        height: window.height,
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})
