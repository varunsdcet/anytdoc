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
    ScrollView,
    AsyncStorage
} from 'react-native';
import Loader from './Loader.js';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class OpdHealth extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        results:[],
        ishave :false,

        selected:false,
        data:[],
        images :[

        ]

    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'OPD HEALTH PLANS',
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
        const url = GLOBAL.BASE_URL +  'opd_health_plans_sd'

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
                    this.setState({results:responseJson.packag_list})
                    this.setState({ishave:responseJson.is_have})



                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }


    logins2 = (props,item,price) => {

  GLOBAL.addid = props.id

        var a = this.state.results
  var b = "0";
        for (var i = 0; i < a.length;i++){
            if (a[i].is_active == 1){
                b = a[i].id
            }

        }




           GLOBAL.price = price
        var commonHtml = `${GLOBAL.user_id}|package_addon|${item.id}|${b}|${GLOBAL.addid.toString()}|${price}`;
        console.log(commonHtml)
         GLOBAL.mytypes = commonHtml
         GLOBAL.bookingtype = "package"
         GLOBAL.ytr = "1"
         this.props.navigation.navigate('Payment')
    }
    logins = (props,item,price) => {

GLOBAL.addid = props.id

        var a = this.state.results
  var b = "0";
        for (var i = 0; i < a.length;i++){
            if (a[i].is_active == 1){
                b = a[i].id
            }

        }




           GLOBAL.price = price
        var commonHtml = `${GLOBAL.user_id}|package|${item.id}|${b}|${GLOBAL.addid.toString()}|${price}`;
        console.log(commonHtml)
         GLOBAL.mytypes = commonHtml
         GLOBAL.bookingtype = "package"
          GLOBAL.ytr = ""
         this.props.navigation.navigate('Payment')
    }

    logins1 = (props,item,price,ui) => {

GLOBAL.addid = props.id

        var a = this.state.results
  var b = "0";
        for (var i = 0; i < a.length;i++){
            if (a[i].is_active == 1){
                b = a[i].id
            }

        }




           GLOBAL.price = price
        var commonHtml = `${GLOBAL.user_id}|package|${item.id}|${b}|${GLOBAL.addid.toString()}|${ui}`;
        console.log(commonHtml)
         GLOBAL.mytypes = commonHtml
         GLOBAL.bookingtype = "package"
          GLOBAL.ytr = ""
         this.props.navigation.navigate('Payment')
    }
    login = (item) => {

GLOBAL.addid = "0"
        var a = this.state.results
  var b = "0";
        for (var i = 0; i < a.length;i++){
            if (a[i].is_active == 1 || a[i].is_active == 2){
                b = a[i].id
            }

        }


if (item.id == b){
  b = "0"

}

         if (item.discount_price == "0.00"){
             GLOBAL.price = item.base_price
         }else{
             GLOBAL.price = item.discount_price
         }
        var commonHtml = `${GLOBAL.user_id}|package|${item.id}|${b}|0|0`;
         GLOBAL.mytypes = commonHtml
         GLOBAL.bookingtype = "package"
         console.log(commonHtml)
          GLOBAL.ytr = ""
         this.props.navigation.navigate('Payment')
    }


    selectedFirst = (indexs) => {
        this.props.navigation.navigate('MedicalServiceBooking')
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
      var a = '';

  if (item.discount_price == "0.00" ){
    a = item.base_price
  }
  if (item.discount_price != "0.00" ){
    a = item.discount_price
  }

        return (


                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-around',marginTop: 10,marginBottom:10,borderRadius:6}}>

                    <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,color :'#132439', height:'auto',fontFamily:GLOBAL.semi,width :window.width - 80,fontWeight:'bold'}}>

                        {item.package_name}
                    </Text>

                    <Text style={{marginLeft : 5,marginTop:2,fontSize : 12,color :'rgba(0,0,0,0.6)', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 40}}>

                      {item.description}
                    </Text>
                    <Text style={{marginLeft : 5,marginTop:2,fontSize : 12,color :'rgba(0,0,0,0.6)', height:'auto',fontFamily:GLOBAL.regular,width :window.width - 40}}>

                     Valid Upto {item.duration} - {item.duration_type}
                    </Text>


                    <View style = {{flexDirection:'row',width:'100%',justifyContent :'space-between'}}>
     <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,fontWeight:'bold',color :'#FF2D00', height:'auto',fontFamily:GLOBAL.regular}}>

                    Price: ₹{a}/-
                    </Text>


                        {this.state.ishave == 0 && item.type == "package" && item.is_active == 0 &&(

                        <Button
                            style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginRight:20,width:60,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login(item)}>
                            BUY
                        </Button>
                        )}
                        {this.state.ishave == 1 && item.type == "package" && item.is_active == 0 &&  (

                            <Button
                                style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginRight:20,width:'auto',height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this.login(item)}>
                                UPGRADE
                            </Button>
                        )}



                        {this.state.ishave == 0 && item.is_active == 2 && (

                            <Button
                                style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginRight:20,width:'auto',height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this.login(item)}>

                                BUY(Expired)
                            </Button>
                        )}

                    </View>
<ScrollView
horizontal = {true}>
<View style = {{flexDirection:'row',margin:10,width:window.width/2.5}}>
                    {item.added_on_list.map((props, key) => {
                      var s = ''
                      if (props.dis_price == "0.00"){
                        s =  props.price
                      }
                      if (props.dis_price != "0.00"){
                          s =  props.dis_price
                      }
                      var d = parseInt(s) +  parseInt(a)
                      var e = d.toString()

       return (
         <View>
{this.state.ishave == 0 && (
         <View  style = {{backgroundColor:'#e1e1e1',width:window.width/2.5,margin:10}}>
             <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,color :'black', height:'auto',fontFamily:GLOBAL.semi,width :'90%'}}>
                 {props.add_on_title}

             </Text>
             <Text style={{marginLeft : 5,marginTop:2,fontSize : 12,color :'rgba(0,0,0,0.6)', height:'auto',fontFamily:GLOBAL.regular,width :'90%'}}>

               {props.benifits}
             </Text>
             <Text style={{marginLeft : 5,marginTop:5,fontSize : 12,color :'black', height:'auto',fontFamily:GLOBAL.regular,width :'90%'}}>
              Valid Upto {props.duration} - {props.duration_type}

             </Text>
             <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,color :'#FF2D00', height:'auto',fontFamily:GLOBAL.regular,width :'90%',}}>

               Price : {s}
             </Text>

             <View style = {{flexDirection:'column',justifyContent:'space-between',width:'100%'}}>

             <Text style={{marginLeft : 5,marginTop:5,fontSize : 12,color :'#D90000', height:'auto',fontFamily:GLOBAL.regular,width:'90%'}}>

               Total Amount Payable : {e}
             </Text>
{item.is_active == 2 && (
  <Button
      style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginLeft:40,width:70,marginBottom:10,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
      styleDisabled={{color: 'red'}}
        onPress={() => this.logins1(props,item,e,s)}>
      BUY
  </Button>
)}

{item.is_active == 0 && (
  <Button
      style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginLeft:40,width:70,marginBottom:10,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
      styleDisabled={{color: 'red'}}
    onPress={() => this.logins1(props,item,e,s)}>
      BUY
  </Button>
)}

{item.is_active == 1 && (
  <Button
      style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginLeft:40,width:70,marginBottom:10,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
      styleDisabled={{color: 'red'}}
        onPress={() => this.logins1(props,item,e,s)}>
      BUY
  </Button>
)}




             </View>
         </View>
       )}

       {this.state.ishave == 1 && item.is_active == 0 &&  props.is_purchase == 0 && (
                <View  style = {{backgroundColor:'#e1e1e1',width:window.width/2.5,margin:10}}>
                    <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,color :'black', height:'auto',fontFamily:GLOBAL.semi,width :'90%'}}>
                        {props.add_on_title}

                    </Text>
                    <Text style={{marginLeft : 5,marginTop:2,fontSize : 12,color :'rgba(0,0,0,0.6)', height:'auto',fontFamily:GLOBAL.regular,width :'90%'}}>

                      {props.benifits}
                    </Text>
                    <Text style={{marginLeft : 5,marginTop:5,fontSize : 12,color :'black', height:'auto',fontFamily:GLOBAL.regular,width :'90%'}}>
                     Valid Upto {props.duration} - {props.duration_type}

                    </Text>
                    <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,color :'#FF2D00', height:'auto',fontFamily:GLOBAL.regular,width :'90%',}}>

                      Price : {s}
                    </Text>

                    <View style = {{flexDirection:'column',justifyContent:'space-between',width:'100%'}}>

                    <Text style={{marginLeft : 5,marginTop:5,fontSize : 12,color :'#D90000', height:'auto',fontFamily:GLOBAL.regular,width:'90%'}}>

                      Total Amount Payable : {e}
                    </Text>
       { props.is_purchase == 0 && (
                    <Button
                        style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginLeft:40,width:70,marginBottom:10,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.logins1(props,item,e,s)}>
                        BUY
                    </Button>
                    )}

                    {props.is_purchase == 1 && (
                                 <Button
                                     style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginLeft:40,width:70,marginBottom:10,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                                     styleDisabled={{color: 'red'}}
                                     >
                                     ACTIVE
                                 </Button>
                                 )}



                    </View>
                </View>
              )}

              {this.state.ishave == 1 && item.is_active == 1 && (
                       <View  style = {{backgroundColor:'#e1e1e1',width:window.width/2.5,margin:10}}>
                           <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,color :'black', height:'auto',fontFamily:GLOBAL.semi,width :'90%'}}>
                               {props.add_on_title}

                           </Text>
                           <Text style={{marginLeft : 5,marginTop:2,fontSize : 12,color :'rgba(0,0,0,0.6)', height:'auto',fontFamily:GLOBAL.regular,width :'90%'}}>

                             {props.benifits}
                           </Text>
                           <Text style={{marginLeft : 5,marginTop:5,fontSize : 12,color :'black', height:'auto',fontFamily:GLOBAL.regular,width :'90%'}}>
                            Valid Upto {props.duration} - {props.duration_type}

                           </Text>
                           <Text style={{marginLeft : 5,marginTop:5,fontSize : 14,color :'#FF2D00', height:'auto',fontFamily:GLOBAL.regular,width :'90%',}}>

                             Price : {s}
                           </Text>

                           <View style = {{flexDirection:'column',justifyContent:'space-between',width:'100%'}}>

                           <Text style={{marginLeft : 5,marginTop:5,fontSize : 12,color :'#D90000', height:'auto',fontFamily:GLOBAL.regular,width:'90%'}}>

                             Total Amount Payable : {s}
                           </Text>
              { props.is_purchase == 0 && (
                           <Button
                               style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginLeft:40,width:70,marginBottom:10,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                               styleDisabled={{color: 'red'}}
                               onPress={() => this.logins2(props,item,s)}>
                               BUY
                           </Button>
                           )}

                           {props.is_purchase == 1 && (
                                        <Button
                                            style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#D90000',marginLeft:40,width:70,marginBottom:10,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                                            styleDisabled={{color: 'red'}}
                                            >
                                            ACTIVE
                                        </Button>
                                        )}



                           </View>
                       </View>
                     )}




       </View>
       );
    })}
</View>
</ScrollView>





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
        color : '#D90000',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#D90000',
        textDecorationLine: 'underline',



    } ,
})
