import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    TouchableHighlight,
    Linking,
    FlatList,
    Dimensions, Platform, AsyncStorage,


} from 'react-native';
import moment from 'moment';
import CalendarStrip from "react-native-calendar-strip";
import RadioForm from 'react-native-radio-form';
const GLOBAL = require('./Global');
import Loader from './Loader.js';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import HTML from 'react-native-render-html';
import DateTimePicker from '@react-native-community/datetimepicker';
;
let customDatesStyles = [];
import Carousel from 'react-native-banner-carousel';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 300;

class MedicalDetail extends React.Component {
    state = {
        date: new Date('2020-06-12T14:42:42'),
        mode: 'date',
        show: false,
        type:'',
        value: '',
        amount:'',
        counter:'0',
        forType:'',
        discount:'',
        radio_props: [
            {label: 'Week', value:1},
            {label: 'Month', value:1},

        ],
        banner:[],
    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            }>
            <View>

            <View style = {{backgroundColor:'orange',width:30,height:30,borderRadius:15}}>

            <Text style = {{color:'white',fontFamily:GLOBAL.semi,fontSize:22,textAlign:'center',marginTop:7,fontWeight:'bold'}}>
            {GLOBAL.counter}
            </Text>
            </View>
                <Image source={require('./remove.png')}
                       style={{ height:30,width:30,resizeMode:'contain',marginRight:10,marginTop:-10}} />

                       </View>
            </TouchableOpacity>,
               header: () => null,
            title: 'EQUIPMENT',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'#1E1F20'},
            headerStyle:{
                backgroundColor:'white',
            },



            headerTintColor :'#7BAAED',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight, resizeMode:'contain' }} source={{ uri: image }}/>
            </View>
        );
    }

    _saveDetails=()=> {
//        Alert.alert('clicked save');
        this.props.navigation.replace('EquipmentCart')
    }

    _handleStateChange = (state) =>{
      this.showLoading()
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
this.hideLoading()
              //    alert(JSON.stringify(responseJson))



              if (responseJson.status == true) {
  this.setState({counter:responseJson.count})
              }
          })
          .catch((error) => {
              console.error(error);
this.hideLoading()
          });
    }
componentDidMount(){
  //alert(JSON.stringify(GLOBAL.medicalEquipment))
      //  this.props.navigation.addListener('willFocus',this._handleStateChange);

var s = ""
  if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount == "0.00" ){
      s = GLOBAL.medicalEquipment.rent_price
        this.setState({discount:''})
  }

  if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount != "0.00" ){
      s = GLOBAL.medicalEquipment.rent_discount
         this.setState({discount:GLOBAL.medicalEquipment.rent_price})

  }

  if  (GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount == "0.00" ){
      s = GLOBAL.medicalEquipment.purchase_price
          this.setState({discount:''})

  }

  if  (GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount != "0.00" ){
      s = GLOBAL.medicalEquipment.purchase_discount
      this.setState({discount:GLOBAL.medicalEquipment.purchase_price})
  }

this.setState({amount:s})
    this.props.navigation.setParams({ handleSave: this._saveDetails });
//        alert(JSON.stringify(GLOBAL.medicalEquipment))
    let startDate = moment();
    for (let i=0; i<700; i++) {
        customDatesStyles.push({
            startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
            dateNameStyle: styles.dateNameStyle,
            dateNumberStyle: styles.dateNumberStyle,

            // Random color...
            dateContainerStyle: {shadowOpacity: 1.0,
                shadowRadius: 1,
                shadowColor: '#1E1F20',
                shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: 'white' },
        });
    }
    var date = new Date()
    var s = moment(date).format('YYYY-MM-DD')

    var my = [];
    {GLOBAL.medicalEquipment.gallery.map((message) =>
        my.push(GLOBAL.imagePath + message.image)

    )
    }
    this.setState({banner:my})
    this.setState({type:my.for_month_week})
    this.setState({forType:GLOBAL.medicalEquipment.for})
    if (GLOBAL.medicalEquipment.for != "Purchase"){
        if(GLOBAL.medicalEquipment.for_month_week == "3"){

        }
        else if (GLOBAL.medicalEquipment.for_month_week == "2"){
          this.setState({value:'Month'})

         var  radio_props = [
                {label: 'Month', value:1},


            ]
            this.setState({
                radio_props:radio_props
            })
            var s = ""
                    if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_month_discount_price == "0.00" ){
                        s = GLOBAL.medicalEquipment.rent_month_price
                            this.setState({discount:''})
                    }

                    if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_month_discount_price != "0.00" ){
                        s = GLOBAL.medicalEquipment.rent_month_discount_price
                          this.setState({discount:GLOBAL.medicalEquipment.rent_month_price})

                    }
                    this.setState({amount:s})


        }
        else if (GLOBAL.medicalEquipment.for_month_week == "1"){
              this.setState({value:'Week'})
            var  radio_props = [
                {label: 'Week', value:0},


            ]
            this.setState({
                radio_props:radio_props
            })

        }

    }
}







    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    login = (discounts) => {

        if (this.state.forType == "Rental"){
            var a = '';
             a = this.state.value;
             this.showLoading()

            const url = GLOBAL.BASE_URL + 'add_to_cart_equipment'

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
                    product_id: GLOBAL.medicalEquipment.id,
                    user_id: GLOBAL.user_id,
                    for: a,
                    equipment_type: 'Rental',
                    quantity: '1',
                    order_price: this.state.amount,
                    start_date: GLOBAL.date

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  //  alert(JSON.stringify(responseJson))

this.hideLoading()
                    if (responseJson.status == true) {
                        this.props.navigation.replace('EquipmentCart')
                        alert('Equipment added to Cart Successfully!')

                    } else {
                        alert('Kindly select service from same category')
                    }
                })
                .catch((error) => {
                  this.hideLoading()
                    console.error(error);
                });



    }else {

this.showLoading()
            const url = GLOBAL.BASE_URL + 'add_to_cart_equipment'

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
                    product_id: GLOBAL.medicalEquipment.id,
                    user_id: GLOBAL.user_id,
                    for: '',
                    equipment_type: 'Purchase',
                    quantity: '1',
                    order_price:  this.state.amount,
                    start_date: ''

                }),
            }).then((response) => response.json())
                .then((responseJson) => {

this.hideLoading()

                    if (responseJson.status == true) {
                        this.props.navigation.replace('EquipmentCart')

                    } else {
                        alert('Kindly select service from same category')
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
    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s

    }
    _onSelect = ( item ) => {

      if (item.label == "Month"){
        var s = ""

        if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_month_discount_price == "0.00" ){
            s = GLOBAL.medicalEquipment.rent_month_price
                      this.setState({discount:''})
        }

        if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_month_discount_price != "0.00" ){
            s = GLOBAL.medicalEquipment.rent_month_discount_price
          this.setState({discount:GLOBAL.medicalEquipment.rent_month_price})
        }


        this.setState({amount:s})
      }else{
        var s = ""
        if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount == "0.00" ){
            s = GLOBAL.medicalEquipment.rent_price
              this.setState({discount:''})
        }

        if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount != "0.00" ){
            s = GLOBAL.medicalEquipment.rent_discount
            this.setState({discount:GLOBAL.medicalEquipment.rent_price})

        }
            this.setState({amount:s})
      }
      this.setState({value:item.label})

  }

    render(){

        var disc = parseInt(GLOBAL.medicalEquipment.rent_price)
        var discp = parseInt(GLOBAL.medicalEquipment.rent_discount)
        var discount = disc - discp

        var discs = parseInt(GLOBAL.medicalEquipment.purchase_price)
        var discps = parseInt(GLOBAL.medicalEquipment.purchase_discount)
        var discounts = discs - discps
        var s= "";



        const mockData = [
            {
                label: 'label1',
                value: 'fi'
            },
            {
                label: 'label2',
                value: 'se'
            },
            {
                label: 'label3',
                value: 'th'
            }
        ];

        const { show, date, mode } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.containers}>
                    <Loader>
                    </Loader>
                </View>
            )
        }


        return(
          <SafeAreaView style={styles.AndroidSafeArea}>
                         <StatusBar backgroundColor="#639ced" barStyle="light-content" />

        <KeyboardAwareScrollView style = {{backgroundColor:'white',height:window.height -80}} keyboardShouldPersistTaps='always'>


                    <View style={{backgroundColor:'#D3D3D3',flexDirection:'column'}}>


                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}>
                            {this.state.banner.map((image, index) => this.renderPage(image, index))}
                        </Carousel>

                        <TouchableOpacity style = {{position:'absolute',left:20,top:17,height:40,width:40}}onPress={() => this.props.navigation.goBack()
                        }>
                        <Image source={require('./back.png')}
                               style={{ height:40,width:40,resizeMode:'contain'}} />

</TouchableOpacity>


                        <View style={{height:100,backgroundColor:'transparent',flexDirection:'column',elevation:2,position:'absolute',top:190,right:10}}>

                            <View style={{flexDirection:'row',marginLeft:25,alignItems:'center'}}>


                                <View style={{flexDirection:'column',marginLeft:12,marginTop:15}}>

                                    {GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount == "0.00" && (
                                        <Text style = {{fontSize:18,margin:1,marginLeft:1,fontFamily:GLOBAL.semi,color:'#1E1F20'}}>
                                            ₹ {GLOBAL.medicalEquipment.rent_price}

                                        </Text>

                                    ) }


                                    {GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount != "0.00" && (
                                        <Text style = {{fontSize:18,margin:1,marginLeft:1,fontFamily:GLOBAL.semi,color:'#1E1F20'}}>
                                            ₹ {GLOBAL.medicalEquipment.rent_discount}

                                        </Text>

                                    ) }



                                    {GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount == "0.00" && (
                                        <Text style = {{fontSize:18,margin:1,marginLeft:1,fontFamily:GLOBAL.semi,color:'#1E1F20'}}>
                                            ₹ {GLOBAL.medicalEquipment.purchase_price}

                                        </Text>

                                    ) }


                                    {GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount != "0.00" && (
                                        <Text style = {{fontSize:18,margin:1,marginLeft:1,fontFamily:GLOBAL.semi,color:'#1E1F20'}}>
                                            ₹ {GLOBAL.medicalEquipment.purchase_discount}

                                        </Text>

                                    ) }




                                </View>

                            </View>


                            {GLOBAL.rentPurchase=='Rental' && (
                                <View style={{flexDirection:'row',marginLeft:22,alignItems:'center'}}>


                                    <View style={{flexDirection:'column',marginLeft:18,marginTop:18}}>
                                        <Text style={{fontSize:13,fontFamily:GLOBAL.regular,color:'#989696'}}>Free shipping and setup by</Text>
                                        <Text style={{fontSize:14,fontFamily:GLOBAL.semi,color:'#000000'}}>{GLOBAL.shipTime} hours</Text>
                                    </View>

                                </View>


                            )}



                        </View>






                        <View style={{width:'100%',backgroundColor:'white',flexDirection:'column',elevation:2,borderTopLeftRadius:60,borderTopRightRadius:60}}>

 <View style = {{width:40,height:40,borderRadius:25,backgroundColor:'#D90000',flexDirection:'row',marginTop:-20,marginLeft:window.width - 70}}>
 <Image source={require('./cart.png')}
        style={{ height:25,width:25,resizeMode:'contain',marginTop:8,marginLeft:6}} />
          <Text style={{fontSize:12,fontFamily:GLOBAL.semi,color:'#1E1F20',marginLeft:-5,marginTop:4}}>{GLOBAL.counter}</Text>
 </View>


                                      <Text style={{fontSize:18,fontFamily:GLOBAL.semi,color:'#1E1F20',marginLeft:25,marginTop:25}}>{GLOBAL.medicalEquipment.name}</Text>
                            <Text style={{fontSize:19,fontWeight:'bold',fontFamily:GLOBAL.semi,color:'#1E1F20',marginLeft:25,marginTop:5}}>Product Description</Text>


                            <View style = {{margin:10, width:window.width - 20, backgroundColor:'white', flexDirection:'column'}}>
                                <HTML html={GLOBAL.medicalEquipment.description} imagesMaxWidth={Dimensions.get('window').width} />
                            </View>
                            {this.state.forType != "Purchase" &&  (
                                <View style = {{margin :5}}>
                                    <Text style={{fontSize:19,fontWeight:'bold',fontFamily:GLOBAL.semi,color:'#000000',marginLeft:15,marginTop:15}}>Booked For</Text>
                                    <RadioForm
               style={{ width: 350 - 30 }}
               dataSource={this.state.radio_props}
               itemShowKey="label"
               itemRealKey="value"
               circleSize={16}
               initial={0}
               formHorizontal={true}
               labelHorizontal={true}
               onPress={(item) => this._onSelect(item)}
           />
                                </View>
                            )}



                            {this.state.forType != "Purchase" && (
                            <CalendarStrip

                                calendarAnimation={{type: 'sequence', duration: 30}}
                                daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#80D8CF'}}
                                style={{height:120, paddingTop: 15}}
                                calendarHeaderStyle={{color: '#1E1F20'}}
                                calendarColor={'white'}
                                highlightDateNameStyle={{color:'white'}}
                                highlightDateNumberStyle  ={{color:'white'}}


                                customDatesStyles={customDatesStyles}
                                dateContainerStyle = {{shadowOpacity: 1.0,
                                    shadowRadius: 1,
                                    shadowColor: '#1E1F20',
                                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' }}

                                iconContainer={{flex: 0.1}}
                                onDateSelected={(date)=> this.dates(date)}
                            />

                            )}

                        </View>









                    </View>

            </KeyboardAwareScrollView>

                                    <View style={{flexDirection:'row',height:60,width:'92%',marginLeft:'4%',position:'absolute',bottom:0,left:0,right:0,backgroundColor:'white',alignItems:'center',elevation:2,borderWidth:1,borderColor:'#D90000'}}>


                                       <View style = {{flexDirection:'row',width:'60%',marginLeft:12}}>
                                       {this.state.discount != "" && (
                                         <View style = {{flexDirection:'row'}}>
                                              <Text style={{fontSize:14,fontFamily:GLOBAL.regular,color:'red',fontWeight:'bold',textDecorationLine: 'line-through'}}>₹{this.state.discount}</Text>
                                                 <Text style={{fontSize:14,fontFamily:GLOBAL.regular,color:'#000000',fontWeight:'bold',marginLeft:10}}>₹{this.state.amount}</Text>
                                                 </View>
                                       )}
                                       {this.state.discount == "" && (
                                                 <Text style={{fontSize:20,fontFamily:GLOBAL.regular,color:'#000000',fontWeight:'bold'}}>₹{this.state.amount}</Text>
                                       )}

                                      </View>
                                        {GLOBAL.medicalEquipment.add_in_cart_status == 1 && (
                                            <Button style={{fontSize:13,color:'white',fontFamily:GLOBAL.regular}}
                                                    onPress={() => this.props.navigation.replace('EquipmentCart')}
                                                    containerStyle={{height:30,width:105,borderRadius:6,elevation:1,justifyContent:'center',backgroundColor:'#D90000'}}>
                                                GO to cart

                                            </Button>
                                        )}
                                        {GLOBAL.medicalEquipment.add_in_cart_status == 0 && this.state.forType == "Purchase" && (
                                        <Button style={{fontSize:13,color:'white',fontFamily:GLOBAL.regular}}
                                                onPress={() => this.login(s)}
                                                containerStyle={{height:30,width:105,borderRadius:6,elevation:1,justifyContent:'center',backgroundColor:'#D90000'}}>
                                            Add to cart

                                        </Button>
                                        ) }

                                        {GLOBAL.medicalEquipment.add_in_cart_status == 0 && this.state.forType == "Rental" && (
                                            <Button style={{fontSize:13,color:'white',fontFamily:GLOBAL.regular}}
                                                    onPress={() => this.login(s)}
                                                    containerStyle={{height:30,width:105,borderRadius:6,elevation:1,justifyContent:'center',backgroundColor:'#D90000'}}>
                                                Add to cart

                                            </Button>
                                        ) }
                                    </View>
            </SafeAreaView>
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
    AndroidSafeArea: {
       flex: 0,
       backgroundColor: GLOBAL.COLOR.Header,
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
})
export default MedicalDetail;
