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
import {Card} from 'react-native-shadow-cards';
const GLOBAL = require('./Global');
import CalendarStrip from "react-native-calendar-strip";
const window = Dimensions.get('window');
import Button from 'react-native-button';
import Loader from './Loader.js';
import { TextField } from 'react-native-material-textfield';
type Props = {};
var arrayholder = [];

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MedicalEquipment extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        path:'',

        selected:false,
        data:[],
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'MEDICAL EQUIPMENT',
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

    _handleStateChange = (state) => {
      this.showLoading()

        const url = GLOBAL.BASE_URL +  'list_products'

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
                "type":GLOBAL.rentPurchase




            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                    this.hideLoading()



                if (responseJson.status == true) {
                    this.setState({data:responseJson.list})
                    this.setState({path:responseJson.path})
                    GLOBAL.imagePath = responseJson.path
                    arrayholder = responseJson.list
                    GLOBAL.shipTime = responseJson.time
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }




    speciality = (item) => {

      const url = GLOBAL.BASE_URL +  'count_cart'

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
              "type":'medical'




          }),
      }).then((response) => response.json())
          .then((responseJson) => {

              //    alert(JSON.stringify(responseJson))

             GLOBAL.counter = responseJson.count
              GLOBAL.medicalEquipment = item
              this.props.navigation.navigate('MedicalDetail')
              if (responseJson.status == true) {

              }
          })
          .catch((error) => {
              console.error(error);

          });


//        alert(JSON.stringify(item))

    }

    renderRowItem2 = (itemData) => {
        var imge = this.state.path + itemData.item.image
        var disc = parseInt(itemData.item.rent_price)
        var discp = parseInt(itemData.item.rent_discount)
        var discount = disc - discp

        var discs = parseInt(itemData.item.purchase_price)
        var discps = parseInt(itemData.item.purchase_discount)
        var discounts = discs - discps


        return (
            <TouchableOpacity onPress={() => this.speciality(itemData.item)
            } activeOpacity={0.99}>

                <Card   style  = {{width:window.width/3 - 12,margin:4,height:160,backgroundColor:'white',

                }}
                >




                    <Image source={{uri :imge}}
                           style  = {{width:window.width/3 - 12, height:100,marginTop: 0,alignSelf:'center',marginLeft:5,resizeMode:'cover'
                           }}

                    />

                    <Text style = {{fontSize:12,margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',textAlign:'center',width:window.width/3.2 - 8,height:40}}>
                        {itemData.item.name}

                    </Text>
                    {itemData.item.for == "Rental" && itemData.item.rent_discount == "0.00" && (
                        <Text style = {{fontSize:12,textAlign:'center',margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',width:window.width/3.2 - 8}}>
                        ₹{itemData.item.rent_price}/-

                        </Text>

                    ) }


                    {itemData.item.for == "Rental" && itemData.item.rent_discount != "0.00" && (
                        <Text style = {{fontSize:12,textAlign:'center',margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',width:window.width/3.2 - 8}}>
                          ₹{itemData.item.rent_discount}/-

                        </Text>

                    ) }



                    {itemData.item.for == "Purchase" && itemData.item.purchase_discount == "0.00" && (
                        <Text style = {{fontSize:12,textAlign:'center',margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',width:window.width/3.2 - 8}}>
                           ₹{itemData.item.purchase_price}/-

                        </Text>

                    ) }


                    {itemData.item.for == "Purchase" && itemData.item.purchase_discount != "0.00" && (

                        <Text style = {{fontSize:12,textAlign:'center',margin:1,fontFamily:GLOBAL.semi,color:'#1E1F20',width:window.width/3.2 - 8}}>
                           ₹{itemData.item.purchase_discount}/-

                        </Text>



                    ) }


                </Card>
            </TouchableOpacity>
        )
    }

    SearchFilterFunction(text){
        const newData = arrayholder.filter(function(item){
            const mergetwo= item.name
            const itemData = mergetwo.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })


        this.setState({
            data: newData,
            text: text


        })

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




                    <View style = {{margin :10,width:window.width - 20 ,height:45,borderRadius:6,flexDirection:'row',backgroundColor:'#EAEBEC',}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./search.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100}}
                                   placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                   onChangeText={(text) => this.SearchFilterFunction(text)}

                                    placeholder={"Search"}/>
                    </View>

                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.data}
                              numColumns={3}
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
        backgroundColor :'white',

    },

})
