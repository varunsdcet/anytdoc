import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import Loader from './Loader.js';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import {Card} from 'react-native-shadow-cards';

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class EquipmentCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            prices:'',
            text :'',
            department :[],
            speciality :[],
            hospital:[],
            price:[],
            myprice:'',
            results: [],
            images: [
                {
                    days :'10.00',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.23',
                    selected:'',
                },
                {
                    days :'10.33',
                    selected:'',
                },
                {
                    days :'10.56',
                    selected:'',
                },
                {
                    days :'10.66',
                    selected:'',
                },
            ]

        };

    }

    componentWillUnmount() {

    }



    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        if (typeof get !== 'undefined') {
            this.getApicall(get)
        }

        this.setState({modalVisible: visible});
    }



    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'My Cart',
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



    getCheck =()=>{
      this.showLoading()
        const url =  GLOBAL.BASE_URL  + 'get_check_chat_flag'

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


                if (responseJson.status == true) {


                }else{

                }

                this.getCheck()
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    _handleStateChange = (state) => {
      this.showLoading()


        const url =  GLOBAL.BASE_URL  + 'list_cart_medical'

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

          //      alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})
                    this.setState({prices:responseJson.sum_total})


                }else{
                    this.setState({results:[]})
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


    login = () => {

//        alert(JSON.stringify(this.state.results))

        for (var i = 0;i<this.state.results.count;i++){
            GLOBAL.equipmentfor = this.state.results[0].for

        }

        GLOBAL.price = this.state.prices
        GLOBAL.type = "13"

        this.props.navigation.navigate('EquipmentAddress')


    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item,index) => {
     //   alert(JSON.stringify(item))
        var a = this.state.results[index]
        if (a.in_cart == 0){
            a.in_cart = 1
        }else{
            a.in_cart = 0
        }
        this.state.results[index] = a
        this.setState({results:this.state.results})





        var indexs = 0;
        for (var i = 0; i<this.state.results.length; i++){
            if (this.state.results[i].in_cart == 1){
                indexs = indexs + 1;
            }else{

            }
        }
      //  alert(indexs)



        var a = "";

        if (GLOBAL.lab.discount_price  == "0.00"){
            a = GLOBAL.lab.sell_price
        }else{
            a = GLOBAL.lab.discount_price
        }

        var f = parseInt(a) * indexs
    //    alert(f)
        this.setState({myprice:f})

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

    _renderDepartmentss =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }
    _renderDepartments =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }

    logins =  (item) => {


        var s = parseInt(item.quantity) - 1
        if (item.quantity == "1"){
          this.showLoading()


            const url =  GLOBAL.BASE_URL  + 'delete_cart_medical'



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
                    "cart_id":item.id,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
             //       alert(JSON.stringify(responseJson))

this.hideLoading()


                    if (responseJson.status == true) {
                        this.setState({results:responseJson.list})
                        this.setState({prices:responseJson.sum_total})
                    }else{
                        this.setState({results:[]})
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
            //this.selectedFirstss(item)

        }else {
          this.showLoading()
            const url = GLOBAL.BASE_URL + 'update_quantity'

            var as ;
            if (GLOBAL.rentPurchase=='Rental'){

                var disc = parseInt(item.rent_price)
                var discp = parseInt(item.rent_discount)
                as = disc - discp
            }else{
                as = item.purchase_discount
            }

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
                    "cart_id": item.id,
                    "quantity": s,
                    "price": as

                }),
            }).then((response) => response.json())
                .then((responseJson) => {

this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({results: responseJson.list})
                        this.setState({prices: responseJson.sum_total})
                    } else {

                    }
                })
                .catch((error) => {
                  this.hideLoading()
                    console.error(error);

                });
        }

    }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    loginss =  (item) => {
     //   alert(JSON.stringify(item))
        var s = parseInt(item.quantity) + 1
        this.showLoading()
        const url =  GLOBAL.BASE_URL  + 'update_quantity'
        var as ;
        if (GLOBAL.rentPurchase=='Rental'){

            var disc = parseInt(item.rent_price)
            var discp = parseInt(item.rent_discount)
            as = disc - discp
        }else{
            as = item.purchase_discount
        }


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
                "cart_id":item.id,
                "quantity":s,
                "price":as

            }),
        }).then((response) => response.json())
            .then((responseJson) => {


this.hideLoading()

                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})
                    this.setState({prices:responseJson.sum_total})
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
this.hideLoading()
            });

    }

    selectedFirstss =  (item) => {
        alert(item.cart_id)
     this.showLoading()

        const url =  GLOBAL.BASE_URL  + 'delete_cart_medical'



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
                "cart_id":item.id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

this.hideLoading()
//                alert(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    alert("Equipment removed from cart!")
                    this.setState({results:responseJson.list})
                    this.setState({prices:responseJson.sum_total})
                }else{
                    this.setState({results:[]})
                    this.setState({prices: '0'})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    _renderDepartment =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }

    _renderItems = ({item,index}) => {

var s = item.path + item.image

        return (
            <Card style ={{marginBottom:10,marginLeft:10,width:window.width - 20}}>
            <View style={{ flex: 1 ,flexDirection:'row',marginLeft : 5,width:window.width - 10,marginTop: 10,marginBottom:10,borderRadius:10 }}>

                <View>
                <Image source={{uri :s}}
                       style  = {{width:100, height:100,marginTop: 3,marginLeft:5,resizeMode:'cover'
                       }}

                />
                </View>
                <View>

                <Text  style = {{color:'#1E1F20',fontSize:16,marginLeft:10,marginTop:4,fontFamily:GLOBAL.semi, width:'70%'}}>
                    {item.name}

                </Text>

<View style = {{flexDirection:'row',justifyContent:'space-between',marginRight:20}}>
                    <Text  style = {{color:'grey',fontSize:14,marginLeft:10,marginTop:4,fontFamily:GLOBAL.regular}}>
                        ₹ {item.price}

                    </Text>


                    <View style = {{flexDirection:'row',width:100,height:30,marginLeft:20,justifyContent:'space-around'}}>

                        <Button
                            style={{ color: '#D90000',backgroundColor:'transparent',width:30,height:30,marginTop:6}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.logins(item)}>
                           -
                        </Button>
                        <Text  style = {{padding:8,paddingTop:4,color:'#D90000',fontSize:14,fontFamily:GLOBAL.regular, marginTop:5,borderWidth:1,borderColor:'#D90000',width:30,height:30}}>
                             {item.quantity}

                        </Text>
                        <Button
                            style={{ color: '#D90000',backgroundColor:'transparent',width:30,height:30,marginTop:6}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.loginss(item)}>
                            +
                        </Button>


                    </View>

</View>

                </View>


            </View>

            <View style = {{flexDirection:'row',width:'100%', marginBottom:10}}>
{GLOBAL.rentPurchase=='Rental' && (
                <Text style={{fontSize:12,fontFamily:GLOBAL.regular,color:'#000000',width:'88%'}}>Delivery & Setup in {GLOBAL.shipTime} hours</Text>
)}

        </View>
        <TouchableOpacity style = {{
        position:'absolute',top:10,right:40,width:20,
         height:20}}
        onPress={() => this.selectedFirstss(item)}>
        <Image source={require('./delete.png')}
               style  = {{width:20, height:20,resizeMode:'contain',
               }}

        />
        </TouchableOpacity>

        </Card>

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


                    <View style={{ marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>



                    {this.state.results.length==0 &&(
                                          <Text style={{marginLeft : window.width/3,marginTop:10,fontSize : 18,color :'black', height:'auto',fontFamily:GLOBAL.regular,width :'60%',marginBottom:10}}>
                  Empty cart!
                    </Text>

                        )}
                        {this.state.results.length!=0 && (
                        <FlatList style= {{flexGrow:0,marginLeft:0, marginTop:8,marginRight:0,marginBottom:100}}
                                  data={this.state.results}
                                  numColumns={1}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItems}
                        />

                            )}

                    </View>

                    {this.state.results.length == 0 && (
                        <View style={{height:1}}/>
                        )}
                        {this.state.results.length!=0 && (

                    <View style = {{position:'absolute',bottom:20,flexDirection:'row',width:'90%',marginLeft:'5%',backgroundColor:'white',height:50, justifyContent:'space-between',borderWidth:1,borderColor:'#D90000'}}>

                        <Text style={{marginTop:10,fontWeight:'bold',fontSize : 18,color :'#0C0423', height:'auto',fontFamily:GLOBAL.regular,width :'60%',marginLeft:10}}>

                            ₹{this.state.prices}/-
                        </Text>

                        <Button
                            style={{padding:4,fontSize: 14,marginTop:10, color: 'white',backgroundColor:'#D90000',width:100,height:30,fontFamily:GLOBAL.semi,borderRadius:4,marginRight:10}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            CHECKOUT
                        </Button>
                    </View>

                            )}



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
