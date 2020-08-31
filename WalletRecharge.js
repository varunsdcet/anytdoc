import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    TextInput,

    ImageBackground, Image, Dimensions,
} from 'react-native';

import RazorpayCheckout from 'react-native-razorpay';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Swipers from 'react-native-swiper';
const GLOBAL = require('./Global');
const styles = StyleSheet.create({
    wrapper: {
    },
    AndroidSafeArea: {
        flex: 0,
        backgroundColor: "#639ced",
        paddingTop: Platform.OS === "android" ? 0 : 0
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
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
    }
})

export default class WalletRecharge extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        password:'',
        time : [
        {
          data : '200',
          selected :'',
        },
        {
          data : '500',
          selected :'',
        },
        {
          data : '1000',
          selected :'',
        },
        {
          data : '2000',
          selected :'',
        },
        {
          data : '5000',
          selected :'',
        },
        {
          data : '10000',
          selected :'',
        },


      ],

    };
    static navigationOptions = ({ navigation }) => {
    return {
        //   header: () => null,
        title: 'Wallet Recharge',
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
    cat = () => {
        GLOBAL.matchid = "live13"
        this.props.navigation.navigate('MyChat')
    }

    cats = () => {
        this.props.navigation.navigate("VideoCall", {
            channelName: GLOBAL.bookingid,
            onCancel: (message) => {
                this.setState({
                    visible: true,
                    mesxsage
                });
            }
        })
    }


hive = (item,index) => {

   for (var i = 0; i < this.state.time.length; i++ ){
     var a = this.state.time[i]
     if (a.selected == 'Y'){
       a.selected  = ''
       this.state.time[i] = a
       this.setState({time:this.state.time})
     }
   }

  var a  = this.state.time[index]



  if (item.selected == ''){
     a.selected = 'Y'
     this.state.time[index] = a


   this.setState({password:a.data})
  }else {
     a.selected = ''
        this.state.time[index] = a
  }
  this.setState({time:  this.state.time})

}

    renderRowItem2 = (itemData) => {

        return (

            <View style = {{margin:12,marginTop:7}}>

{itemData.item.selected == '' && (
  <Button
      style={{marginLeft:2,paddingTop: 8 ,backgroundColor:'white',fontSize: 20, color: '#d3d9e4',fontFamily:GLOBAL.medium,marginTop:2,height:40,width:window.width/4,borderRadius:4,borderWidth:1,borderColor:'#d3d9e4'}}
      styleDisabled={{color: 'red'}}
      onPress={() => this.hive(itemData.item,itemData.index)}>
      ₹  {itemData.item.data}
  </Button>
)}
{itemData.item.selected != '' && (
  <Button
      style={{marginLeft:2,paddingTop: 8 ,backgroundColor:'#fcebbf',fontSize: 20, color: 'black',fontFamily:GLOBAL.medium,marginTop:2,height:40,width:window.width/4,borderRadius:4,borderWidth:1,borderColor:'#d3d9e4'}}
      styleDisabled={{color: 'red'}}
    onPress={() => this.hive(itemData.item,itemData.index)}>
      ₹  {itemData.item.data}
  </Button>
)}


            </View>

        )
    }
    componentDidMount(){

    }
    _handlePress = () =>{
      if (this.state.password == ''){
        alert('Please enter Amount')
      }else{
      //  this.props.navigation.navigate('Payment',this.state.password)
      }
    }

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    capture = (a,s) =>{
   //https://rzp_test_26ccbdbfe0e84b:69b2e24411e384f91213f22a@api.razorpay.com/v1/payments/pay_29QQoUBi66xm2f/capture
   //        alert(a)
           var commonHtml = `https://rzp_test_CDbzQjcE3QD5L3:ipNPnUwhDwPkIjNfyngYOzju@api.razorpay.com/v1/payments/${a}/capture`;



           fetch(commonHtml, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   amount: s.toString(),



               }),
           }).then((response) => response.json())
               .then((responseJson) => {
                   this.props.navigation.navigate('Thankyou')

               })
               .catch((error) => {
                   alert(error);
                   this.hideLoading();
                   alert('Unable to process your request Please try again after some time')

               });


       }

    pay = ()=>{

           if (this.state.password == "" ){
               alert('Please add Some Amount')
           }else{
               var b = parseInt(this.state.password) * 100
           var ss =`${GLOBAL.user_id}|add_wallet`;
               var options = {
                   description: ss,
                   image: require('./logo.png'),
                   currency: 'INR',
                   key: 'rzp_live_P4iqckoSRdday1',
                   amount:b,

                   name: GLOBAL.myname,
                   prefill: {
                       email: GLOBAL.myemail,
                       contact: GLOBAL.mymobile,
                       name: GLOBAL.myname
                   },
                   theme: {color: '#F37254'}
               }

               RazorpayCheckout.open(options).then((data) => {

                   var a = data.razorpay_payment_id
                   this.capture(a,b);



               }).catch((error) => {
                // alert(JSON.stringify(error))
                   // handle failure
                   // this.myPayments(s,error.description,'')

               });

           }
       }


    render(){
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <StatusBar backgroundColor="#639ced" barStyle="light-content" />



                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >

                    <View style = {{width:window.width - 20 ,alignSelf:'center',backgroundColor:'#ced4e2',height:120,borderRadius:12,marginTop:20}}>



                        <Text style = {{color:'white',fontSize:12,fontFamily:GLOBAL.roman,margin:18}}>
                            Add Balance to your


                        </Text>



                        <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style = {{color:'white',fontSize:24,fontFamily:GLOBAL.heavy,margin:18,marginTop:-10}}>
                                Anytimedoc  Wallet


                            </Text>

                            <Image
                                source={require('./walletee.png')}
                                style={{width: 50, height: 50,marginRight:20,marginTop:-10,resizeMode:'contain'}}


                            />

                        </View>

                        <Text style = {{color:'white',fontSize:15,fontFamily:GLOBAL.roman,margin:18,marginTop:-8}}>
                            Available Balance ₹ {this.props.navigation.state.params}


                        </Text>

                    </View>

                    <View style = {{width: window.width - 30,alignSelf:'center',marginTop:27,borderRadius:3,borderWidth:1,borderColor:'grey'}}>
                    <TextInput style = {{marginLeft:8,height:40}}
                        placeholder='Enter Amount'
                        baseColor = '#acb1c0'
                        tintColor = '#acb1c0'
                        onChangeText={(text) => this.setState({password:text})}
                        value = {this.state.password}

                        onSubmitEditing={this.onSubmit}
                        ref={this.fieldRef}
                    />


                    </View>





                    <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 10,marginBottom:10}}
                              data={this.state.time}
                              numColumns={3}
                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem2}
                              extraData={this.state}
                    />




                    <Button
                        style={{marginLeft:28,paddingTop: 18 ,fontSize: 14,backgroundColor:'#D90000', color: 'white',fontFamily:GLOBAL.medium,marginTop:30,height:50,width:window.width - 56,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.pay()}>
                        PROCEED
                    </Button>
                </KeyboardAwareScrollView>

            </SafeAreaView>

        );
    }
}
