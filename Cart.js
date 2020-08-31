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
import Button from 'react-native-button';
const window = Dimensions.get('window');

import {NavigationActions,StackActions} from 'react-navigation';
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];
import {Card} from 'react-native-shadow-cards';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Cart extends Component {
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






    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
          }>
              <Text style={{color :'white',fontFamily:GLOBAL.regular,fontSize: 16,marginRight:10}} >

                ADD MORE TEST
              </Text>
          </TouchableOpacity>,
            //   header: () => null,
            title: 'CART',
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


        const url =  GLOBAL.BASE_URL  + 'list_cart'

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

      //          alert(JSON.stringify(responseJson))


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


    _saveDetails=()=> {
      this.props
      .navigation.replace('Labtest')


  //        Alert.alert('clicked save');

    }

    componentDidMount(){
        this.props.navigation.setParams({ handleSave: this._saveDetails });
        var a = "";

        if (GLOBAL.lab.discount_price  == "0.00"){
            a = GLOBAL.lab.sell_price
        }else{
            a = GLOBAL.lab.discount_price
        }
        this.setState({myprice:a})
        //

        this.props.navigation.addListener('willFocus',this._handleStateChange);

        //   this._handlePressLogin()
    }


    login = () => {
        GLOBAL.price = this.state.prices
        GLOBAL.type = "8"

    this.props.navigation.navigate('LabCartDetail')


    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item,index) => {
    //    alert(JSON.stringify(item))
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
    //    alert(indexs)



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


    selectedFirstss =  (item) => {


        const url =  GLOBAL.BASE_URL  + 'delete_cart'



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
                "cart_id":item.cart_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//                alert(JSON.stringify(responseJson))


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


    _renderItems = ({item,index}) => {



        return (

            <Card style={{ flex: 1 ,margin:5,width:window.width - 10,marginTop: 10,marginBottom:10,borderRadius:10 ,borderBottomColor:'#e1e1e1',borderBottomWidth:1}}>

 {item.relation == '' && (
   <Text  style = {{color:'#1E1F20',fontSize:14,marginLeft:4,marginTop:4,fontFamily:GLOBAL.semi}}>
       {item.name}

   </Text>
 )}
 {item.relation != '' && (
   <Text  style = {{color:'#1E1F20',fontSize:14,marginLeft:4,marginTop:4,fontFamily:GLOBAL.semi}}>
       {item.name} ( {item.relation} )

   </Text>
 )}


                <Text  style = {{color:'#83878E',fontSize:12,marginLeft:4,marginTop:4,fontFamily:GLOBAL.semi}}>
                    {item.test_name}

                </Text>




                <View style = {{marginLeft:5,flexDirection:'row',width:'100%',marginBottom:10,marginTop:10}}>
                    {item.discount_price == "0.00" && (
                        <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,fontWeight:'bold',color :'#FF2D00', height:'auto',fontFamily:GLOBAL.regular}}>

                            ₹{item.sell_price} /-
                        </Text>
                    )}
                    {item.discount_price != "0.00" && (
                        <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,fontWeight:'bold',color :'#FF2D00', height:'auto',fontFamily:GLOBAL.regular,textDecorationLine: 'line-through',}}>

                            ₹{item.sell_price}/-
                        </Text>
                    )}
                    {item.discount_price != "0.00" && (
                        <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,fontWeight:'bold',color :'#000000', height:'auto',fontFamily:GLOBAL.regular}}>

                            ₹{item.discount_price}/-
                        </Text>
                    )}
                    {item.discount_price == "0.00" && (
                        <Text style={{marginLeft : 5,marginTop:1,fontWeight:'bold',fontSize : 14,color :'#000000', height:'auto',fontFamily:GLOBAL.regular}}>


                        </Text>
                    )}
                </View>

                <TouchableOpacity  style = {{
                    position: 'absolute', width: 14, right: 40, height: 14
                }}

                    onPress={() => this.selectedFirstss(item)
                }>
<Image style = {{resizeMode: 'contain',height: 14,width:14}}
       source={require('./delete.png')} />
                </TouchableOpacity>


            </Card>

        )
    }
    render() {
     //   alert(JSON.stringify(GLOBAL.lab))

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }

        if(this.state.results.length==0){
            return(
                <View style={styles.container}>
                  <Text style={{marginLeft : '35%',marginTop:'20%',fontSize : 14,color :'black', height:'auto',fontFamily:GLOBAL.regular,width :'60%',fontWeight:'bold'}}>
                  Empty cart!
                    </Text>


                </View>
            )
        }
        return (

                <View style={styles.container}>


                    <View style={{ marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                    <FlatList style= {{flexGrow:0,margin:8,height:window.height - 100}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />





                </View>
                <View style = {{position:'absolute',bottom:10,flexDirection:'row',width:window.width - 20,margin:10,borderColor:'#D90000',borderWidth:1,backgroundColor:'white',height:50}}>

                    <Text style={{marginLeft : '5%',marginTop:10,fontSize : 18,color :'#FF2D00', height:'auto',fontFamily:GLOBAL.semi,width :'60%',}}>

                        ₹{this.state.prices}/-
                    </Text>

                    <Button
                        style={{padding:4,fontSize: 14,marginTop:10,fontWeight:'bold', color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:100,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                       CHECKOUT
                    </Button>
                </View>



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
