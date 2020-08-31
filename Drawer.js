import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {NavigationActions,StackActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View ,Linking,AsyncStorage,    StyleSheet,Share,
Image,TouchableOpacity,Alert,TouchableNativeFeedback} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

import moment from 'moment';


const GLOBAL = require('./Global');

class Drawer extends Component {

 constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      my: 'sdf',
      expandList:false
    }
}

  componentDidMount() {

     var value =  AsyncStorage.getItem('name');
    value.then((e)=>{

      GLOBAL.name = e;

    this.setState({my: GLOBAL.name})
    })

}

expandList=(visible)=>{
  this.setState({expandList: !this.state.expandList})
}

_fancyShareMessage=()=>{

        var a = 'Hey! Checkout Anytimedoc app. ' +'https://play.google.com/store/apps/details?id=com.anytimedoc'

        Share.share({
                message:a
            },{
                tintColor:'green',
                dialogTitle:'Share this app via....'
            }
        ).then(this._showResult);
    }


_YesLogout=()=>{

//        const url = GLOBAL.BASE_URL +  'logout'
// //      this.showLoading()
//       fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     user_id : GLOBAL.userid,
//   }),
// }).then((response) => response.json())
//     .then((responseJson) => {

// //    alert(JSON.stringify(responseJson))
//   //     this.hideLoading()
//        if (responseJson.status == true) {
  AsyncStorage.removeItem('userID');

   this.props
   .navigation
   .dispatch(StackActions.reset({
     index: 0,
     actions: [
       NavigationActions.navigate({
         routeName: 'Login',
         params: { someParams: 'parameters goes here...' },
       }),
     ],
   }))


    this.props.navigation.dispatch(DrawerActions.closeDrawer())

    //    }else {
    //        alert('Something Went Wrong.')
    //    }
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    }


navigateToScreen1 = (route) => () => {

    Alert.alert('Logout!','Are you sure you want to Logout?',
      [{text:"Cancel"},
        {text:"Yes", onPress:()=>this._YesLogout()
 },
      ],
      {cancelable:false}
      )

  }


  navigateToScreen = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }


    selectedFirst = (index) => ()=>{
      GLOBAL.date=moment()
        GLOBAL.time=''
        GLOBAL.mera = "0"
        GLOBAL.selectedAddress=[]
        GLOBAL.price=''
        if (index == 0){
            this.props.navigation.navigate('DoctorVisit')
        }else if (index == 1){
            this.props.navigation.navigate('Nurse')
        }else if (index == 2){
            this.props.navigation.navigate('MedicalService')
        }else if (index == 3){
            this.props.navigation.navigate('BookingAppointment')
        }else if (index == 4){
            this.props.navigation.navigate('OfflineBooking')
        }else if (index == 5){
            this.props.navigation.navigate('Insurance')
        }else if (index == 6){
            this.props.navigation.navigate('AmbulanceBooking')
        }else if (index == 7){
            this.props.navigation.navigate('LabHistory')
        }else if (index == 8){
            this.props.navigation.navigate('PurchaseType')
        }else if (index == 9){
            this.props.navigation.navigate('OpdHealth')
        }else if (index == 10){
            this.props.navigation.navigate('HealthPackege')
        }else if (index == 11){
            this.props.navigation.navigate('SurgicalPackage')
        }else if (index == 12){
            this.props.navigation.navigate('Pharmacy')
        }
    }


  render () {

    return (
      <View style={{flex:1, backgroundColor:'#7BAAED'}}>
        <ScrollView>
          <View style={{backgroundColor:'#7BAAED',}}>


            <View  style={styles.headertop}>

            <View style={{marginTop:30, marginLeft:20, flexDirection: 'column'}}>


<View style={{flexDirection:'column', marginTop:5,}}>

    <Image style={{width:70, height:70, borderRadius:35, marginLeft:10}}
    source={{uri: GLOBAL.profileImage}}/>
         <Text style = {{marginTop:10,color : 'white',marginLeft : 10,fontSize: 17, height:'auto',fontFamily:'Poppins-Regular'}} >
          {GLOBAL.myname}
         </Text>
          <Text style = {[styles.drawerText, {color:'white'}]} >
          {GLOBAL.myemail}
         </Text>
</View>

<TouchableNativeFeedback onPress={()=> this.props.navigation.navigate('EditProfile')}>
        <View style={{marginTop:30,padding:5, height:25, overflow:'hidden', borderRadius:15,marginLeft:10,    borderWidth: 2,width:120,marginBottom:10,
    borderColor:'white' ,backgroundColor: '#7BAAED', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

      <Text style={{fontSize:10, color:'white',fontFamily:'Poppins-Medium',alignSelf:'center' }}>Edit Profile</Text>

    </View>
    </TouchableNativeFeedback>

</View>

            </View>



             <View style={styles.menuItem}>
               <Image style={styles.drawericon}
                             source={require('./drawer/d_home.png')} />
              <Text style = {styles.drawerTexts}
              onPress={()=>this.props.navigation.toggleDrawer()}>
                Home
              </Text>
            </View>


            <TouchableOpacity onPress={()=> this.expandList()}>
            <View style={styles.menuItem}>

                <Image style={styles.drawericon}
                            source={require('./drawer/d_serv.png')} />
            <Text style = {styles.drawerTexts}>
             All Services
             </Text>
           </View>
           </TouchableOpacity>


           {this.state.expandList == true &&(
            <View>
             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(0)}>
              Doctor at Doorstep
              </Text>
            </View>


             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(1)}>
              Nursing Care at Home
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(2)}>
              Medical Services at Doorstep
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(3)}>
              24x7 Online Consultation
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(4)}>
              Doctor Appointment at Clinic
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(5)}>
              Hospital Admissions
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(6)}>
              Ambulance Booking
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(7)}>
              Lab Test Booking
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(8)}>
              Medical Equipments
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(9)}>
              OPD Health Plans
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(10)}>
              Health Packages
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(11)}>
              Best Surgical Packages
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Text style={styles.drawericons}></Text>

            <Text style = {styles.drawerTexts}
              onPress={this.selectedFirst(12)}>
              Pharmacy
              </Text>
            </View>

            </View>

            )
           }
             <View style={styles.menuItem}>
             <Image style={styles.drawericon}
                             source={require('./drawer/d_ru.png')} />

            <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('OpdHealth')}>
              Subscription
              </Text>
            </View>

            <View style={styles.menuItem}>

                <Image style={styles.drawericon}
                            source={require('./drawer/d_book.png')} />
            <Text style = {styles.drawerTexts}
             onPress={this.navigateToScreen('Appointment')}>
             My Booking
             </Text>
           </View>


           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_my_order.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('History')}>
            My Order
            </Text>
          </View>

            <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./drawer/d_my_order.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={this.navigateToScreen('PharmacyOrder')}>
                                Pharmacy Order
                            </Text>
              </View>

           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_serv.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('LabHistory')}>
            My Test
            </Text>
          </View>




          <View style={styles.menuItem}>

              <Image style={styles.drawericon}
                          source={require('./drawer/d_about.png')} />
          <Text style = {styles.drawerTexts}
           onPress={()=>this.props.navigation.navigate('AboutUs')}>
           About Us
           </Text>
         </View>


           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_support.png')} />
           <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('Support')}>
              Support
               </Text>
          </View>

          <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_pri.png')} />
           <Text style = {styles.drawerTexts}
            onPress={()=>this.props.navigation.navigate('Privacyp')}>
            Privacy Policy
            </Text>
          </View>

          <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_pri.png')} />
           <Text style = {styles.drawerTexts}
            onPress={()=>this.props.navigation.navigate('ListMember')}>
            List of Member
            </Text>
          </View>

           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_tc.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('Terms')}>
            Terms & Conditions
            </Text>
          </View>

           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_share.png')} />
           <Text style = {styles.drawerTexts}
        onPress={this.navigateToScreen('WalletHistory')}>
            Wallet History
            </Text>
          </View>


           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./drawer/d_tc.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('Refernearn')}>
            Refer and Earn
            </Text>
          </View>


              <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./drawer/d_tc.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={this.navigateToScreen('NurseHistory')}>
                                Nurse History
                            </Text>
              </View>



             <View style={styles.menuItem}>
               <Image style={styles.drawericon}
                             source={require('./drawer/d_logout.png')} />
              <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen1('Login')}>
                Logout
              </Text>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.object
};


const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',

    },
       drawerText :{
      marginTop : 2,
      color : 'white',
      marginLeft : 10,
      fontSize: 13,

  } ,
headertop :{

    width : 300,
   height : 230,
    backgroundColor : '#7BAAED',
    flexDirection:'column'
  } ,

    containers: {
        flex: 1,

    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
 drawericon: {
    borderLeftWidth: 1,
    width: 20,
    height: 20,
    marginLeft : 8 ,
    marginTop : 3,
    resizeMode:'contain'


  },

 drawericons: {

    width: 20,
    height: 20,
    marginLeft : 8 ,
    marginTop : 3,

  },


   drawerTexts: {

    width: 210,
    height: 22,
    marginLeft : 45 ,
    marginTop : -18,
    color: 'white',
    fontFamily: 'Poppins-Medium'

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
        fontFamily:'Poppins-Regular',


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
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})

export default Drawer;
