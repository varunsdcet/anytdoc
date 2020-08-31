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
const window = Dimensions.get('window');
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';
type Props = {};
import moment from 'moment';
const GLOBAL = require('./Global');
let customDatesStyles = [];
var currentDate= moment()
import { TextField } from 'react-native-material-textfield';
//alert(currentDate)
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NurseTime extends Component {
    constructor () {
        super()
        this.state = {
        name: '',
        email: '',
        phone: '',
        company: '',
        loading: false,
        visible: false,
            address :[],

        selected: false,
        data: [],
        images: [
            {
                days :'1',
                selected:'',
            },
            {
                days :'2',
                selected:'',
            },
            {
                days :'3',
                selected:'',
            },
            {
                days :'4',
                selected:'',
            },
            {
                days :'5',
                selected:'',
            },
            {
                days :'6',
                selected:'',
            },
            {
                days :'7',
                selected:'',
            },
        ]
    }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'NURSE SERVICE',
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


    _handleStateChange = ()=>{
      var s = moment().format('YYYY-MM-DD')
      GLOBAL.date = s
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

    }


login = () => {
        GLOBAL.time = this.state.phone

        if(GLOBAL.date==''){
            alert('Please select date.')
            return
        }
        if(this.state.phone ==''){
            alert('Please select time.')
            return
        }
        if(GLOBAL.selectedAddress.length==0){
            alert('Please select atleast one address')
            return
        }

        var price = 0;
        for (var i = 0; i<GLOBAL.nurseArray.length ; i ++ ){
            if (GLOBAL.nurseArray[i].selected == 'Y') {
                price = price + parseInt(GLOBAL.nurseArray[i].price)
                GLOBAL.serviceid = GLOBAL.nurseArray[i].id
            }

        }
        var s = price * parseInt(GLOBAL.time)
        GLOBAL.price = s.toString()
        this.props.navigation.navigate('Payment')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    call = ()=>{
      const url = GLOBAL.BASE_URL +  'get_profile'


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

    selectDate=(date)=>{
//        alert(date)
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
  //          this.calculateDay(s)
        this.setState({selectedDate: date})

    }
    selectedFirst = (indexs,item) => {
        var a = this.state.images
        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }
        var index = a[indexs]
        if (index.selected == ""){
            index.selected = "Y"
            GLOBAL.time = item.days
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


            <TouchableOpacity onPress={() => this.selectedFirst(index,item)
            }>

                {item.selected == '' && (
                <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: 'white'
                }}>

                    <Text style={{color:'#707070',fontSize:13}}>
                        DAY
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
            <SafeAreaView>
                <View style={styles.container}>

<KeyboardAwareScrollView>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 14,color :'#83878E', height:'auto',fontFamily:GLOBAL.semi,width :window.width - 80,marginLeft:12}}>

                        Select Date
                    </Text>

                    <CalendarStrip

                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#D90000'}}
                        style={{height:120, paddingTop: 15}}
                        calendarHeaderStyle={{color: 'black'}}
                        calendarColor={'white'}
                        highlightDateNameStyle={{color:'white'}}
                        highlightDateNumberStyle  ={{color:'white'}}

                        iconContainer={{flex: 0.1}}
                        onDateSelected={(date)=> this.selectDate(date)}
                    />

                    <Text style={{marginLeft : 12,marginTop:10,fontSize : 16,color :'#83878E', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80,fontWeight:'bold'}}>

                        Enter Number of Days
                    </Text>


<View style = {{marginLeft:20,width:window.width - 40}}>
 <TextField
        label= 'Enter No. of Day'
        value={phone}
        keyboardType={'numeric'}
        onChangeText={ (phone) => this.setState({ phone }) }
        tintColor = {'#D90000'}
    />
    </View>





                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListAddress')
                    }>




                         <Card style={{padding: 10, margin: 10,flexDirection:'row',width:window.width - 20,marginTop:20}}>
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
                        style={{padding:12,marginTop:23,fontSize: 18, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                    PROCEED
                    </Button>







</KeyboardAwareScrollView>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white',
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


})
