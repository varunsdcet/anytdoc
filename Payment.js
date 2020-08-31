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
    Linking,
    FlatList,
    Dimensions,



} from 'react-native';
import Loader from './Loader.js';


const window = Dimensions.get('window')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import RazorpayCheckout from 'react-native-razorpay';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


class Payment extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            promo :'',
            finalPrice:GLOBAL.price,
            calPrice:'0',
            isChecked:false,
            value: 0,
            debit:false,
            walletrs:'',
            referralrs:'',
            finalref:'',
            promoid:'',
            ok :false,
            finalwal:'',
            wallet:false,
            loading:false,
            refer:false,
            radio_props: [
                {label: 'Debit/Credit Card/Netbanking ', value:0},
                {label: 'Wallet Balance ', value:1},
            ],
            radio_propss: [
                {label: 'Referral Balance ', value:3},
            ],values:-1


        }

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'PAYMENT',
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

    verify = () => {

        var coupon  = ""
       if (GLOBAL.type == "100"){
           coupon = "2"
       }  else if (GLOBAL.type == "1"){
            coupon = "3"
        }
        else if (GLOBAL.type == "2"){
            coupon = "4"
        }
        else if (GLOBAL.type == "3"){
            coupon = "5"
        }
        else if (GLOBAL.type == "8"){
            coupon = "10"
        }
        else if (GLOBAL.type == "13"){
            coupon = "11"
        }
        else if (GLOBAL.type == "8"){
            coupon = "12"
        }
        else if (GLOBAL.type == "5"){
            coupon = "8"
        }
        else if (GLOBAL.type == "4"){
            coupon = "6"
        }

       else{
           coupon = GLOBAL.type
       }


        if(this.state.promo == ''){
            alert("Please input promo code.")
        }else{
          this.showLoading()
            const url =  GLOBAL.BASE_URL +'coupan_verify'

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
                    "module":coupon,
                    "coupan_code":this.state.promo,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {

this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({ok:true})





                        this.setState({promoid:responseJson.coupan_id})
                        alert('Promocode applied successfully!')
                      if (responseJson.discount_type == "percentage"){
                          var perce = responseJson.condition
                          var cal = parseInt(this.state.finalPrice) - ((GLOBAL.price  * perce) /100)
                          var d =   (GLOBAL.price  * perce) /100

                         var f = parseInt(this.state.finalwal)
                        var g = parseInt(this.state.finalref)



 if (cal <= 0){
     this.setState({finalPrice : 0})
 }else{
     this.setState({finalPrice : cal})
 }

                          this.setState({calPrice : d})
                          if (this.state.wallet == false){
                                 this.setState({finalwal :"0"})
                          }
                          if (this.state.refer == false){
                                 this.setState({finalref :"0"})
                          }

                          if (this.state.isChecked == false){

                          }

                          // this.setState({finalwal :"0"})
                          // this.setState({finalref :b})
                          //
                          // this.setState({finalPrice:s})


                      }else{
                          var perce = responseJson.condition

                          var cal = parseInt(this.state.finalPrice)  - perce
                          this.setState({calPrice : perce})
                          if (cal <= 0){
                              this.setState({finalPrice : 0})
                          }else{
                              this.setState({finalPrice : cal})
                          }
                          if (this.state.wallet == false){
                                 this.setState({finalwal :"0"})
                          }
                          if (this.state.refer == false){
                                 this.setState({finalref :"0"})
                          }


                          // if (this.state.isChecked == false){
                          //
                          //    this.setState({isChecked:true})
                          //    //GLOBAL.price = this.state.finalPrice
                          // }

                      }


                    }else{
                        alert('Invalid Promocode!')
                        this.setState({finalPrice : this.state.finalPrice})


                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

        }

    }


    capture = (a,s,id) =>{
//https://rzp_test_26ccbdbfe0e84b:69b2e24411e384f91213f22a@api.razorpay.com/v1/payments/pay_29QQoUBi66xm2f/capture

        var commonHtml = `https://rzp_live_P4iqckoSRdday1:XEAPO8kUokmnHZtHYrQZw9ZS@api.razorpay.com/v1/payments/${a}/capture`;
    //var commonHtml = `https://rzp_test_26ccbdbfe0e84b:69b2e24411e384f91213f22a@api.razorpay.com/v1/payments/pay_29QQoUBi66xm2f/capture`;


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
           this.props.navigation.navigate('Thankyou',id)

            })
            .catch((error) => {
                alert(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });


    }

    rajorPay = (ss,id) =>{
//rzp_test_26ccbdbfe0e84b
//rzp_live_P4iqckoSRdday1
        var b = parseInt(this.state.finalPrice) * 100

        var options = {
            description: ss,
            image: {uri :require('./logo.png')},
            currency: 'INR',
            key: 'rzp_live_P4iqckoSRdday1',
            amount:b,

            name: GLOBAL.myname,
            prefill: {
                email: GLOBAL.myemail,
                contact: GLOBAL.mymobile,
                name: GLOBAL.myname
            },
            theme: {color: '#7BAAED'}
        }

        RazorpayCheckout.open(options).then((data) => {
            var a = data.razorpay_payment_id
            this.capture(a,b,id);



        }).catch((error) => {
            // handle failure
           // this.myPayments(s,error.description,'')

        });
        RazorpayCheckout.onExternalWalletSelection(data => {



        });
    }

    calculation = () => {


        if (this.state.wallet == false && this.state.debit == false && this.state.refer == false){

    this.setState({finalPrice:GLOBAL.price})

return



        }



       else if (this.state.wallet == true && this.state.debit == false && this.state.refer == false){
        //      alert(this.state.cal)

            var a = parseInt(GLOBAL.price)
            var b = parseInt(this.state.walletrs)
            var c = b - a

            if (c>0){
               this.setState({finalwal :this.state.walletrs})
                this.setState({finalPrice:0})
                this.setState({finalref :"0"})
            }else{
                var s = a - b  - parseInt(this.state.calPrice)

                this.setState({finalwal :b})
                this.setState({finalPrice:s})
                this.setState({finalref :"0"})
            }

            return

        } else if (this.state.wallet == false && this.state.debit == true && this.state.refer == false){
            this.setState({finalPrice:GLOBAL.price})
            this.setState({finalwal :"0"})
            this.setState({finalref :"0"})
           // alert('2')
            return

        }else if (this.state.wallet == false && this.state.debit == false && this.state.refer == true){
            var a = parseInt(GLOBAL.price)
            var b = parseInt(this.state.referralrs)
            var c = b - a



            if (c>0){
                this.setState({finalPrice :0})
                this.setState({finalwal :"0"})
                this.setState({finalref :a})
            }else{
                var s = a - b
                this.setState({finalwal :"0"})
                this.setState({finalref :b})

                this.setState({finalPrice:s})
            }



         //   alert('3')
            return

        }


        else if (this.state.wallet == true && this.state.debit == true && this.state.refer == true){

            var a = parseInt(GLOBAL.price)
            var b = parseInt(this.state.walletrs)
            var s = parseInt(this.state.referralrs)
            var c =  a - (b + s)
            

            if (c < 0){
                this.setState({finalPrice :0})
                this.setState({finalwal :b})
                this.setState({finalref :s})
            }else{


                this.setState({finalPrice:c})
                this.setState({finalwal :b})
                this.setState({finalref :s})
            }

         //   alert('4')
            return

        }else if (this.state.wallet == true && this.state.debit == true && this.state.refer == false){


            var a = parseInt(GLOBAL.price)
            var b = parseInt(this.state.walletrs)

            var c = b - a



            if (c>0){
                this.setState({finalPrice:0})
                this.setState({finalwal :GLOBAL.price})
                this.setState({finalref :0})

            }else{
                var s = a - b

                this.setState({finalPrice:s})

                this.setState({finalwal :b})
                this.setState({finalref :0})
            }



         //   alert('5')
            return

        }
        // else if (this.state.wallet == true && this.state.debit == true && this.state.refer == true){
        //     alert('6')
        //     return
        //
        // }



        else if (this.state.wallet == true && this.state.debit == false && this.state.refer == true){
          //  alert('7')

            var a = parseInt(GLOBAL.price)
            var b = parseInt(this.state.walletrs)
            var s = parseInt(this.state.referralrs)



            var c =  a - (b + s)
            var d = a - s



            if (c <= 0){
              var pr = a - s
              if (pr <= 0){
                s = a
                d = "0"
              }

                this.setState({finalPrice:0})
                this.setState({finalwal :d})
                this.setState({finalref :s})

            }else{


                this.setState({finalPrice:c})
                this.setState({finalwal :b})
                this.setState({finalref :s})
            }


            return
        }



        else if (this.state.wallet == false && this.state.debit == true && this.state.refer == true){

            var a = parseInt(GLOBAL.price)
            var b = parseInt(this.state.referralrs)
            var c = b - a



            if (c>0){
                this.setState({finalPrice:0})
                this.setState({finalwal :0})
                this.setState({finalref :b})

            }else{
                var s = a - b

                this.setState({finalPrice:s})
                this.setState({finalwal :0})
                this.setState({finalref :b})
            }

         //   alert('8')
            return
        }


    }


    walletStateChange = () => {

        this.setState({wallet :!this.state.wallet})

        setTimeout(() => {
            // write your functions
            this.calculation()
        },1000);

    }
    debitstate = () => {
        this.setState({debit :!this.state.debit})
        setTimeout(() => {
            // write your functions
            this.calculation()
        },1000);

    }
    referalState = () => {
        this.setState({refer :!this.state.refer})
        setTimeout(() => {
            // write your functions
            this.calculation()
        },1000);

    }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    _handleStateChange = (state) => {
      this.showLoading()

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
                user_id: GLOBAL.user_id

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.hideLoading()



                if (responseJson.status == true) {
                    var s = parseInt(responseJson.refferal_wallet)*0.1




                    this.setState({walletrs : responseJson.wallet})
                    this.setState({referralrs : parseInt(s).toString()})

                }

            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()

            });

    }

    componentDidMount(){


        this.setState({wallet:true})
        this.setState({refer:true})
        setTimeout(() => {
            // write your functions
            this.calculation()
        },1000);


        this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
    }

    finalPay = () => {




        if (this.state.finalPrice == 0){


            if (GLOBAL.bookingtype == "package") {



                  var a = "";
                  var b = "";
                  var c = "";

                  if (this.state.promo == ""){
                      a = "0"
                  }
                  else{
                      a = this.state.promo
                  }
                  if (this.state.promoid == ""){
                      b = "0"
                  }else{
                      b = this.state.promoid
                  }

                  if (this.state.calPrice == ""){
                      c = "0"
                  }else{
                      c = this.state.calPrice
                  }
          //GLOBAL.addid
                  //this.state.calPrice

                  var s = `${GLOBAL.mytypes}|${a}|${b}|${GLOBAL.price}|${c}|${this.state.finalwal.toString()}|${this.state.finalref.toString()}`;





this.showLoading()
  var url = ""
  if ( GLOBAL.ytr == "1"){
      url = GLOBAL.BASE_URL + 'add_on_success_permanent'
  }else{
    url = GLOBAL.BASE_URL + 'package_success_permanent'
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
                        "pipe": s,



                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
this.hideLoading()

                        if (responseJson.status == true) {
                            // var commonHtml = `${GLOBAL.user_id}|emergency|${responseJson.id}`;

                            // this.rajorPay(commonHtml,responseJson.id)

                            this.props.navigation.navigate('Thankyou',responseJson.id)

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            }



          else  if (GLOBAL.type == "1") {
this.showLoading()
                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "1",
                        "module": 'emergency',
                        "address": GLOBAL.selectedAddress.address,
                        "area": GLOBAL.selectedAddress.area,
                        "pincode": GLOBAL.selectedAddress.pincode,
                        "city_state": GLOBAL.selectedAddress.city_state,
                        "problem": '',
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "total_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0"


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {

this.hideLoading()
                        if (responseJson.status == true) {
                           // var commonHtml = `${GLOBAL.user_id}|emergency|${responseJson.id}`;

                           // this.rajorPay(commonHtml,responseJson.id)

                              this.props.navigation.navigate('Thankyou',responseJson.id)

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            } else if (GLOBAL.type == "2") {
              this.showLoading()
                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "2",
                        "module": 'nurse',
                        "service_id": GLOBAL.serviceid,
                        "booking_time": GLOBAL.time,
                        "booking_date": GLOBAL.date,
                        "nurse_gender_prefer": GLOBAL.nurse,
                        "address": GLOBAL.selectedAddress.address,
                        "area": GLOBAL.selectedAddress.area,
                        "pincode": GLOBAL.selectedAddress.pincode,
                        "city_state": GLOBAL.selectedAddress.city_state,
                        "problem": '',
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "total_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0"


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {

this.hideLoading()
                        if (responseJson.status == true) {

                            this.props.navigation.navigate('Thankyou',responseJson.id)
                            //  this.rajorPay(responseJson.id)
                            //   this.props.navigation.navigate('Thankyou')

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            } else if (GLOBAL.type == "13") {
              this.showLoading()
                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "13",
                        "module": 'medical equipment',
                        "booking_date": GLOBAL.date,
                        "booking_type": GLOBAL.equipmentfor,
                        "address": GLOBAL.selectedAddress.address,
                        "area": GLOBAL.selectedAddress.area,
                        "pincode": GLOBAL.selectedAddress.pincode,
                        "city_state": GLOBAL.selectedAddress.city_state,
                        "name": GLOBAL.myname,
                        "email": GLOBAL.myemail,
                        "mobile": GLOBAL.mymobile,
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "order_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0"


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {

this.hideLoading()
                        if (responseJson.status == true) {

                            this.props.navigation.navigate('Thankyou',responseJson.id)
                            //  this.rajorPay(responseJson.id)
                            //   this.props.navigation.navigate('Thankyou')

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            } else if (GLOBAL.type == "8") {
              this.showLoading()
                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "12",
                        "module": 'test',
                        "booking_time": GLOBAL.time,
                        "booking_date": GLOBAL.date,
                        "payment_from": "rajor_pay",
                        "address": GLOBAL.selectedAddress.address,
                        "area": GLOBAL.selectedAddress.area,
                        "pincode": GLOBAL.selectedAddress.pincode,
                        "city_state": GLOBAL.selectedAddress.city_state,
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "order_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0"


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
this.hideLoading()

                        // alert(JSON.stringify(responseJson))

                        //  this.rajorPay()
                        if (responseJson.status == true) {


                            this.props.navigation.navigate('Thankyou',responseJson.id)
                            //   this.props.navigation.navigate('Thankyou')

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            } else if (GLOBAL.type == "3") {
              this.showLoading()
                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "3",
                        "module": 'medical_services',
                        "service_id": GLOBAL.serviceid,
                        "booking_time": GLOBAL.time,
                        "booking_date": GLOBAL.date,
                        "address": GLOBAL.selectedAddress.address,
                        "area": GLOBAL.selectedAddress.area,
                        "pincode": GLOBAL.selectedAddress.pincode,
                        "city_state": GLOBAL.selectedAddress.city_state,
                        "problem": '',
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "total_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0"


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
this.hideLoading()

                        // alert(JSON.stringify(responseJson))

                        //  this.rajorPay()
                        if (responseJson.status == true) {

                            this.props.navigation.navigate('Thankyou',responseJson.id)
                            //   this.props.navigation.navigate('Thankyou')

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            } else if (GLOBAL.type == "5") {
              this.showLoading()

//  GLOBAL.onlineMember
                var memberid = "";

                if (GLOBAL.onlineMember.length == 0) {
                    memberid = "0";
                } else {
                  for (var i = 0; i < GLOBAL.onlineMember.length; i++) {
                      memberid = memberid + GLOBAL.onlineMember[i].id + ','
                  }

                }


                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "5",
                        "module": "offline",
                        "doctor_id": GLOBAL.appointmentArray.id,
                        "booking_for": "self",
                          "problem":GLOBAL.problem,
                        "member_id": memberid,
                        "booking_time": GLOBAL.time,
                        "booking_date": GLOBAL.date,
                        "name": GLOBAL.onlinename,
                        "gender": GLOBAL.onlinegender,
                        "dob": GLOBAL.onlinedob,
                        "address": GLOBAL.onlineaddress,
                        "area": GLOBAL.onlinearea,
                        "pincode": GLOBAL.onlinecity,
                        "city_state": GLOBAL.onlinecity,
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "total_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "images": GLOBAL.listofimages,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0"


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {

this.hideLoading()
                        // alert(JSON.stringify(responseJson))

                        //  this.rajorPay()
                        if (responseJson.status == true) {

                            this.props.navigation.navigate('Thankyou',responseJson.id)

                            //   this.props.navigation.navigate('Thankyou')

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            } else if (GLOBAL.type == "4") {

                var memberid = "";

                if (GLOBAL.onlineMember.length == 0) {
                    memberid = "0";
                } else {
                    for (var i = 0; i < GLOBAL.onlineMember.length; i++) {
                        memberid = memberid + GLOBAL.onlineMember[i].id + ','
                    }

                }

this.showLoading()
                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "4",
                        "module": GLOBAL.onlinetype,
                          "problem":GLOBAL.problem,
                        "doctor_id": GLOBAL.appointmentArray.id,
                        "booking_for": "self",
                        "member_id": memberid,
                        "booking_time": GLOBAL.time,
                        "booking_date": GLOBAL.date,
                        "name": GLOBAL.onlinename,
                        "gender": GLOBAL.onlinegender,
                        "dob": GLOBAL.onlinedob,
                        "address": GLOBAL.onlineaddress,
                        "area": GLOBAL.onlinearea,
                        "pincode": GLOBAL.onlinecity,
                        "city_state": GLOBAL.onlinecity,
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "total_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "images": GLOBAL.listofimages,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0"


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {

this.hideLoading()
                        // alert(JSON.stringify(responseJson))

                        //  this.rajorPay()
                        if (responseJson.status == true) {


                            this.props.navigation.navigate('Thankyou',responseJson.id)
                            //   this.props.navigation.navigate('Thankyou')

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });

            } else {

this.showLoading()
                const url = GLOBAL.BASE_URL + 'add_permanent_booking'

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
                        "for": "1",
                        "module": 'planned',
                        "booking_time": GLOBAL.time,
                        "booking_date": GLOBAL.date,
                        "address": GLOBAL.selectedAddress.address,
                        "area": GLOBAL.selectedAddress.area,
                        "pincode": GLOBAL.selectedAddress.pincode,
                        "city_state": GLOBAL.selectedAddress.city_state,
                        "problem": GLOBAL.problem,
                        "coupan_code": this.state.promo,
                        "coupan_code_id": this.state.promoid,
                        "total_amount": this.state.finalPrice,
                        "discount_amount": this.state.calPrice,
                        "wallet_amount": this.state.finalwal.toString(),
                        "referral_amount": this.state.finalref.toString(),
                        "is_package":"0",
                        "images": GLOBAL.listofimages,


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {

this.hideLoading()

                        //  this.rajorPay()
                        if (responseJson.status == true) {
                            this.props.navigation.navigate('Thankyou',responseJson.id)
                            //    this.props.navigation.navigate('Thankyou')

                        } else {


                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading()
                    });
            }


        }else {


            if (this.state.wallet == false && this.state.debit == false && this.state.refer == false) {
                alert('Please select any option to Continue')
                return
            } else {


                if (GLOBAL.bookingtype == "package") {
                    var a = "";
                    var b = "";
                    var c = "";

                    if (this.state.promo == ""){
                        a = "0"
                    }
                    else{
                        a = this.state.promo
                    }
                    if (this.state.promoid == ""){
                        b = "0"
                    }else{
                        b = this.state.promoid
                    }

                    if (this.state.calPrice == ""){
                        c = "0"
                    }else{
                        c = this.state.calPrice
                    }
//GLOBAL.addid
                    //this.state.calPrice

                    var s = `${GLOBAL.mytypes}|${a}|${b}|${GLOBAL.price}|${c}|${this.state.finalwal.toString()}|${this.state.finalref.toString()}`;
                 //4

                 console.log(s)
                   // alert(GLOBAL.mytypes)
console.log(s)
                  this.rajorPay(s)
                } else {
                    var ref = "0"

                    if (this.state.refer == true) {

                    } else {
                        ref = "0"
                    }


                    if (GLOBAL.type == "1") {
this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'

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
                                "for": "1",
                                "module": 'emergency',
                                "address": GLOBAL.selectedAddress.address,
                                "area": GLOBAL.selectedAddress.area,
                                "pincode": GLOBAL.selectedAddress.pincode,
                                "city_state": GLOBAL.selectedAddress.city_state,
                                "problem": '',
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "total_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "trxn_mode": "ss",
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString()


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {
this.hideLoading()

                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|emergency|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)

                                    //  this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });

                    } else if (GLOBAL.type == "2") {
                      this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'

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
                                "for": "2",
                                "module": 'nurse',
                                "service_id": GLOBAL.serviceid,
                                "booking_time": GLOBAL.time,
                                "booking_date": GLOBAL.date,
                                "nurse_gender_prefer": GLOBAL.nurse,
                                "address": GLOBAL.selectedAddress.address,
                                "area": GLOBAL.selectedAddress.area,
                                "pincode": GLOBAL.selectedAddress.pincode,
                                "city_state": GLOBAL.selectedAddress.city_state,
                                "problem": '',
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "total_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "trxn_mode": "ss",
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString()


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {
this.hideLoading()

                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|nurse|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)

                                    //  this.rajorPay(responseJson.id)
                                    //   this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });

                    } else if (GLOBAL.type == "13") {
                      this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'

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
                                "for": "13",
                                "module": 'medical equipment',
                                "payment_from": "rajorpay",
                                "booking_date": GLOBAL.date,
                                "booking_type": GLOBAL.equipmentfor,
                                "address": GLOBAL.selectedAddress.address,
                                "area": GLOBAL.selectedAddress.area,
                                "pincode": GLOBAL.selectedAddress.pincode,
                                "city_state": GLOBAL.selectedAddress.city_state,
                                "name": GLOBAL.myname,
                                "email": GLOBAL.myemail,
                                "mobile": GLOBAL.mymobile,
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "total_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "trxn_mode": "ss",
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString()


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {
this.hideLoading()

                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|medical_equipment|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)

                                    //  this.rajorPay(responseJson.id)
                                    //   this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });

                    } else if (GLOBAL.type == "8") {
                      this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'

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
                                "for": "12",
                                "module": 'test',
                                "booking_time": GLOBAL.time,
                                "booking_date": GLOBAL.date,
                                "payment_from": "rajor_pay",
                                "address": GLOBAL.selectedAddress.address,
                                "area": GLOBAL.selectedAddress.area,
                                "pincode": GLOBAL.selectedAddress.pincode,
                                "city_state": GLOBAL.selectedAddress.city_state,
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "order_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString()


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {
this.hideLoading()

                                // alert(JSON.stringify(responseJson))

                                //  this.rajorPay()
                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|lab_test|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)


                                    //   this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });

                    } else if (GLOBAL.type == "3") {
                      this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'

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
                                "for": "3",
                                "module": 'medical_services',
                                "service_id": GLOBAL.serviceid,
                                "booking_time": GLOBAL.time,
                                "booking_date": GLOBAL.date,

                                "address": GLOBAL.selectedAddress.address,
                                "area": GLOBAL.selectedAddress.area,
                                "pincode": GLOBAL.selectedAddress.pincode,
                                "city_state": GLOBAL.selectedAddress.city_state,
                                "problem": '',
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "total_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "trxn_mode": "ss",
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString()


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {

this.hideLoading()
                                // alert(JSON.stringify(responseJson))

                                //  this.rajorPay()
                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|medical_services|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)


                                    //   this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });

                    } else if (GLOBAL.type == "5") {


                        var memberid = "";


                        if (GLOBAL.onlineMember.length == 0) {
                            memberid = "0";
                        } else {


                          for (var i = 0; i < GLOBAL.onlineMember.length; i++) {
                              memberid = memberid + GLOBAL.onlineMember[i].id + ','
                          }

                        }

this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'

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
                                "for": "5",
                                "module": "offline",
                                  "problem":GLOBAL.problem,
                                "doctor_id": GLOBAL.appointmentArray.id,
                                "booking_for": "self",
                                "member_id": memberid,
                                "booking_time": GLOBAL.time,
                                "booking_date": GLOBAL.date,
                                "name": GLOBAL.onlinename,
                                "gender": GLOBAL.onlinegender,
                                "dob": GLOBAL.onlinedob,
                                "address": GLOBAL.onlineaddress,
                                "area": GLOBAL.onlinearea,
                                "pincode": GLOBAL.onlinecity,
                                "city_state": GLOBAL.onlinecity,
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "total_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "trxn_mode": "ss",
                                "images": GLOBAL.listofimages,
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString()


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {

this.hideLoading()
                                // alert(JSON.stringify(responseJson))

                                //  this.rajorPay()
                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|offline|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)


                                    //   this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });

                    } else if (GLOBAL.type == "4") {

                        var memberid = "";

                        if (GLOBAL.onlineMember.length == 0) {
                            memberid = "0";
                        } else {
                            for (var i = 0; i < GLOBAL.onlineMember.length; i++) {
                                memberid = memberid + GLOBAL.onlineMember[i].id + ','
                            }

                        }

this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'
//                        alert(GLOBAL.date)
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
                                "for": "4",
                                "module": GLOBAL.onlinetype,
                                  "problem":GLOBAL.problem,
                                "doctor_id": GLOBAL.appointmentArray.id,
                                "booking_for": "self",
                                "member_id": memberid,
                                "booking_time": GLOBAL.time,
                                "booking_date": GLOBAL.date,
                                "name": GLOBAL.onlinename,
                                "gender": GLOBAL.onlinegender,
                                "dob": GLOBAL.onlinedob,
                                "address": GLOBAL.onlineaddress,
                                "area": GLOBAL.onlinearea,
                                "pincode": GLOBAL.onlinecity,
                                "city_state": GLOBAL.onlinecity,
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "total_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "trxn_mode": "ss",
                                "images": GLOBAL.listofimages,
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString()


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {

this.hideLoading()
                                // alert(JSON.stringify(responseJson))

                                //  this.rajorPay()
                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|online|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)


                                    //   this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });

                    } else {

this.showLoading()
                        const url = GLOBAL.BASE_URL + 'add_temporary_booking'

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
                                "for": "1",
                                "module": 'planned',
                                "booking_time": GLOBAL.time,
                                "booking_date": GLOBAL.date,
                                "address": GLOBAL.selectedAddress.address,
                                "area": GLOBAL.selectedAddress.area,
                                "pincode": GLOBAL.selectedAddress.pincode,
                                "city_state": GLOBAL.selectedAddress.city_state,
                                "problem": GLOBAL.problem,
                                "coupan_code": this.state.promo,
                                "coupan_code_id": this.state.promoid,
                                "total_amount": this.state.finalPrice,
                                "discount_amount": this.state.calPrice,
                                "trxn_mode": "ss",
                                "wallet_amount": this.state.finalwal.toString(),
                                "referral_amount": this.state.finalref.toString(),
                                "images": GLOBAL.listofimages,


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {

this.hideLoading()
                                //  this.rajorPay()
                                if (responseJson.status == true) {
                                    var commonHtml = `${GLOBAL.user_id}|planned|${responseJson.id}`;

                                    this.rajorPay(commonHtml,responseJson.id)
                                    //    this.props.navigation.navigate('Thankyou')

                                } else {


                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                this.hideLoading()
                            });
                    }
                }
            }
        }

    }

    render(){
      if(this.state.loading){
          return(
              <View style={styles.containers}>
                  <Loader>
                  </Loader>
              </View>
          )
      }
        return(


            <KeyboardAwareScrollView keyboardShouldPersistTaps ='always'>
                <View style={{flex:1,flexDirection:'column',backgroundColor:'#F5F5F5',width:window.width}}>


                    <View style={{height:'auto',width:window.width,marginTop:2,backgroundColor:'white',flexDirection:'column'}}>
                        <Text style={{fontSize:16, color:'#000000',marginLeft:12,marginTop:14,fontFamily:GLOBAL.semi}}>Payment Options</Text>
                        <View
                            style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:10}}>
                        </View>
                        <View >

                            <TouchableOpacity onPress = {()=> this.debitstate()}>
                            <View style = {{flexDirection:'row',margin:10,marginTop:1}}>

                                <Text style = {{fontFamily:GLOBAL.regular,color:'#000000',fontSize:14,width:window.width - 70}}>
                                    Debit/Credit/NetBanking

                                </Text>

                                {this.state.debit == false && (
                                    <Image
                                        style={{height:20,width:20,marginLeft:12,marginTop:6}}
                                        source={require('./uncheck.png')}
                                    />
                                )}
                                {this.state.debit == true && (
                                    <Image
                                        style={{height:20,width:20,marginLeft:12,marginTop:4}}
                                        source={require('./check.png')}
                                    />
                                )}


                            </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {()=> this.referalState()}>
                            <View style = {{flexDirection:'row',margin:10,marginTop:4}}>

                                <Text style = {{fontFamily:GLOBAL.regular,color:'#000000',fontSize:14,width:window.width - 70}}>
                                    Use 10% Referral Bonus Rs {this.state.referralrs}

                                </Text>

                                {this.state.refer == false && (
                                    <Image
                                        style={{height:20,width:20,marginLeft:12,marginTop:6}}
                                        source={require('./uncheck.png')}
                                    />
                                )}
                                {this.state.refer == true && (
                                    <Image
                                        style={{height:20,width:20,marginLeft:12,marginTop:6}}
                                        source={require('./check.png')}
                                    />
                                )}

                            </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {()=> this.walletStateChange()}>
                            <View style = {{flexDirection:'row',margin:10,marginTop:4}}>

                                <Text style = {{fontFamily:GLOBAL.regular,color:'#000000',fontSize:14,width:window.width - 70}}>
                                    Use Wallet Rs {this.state.walletrs}

                                </Text>

                                {this.state.wallet == false && (
                                    <Image
                                        style={{height:20,width:20,marginLeft:12,marginTop:6}}
                                        source={require('./uncheck.png')}
                                    />
                                )}
                                {this.state.wallet == true && (
                                    <Image
                                        style={{height:20,width:20,marginLeft:12,marginTop:6}}
                                        source={require('./check.png')}
                                    />
                                )}

                            </View>
                            </TouchableOpacity>





{/*                            <View style={{flexDirection:'column',marginLeft:32,marginTop:18}}>
                                <Image
                                    style={{height:40,width:40}}
                                    source={require('./cardlogo.png')}
                                />


                            </View>
                            */}

                        </View>






                    </View>

                    <View style={{height:100,backgroundColor:'white',width:window.width,marginTop:2,flexDirection:'column'}}>

                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Image
                                style={{height:30,width:30,marginLeft:12,marginTop:6}}
                                source={require('./logo.png')}
                            />
                            <Text style={{fontSize:13,fontFamily:GLOBAL.regular,marginLeft:0,marginTop:10}}>Apply Promo/Referral Code</Text>
                        </View>


                        <TextInput style={{fontSize:16,height:40,width: window.width- 20,borderWidth:1,borderColor:'#e1e1e1',marginTop:2,alignSelf:'center',marginLeft:10}}
                                   placeholder="Enter Promo Code"
                                   placeholderTextColor="lightgrey"

                                   returnKeyType='go'
                                   onChangeText = {(text)=> this.setState({promo: text})}
                                   secureTextEntry={false}
                                   autoCorrect={false}
                        />
                    </View>

                    {this.state.ok == false && (
                    <Button
                        style={{padding:4,marginTop:1,fontSize: 20,color:'#D90000',marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.verify()}>
                        VERIFY
                    </Button>
                    )}

                    <View style={{height:120,width:window.width,marginTop:2,backgroundColor:'white',flexDirection:'column'}}>

                        <Text style={{fontSize:16, color:'black',marginLeft:12,marginTop:12,fontFamily:GLOBAL.semi,fontWeight:'bold'}}>Price Details</Text>
                        <View
                            style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12}}>
                        </View>
                        <View style={{marginTop:4,flexDirection:'row',width:'100%'}}>
                            <Text style={{fontSize:15,color:'black',marginLeft:17,fontFamily:GLOBAL.semi,width:'70%'}}>Order Amount</Text>
                            <Text style={{fontSize:15,color:'black',fontFamily:GLOBAL.semi,alignSelf:'flex-end',marginRight:20}}>₹{parseInt(GLOBAL.price) }/-</Text>
                        </View>
                        <View
                            style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12}}>
                        </View>
                        <View style={{marginTop:4,flexDirection:'row',width:'100%'}}>
                            <Text style={{fontSize:14,color:'black',marginLeft:17,fontFamily:GLOBAL.regular,width:'70%'}}>Sub-Total</Text>
                            <Text style={{fontSize:15,color:'black',fontFamily:GLOBAL.semi,alignSelf:'flex-end',marginRight:20}}>₹{parseInt(this.state.calPrice) }/-</Text>
                        </View>

                    </View>


                    <View style={{marginTop:4,flexDirection:'row',width:'100%',backgroundColor:'white',height:40}}>
                        <Text style={{fontSize:14,color:'black',marginLeft:17,fontFamily:GLOBAL.regular,width:'70%',marginTop:12}}>Amount Payable</Text>
                        <Text style={{fontSize:15,color:'black',fontFamily:GLOBAL.semi,alignSelf:'flex-end',marginRight:20,marginTop:12}}>₹{parseInt(this.state.finalPrice) }/-</Text>
                    </View>


                    <Button
                        style={{padding:4,marginTop:20,marginBottom:10,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.finalPay()}>
                       SUBMIT
                    </Button>

                </View>
            </KeyboardAwareScrollView>


        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor :'white',

    },
    containers: {

        backgroundColor :'white'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor: GLOBAL.COLOR.Header,
       paddingTop: Platform.OS === "android" ? 0 : 0
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

export default Payment;
