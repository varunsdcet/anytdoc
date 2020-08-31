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
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';
const GLOBAL = require('./Global');
let customDatesStyles = [];
import Loader from './Loader.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MedicalServiceBooking extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            company: '',
            problem:'',
            loading: false,
            visible: false,
            time:[],
            address :[],
            ismorning:false,
            isafternoon:false,
            isEvening:false,
            isNight:false,
            morning:[],
            evening:[],
            afternoon:[],
            night:[],

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
            title: 'BOOKING',
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

    calculateDay(date){
      this.showLoading()


        const url = GLOBAL.BASE_URL +  'common_time'

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

                "select_date":date,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
this.hideLoading()
               // alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.setState({time:responseJson.times})
                    this.setState({morning:responseJson.morning_slot})
                      this.setState({evening:responseJson.evening_slot})
                        this.setState({afternoon:responseJson.afternoon_slot})
                          this.setState({night:responseJson.night_slot})
                    this.apicall()
                }else{
                    this.setState({time:[]})
                    this.setState({morning:[]})
                      this.setState({evening:[]})
                        this.setState({afternoon:[]})
                          this.setState({night:[]})
                    GLOBAL.time=''
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

    apicall () {
      this.showLoading()
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
                "type":"planned_visit"





            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.hideLoading()
//                alert(JSON.stringify(responseJson))

                if (responseJson.status == true) {

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    _handleStateChange = (state) => {
        this.setState({address :GLOBAL.selectedAddress})

    }
    componentDidMount(){
      this.dates(moment())
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
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

        this.calculateDay(s)
        //   this._handlePressLogin()
    }


    selectedFirst = (indexs) => {
        var a = this.state.morning
        for (var i = 0;i<this.state.morning.length ;i ++){

            this.state.morning[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.morning[indexs] = index
        this.setState({morning:this.state.morning})
    }

    selectedFirsts = (indexs) => {
        var a = this.state.afternoon
        for (var i = 0;i<this.state.afternoon.length ;i ++){

            this.state.afternoon[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.afternoon[indexs] = index
        this.setState({afternoon:this.state.afternoon})
    }

    selectedFirstss = (indexs) => {
        var a = this.state.evening
        for (var i = 0;i<this.state.evening.length ;i ++){

            this.state.evening[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.evening[indexs] = index
        this.setState({evening:this.state.evening})
    }

    selectedFirstsss = (indexs) => {
        var a = this.state.night
        for (var i = 0;i<this.state.night.length ;i ++){

            this.state.night[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.night[indexs] = index
        this.setState({night:this.state.night})
    }



    _renderItemss = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirsts(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }
    _renderItems = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }
    _renderItemsss = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirstss(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }
    _renderItemssss = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirstsss(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:window.width/5,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:12,textAlign:'center', margin:5}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }
    showMorning = () =>{
      this.setState({ismorning:!this.state.ismorning})
            this.setState({isafternoon:false})
            this.setState({isEvening:false})
            this.setState({isNight:false})

    }




    showAfternoon= () =>{
      // this.setState({ismorning:false})
         this.setState({isafternoon:!this.state.isafternoon})
         this.setState({ismorning:false})
         this.setState({isEvening:false})
         this.setState({isNight:false})
      //     this.setState({isEvening:false})
      //       this.setState({isNight::false})
    }

    showEvening = () =>{
      // this.setState({ismorning:false})
      //   this.setState({isafternoon:false})
           this.setState({isEvening:!this.state.isEvening})
           this.setState({ismorning:false})
           this.setState({isafternoon:false})
           this.setState({isNight:false})
      //       this.setState({isNight::false})
    }

    showNight = () =>{
       this.setState({isNight:!this.state.isNight})
       this.setState({ismorning:false})
       this.setState({isafternoon:false})
       this.setState({isEvening:false})
      // this.setState({ismorning:false})
      //   this.setState({isafternoon:false})
      //     this.setState({isEvening:false})

    }
    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
        this.calculateDay(s)
    }

    pay = ()=>{
                if(GLOBAL.date==''){
            alert('Please select date.')
            return
        }
        if(GLOBAL.time ==''){
            alert('Please select time.')
            return
        }
        if(GLOBAL.selectedAddress.length==0){
            alert('Please select atleast one address')
            return
        }

        GLOBAL.problem = this.state.problem

        this.props.navigation.navigate('Payment')
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
  //
            }



          })
          .catch((error) => {
              console.error(error);
          });
    }
    render() {

        let { username } = this.state;
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        let { problem } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <Loader>
                    </Loader>
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>



                        <Text style={{marginLeft : 5,marginTop:10,fontSize : 14,fontWeight:'bold',color :'#707070', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

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
                            onDateSelected={(date)=> this.dates(date)}
                        />

                        {this.state.morning.length != 0 && (
                          <View style = {{marginTop:10}}>
                          <TouchableOpacity onPress={() => this.showMorning()
                          }>
                          <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                          <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                          source={require('./sun.png')}/>
                          <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                              Select Morning Slot
                          </Text>

                          </View>
                          </TouchableOpacity>

                        {this.state.ismorning == true && (
                          <FlatList style= {{flexGrow:0,margin:8}}
                                    data={this.state.morning}
                                    numColumns={4}

                                    keyExtractor = { (item, index) => index.toString() }
                                    renderItem={this._renderItems}
                          />
                        )}

                          </View>

                        )}



                        {this.state.afternoon.length != 0 && (
                          <View style = {{marginTop:10}}>
                          <TouchableOpacity onPress={() => this.showAfternoon()
                          }>
                          <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                          <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                          source={require('./sun.png')}/>
                          <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                              Select Afternoon Slot
                          </Text>

                          </View>
                          </TouchableOpacity>

                        {this.state.isafternoon == true && (
                          <FlatList style= {{flexGrow:0,margin:8}}
                                    data={this.state.afternoon}
                                    numColumns={4}

                                    keyExtractor = { (item, index) => index.toString() }
                                    renderItem={this._renderItemss}
                          />
                        )}

                          </View>

                        )}

                        {this.state.evening.length != 0 && (
                          <View style = {{marginTop:10}}>
                          <TouchableOpacity onPress={() => this.showEvening()
                          }>
                          <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                          <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                          source={require('./moon.png')}/>
                          <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                              Select Evening Slot
                          </Text>

                          </View>
                          </TouchableOpacity>

                        {this.state.isEvening == true && (
                          <FlatList style= {{flexGrow:0,margin:8}}
                                    data={this.state.evening}
                                    numColumns={4}

                                    keyExtractor = { (item, index) => index.toString() }
                                    renderItem={this._renderItemsss}
                          />
                        )}

                          </View>

                        )}


                        {this.state.night.length != 0 && (
                          <View style = {{marginTop:10}}>
                          <TouchableOpacity onPress={() => this.showNight()
                          }>
                          <View style = {{flexDirection:'row',backgroundColor:'white'}}>

                          <Image style={{marginLeft:10, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                          source={require('./moon.png')}/>
                          <Text style={{marginLeft : 12,marginTop:7,fontSize : 16,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                              Select Night Slot
                          </Text>

                          </View>
                          </TouchableOpacity>

                        {this.state.isNight == true && (
                          <FlatList style= {{flexGrow:0,margin:8}}
                                    data={this.state.night}
                                    numColumns={4}

                                    keyExtractor = { (item, index) => index.toString() }
                                    renderItem={this._renderItemssss}
                          />
                        )}

                          </View>

                        )}

                        <Text style={{marginLeft : 5,marginTop:10,fontSize : 14, fontWeight:'bold',color :'#000000', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 80}}>

                            Problem
                        </Text>
                        <View style = {{marginLeft:5,width:window.width - 10}}>


                                                          <View style = {{marginTop:10,width:'100%',height:125,borderColor:'#F0F0F0',borderWidth:1,borderRadius:8,flexDirection:'row'}}>

                                                            <TextInput
                                                            style={{height: 120,width:'90%',margin:2,marginLeft:8,backgroundColor:'white'}}
                                                            placeholder ={'Write a Problem'}
                                                             multiline={true}

                                                            textAlignVertical={'top'}
                                                            placeholderTextColor = {'#1E1F20'}
                                                            placeholderStyle = {{marginLeft:50}}
                                                            onChangeText={text => this.setState({problem:text})}

                                                                                              value = {this.state.problem}

                                                            />


                                                            </View>

                        </View>
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
                            onPress={() => this.pay()}>
                              Proceed to Payment
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

    },

})
