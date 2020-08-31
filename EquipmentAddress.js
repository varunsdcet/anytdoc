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
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class EquipmentAddress extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            company: '',
            address:[],
            loading: false,
            visible: false,

            selected: false,
            data: [],
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
        }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'DELIVERY ADDRESS',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'white'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'white',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    call = ()=>{
          const url = GLOBAL.BASE_URL +  'get_profile'


          fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  user_id : GLOBAL.user_id,

              }),
          }).then((response) => response.json())
              .then((responseJson) => {


                  if (responseJson.status == true) {

                  this.setState({address:responseJson.user_details.get_default_address})
    GLOBAL.selectedAddress = responseJson.user_details.get_default_address

                }



              })
              .catch((error) => {
                  console.error(error);
              });
        }
    apicall() {
        const url = 'https://anytimedoc.in/android_ios_sc/api/master_prices'

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
                "type":'emergency',





            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {

                  //  GLOBAL.price = responseJson.price

                    // this.props.navigation.navigate("VideoCall", {
                    //     channelName: 'Picasoid',
                    //     onCancel: (message) => {
                    //         this.setState({
                    //             visible: true,
                    //             message
                    //         });
                    //

                    //
                    //     }
                    // });
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
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
    _handleStateChange = (state) => {
        this.apicall()
        this.setState({address :GLOBAL.selectedAddress})

    }

    componentDidMount(){
      this.call()
        this.props.navigation.addListener('willFocus',this._handleStateChange);


        let startDate = moment();
        for (let i=0; i<700; i++) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.dateNameStyle,
                dateNumberStyle: styles.dateNumberStyle,

                // Random color...
                dateContainerStyle: {shadowOpacity: 1.0,
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
            });
        }
        //   this._handlePressLogin()
    }
    _handlePress() {
        console.log('Pressed!');

        if (this.state.mobile == ""){
            alert(stringsoflanguages.mobile + stringsoflanguages.please)
        }else if (this.state.company == ""){
            alert(stringsoflanguages.password + stringsoflanguages.please)
        }else{
            this.showLoading()
            var self=this;

            var url = GLOBAL.BASE_URL + 'login';


            alert(url)

            axios.post(url, {
                mobile: this.state.phone,
                password: this.state.company,
                divice_token:"11111"
            })
                .then(function (response) {

                    self.myCallbackFunctions(response.data)


                    //    self.myCallbackFunction.bind()

                    //   this.myCallbackFunction()


                })
                .catch(function (error) {
                    console.log(error);
                    //  self.myCallbackFunction()

                });

        }

        // this.props.navigation.navigate('Otp')
    }

    login = () => {

        this.props.navigation.navigate('Payment')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
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


            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                {item.selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: 'white'
                    }}>

                        <Text style={{color:'#707070',fontSize:13}}>
                            AM
                        </Text>

                        <Text style={{color:'#707070',fontSize:16}}>
                            {item.days}
                        </Text>


                    </View>

                )}

                {item.selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>

                        <Text style={{color:'white',fontSize:13}}>
                            DAY
                        </Text>

                        <Text style={{color:'white',fontSize:16}}>
                            {item.days}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
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
                    <KeyboardAwareScrollView>




                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListAddress')
                    }>




                         <Card style={{padding: 10, margin: 10,flexDirection:'row',width:window.width - 20,marginTop:20,borderRadius:12}}>
                        <Text style={{marginLeft : 10,marginTop:7,fontSize : 18,
                            color :'#D90000', height:'auto',
                        fontFamily:GLOBAL.semi,width :window.width - 80,fontWeight:'bold'}}>
                            Select Address
                        </Text>

                        <Image style={{marginLeft:-20, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                        source={require('./arrowlogo.png')}/>
                        </Card>
                    </TouchableOpacity>


                    <Card style={{ flex: 1 ,marginLeft : 10,width:window.width - 20, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                            <Text style={{marginLeft : 5,fontSize : 16,color :'black',fontFamily:GLOBAL.semi,width :'80%',marginTop:15,fontWeight:'bold'}}>

                                Address:   {this.state.address.address}
                            </Text>

                            <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:GLOBAL.semi,width :window.width - 20,fontWeight:'bold',marginTop:8}}>

                                Area:   {this.state.address.area}
                            </Text>

                            <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:GLOBAL.semi,width :'80%',fontWeight:'bold',marginBottom:15,marginTop:8}}>

                                State:   {this.state.address.city_state}
                            </Text>






                    </Card>



                        <Button
                            style={{padding:7,marginTop:20,marginBottom:20,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            Proceed to Payment
                        </Button>





                    </KeyboardAwareScrollView>



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
        fontFamily:GLOBAL.regular,


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
    input: {
        height : 45,
        borderWidth:1,
        borderColor:'#e6e7f0',
        borderRadius:4,
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily:GLOBAL.semi,
        fontSize:18,
        marginTop:20,


        width:'100%'
    },
})
