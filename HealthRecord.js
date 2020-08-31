import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions,  SafeAreaView,} from 'react-native';


const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';

const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
class HealthRecord extends Component<Props> {

  static navigationOptions = ({ navigation }) => {
      return {
          //   header: () => null,
          title: 'Health Record',
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




  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
       message: '',
       status :'' ,
       loading : '',
       userid : '',
       notificationslist:[],
    }
}
  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {

let added_buttons_goes_here = itemData.item.images.map( (data, index) => {
        return (
          <TouchableOpacity onPress={() => Linking.openURL(data)
          }>
    <Image style={{width:130, height:130, margin:10}} source={{uri: data}}/>
    </TouchableOpacity>
        )
      });
    return (
      <View style={{flexDirection: 'column',
    flex : 1, backgroundColor:'white',borderRadius:5,  width : window.width-20 ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:10,}}>

    <View style={{flexDirection:'row', width:'100%'}}>
    <Text style= {{color:'#D90000',fontSize:14,fontFamily:GLOBAL.semi,margin:10,fontWeight:'bold'}}>

      Booking Type:
     </Text>
    <Text style= {{color:'black',fontSize:14,fontFamily:GLOBAL.semi,marginTop:10,fontWeight:'bold'}}>
{itemData.item.type}
     </Text>

    </View>

    <View style={{flexDirection:'row', width:'100%'}}>
    <Text style= {{color:'#D90000',fontSize:14,fontFamily:GLOBAL.semi,margin:10,fontWeight:'bold'}}>

      Booking Id:
     </Text>
    <Text style= {{color:'black',fontSize:14,fontFamily:GLOBAL.semi,marginTop:10,fontWeight:'bold'}}>
{itemData.item.booking_id}
     </Text>

    </View>
    <Text style= {{color:'#D90000',fontSize:14,fontFamily:GLOBAL.semi,marginLeft:10,fontWeight:'bold'}}>
    Attachments
     </Text>


    {added_buttons_goes_here}
    <View style={{flexDirection:'column', width:'100%'}}>


    </View>



</View>



    )
  }

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }



componentDidMount(){



  this.getReviews()
}

   getReviews= () =>{
      this.showLoading();
      const url = GLOBAL.BASE_URL +  'list_user_reports'
      this.showLoading()
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


       this.setState({notificationslist : responseJson.history})

       }

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }

  render() {



    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

        size="large" color='#7BAAED' />


        </View>
      )
    }
    return (

      <SafeAreaView style={styles.AndroidSafeArea}>
                     <StatusBar backgroundColor="#639ced" barStyle="light-content" />


  <KeyboardAwareScrollView style = {{backgroundColor:'#FAFAFA',height:window.height}} keyboardShouldPersistTaps='always'>

{this.state.notificationslist.length == 0 &&(
    <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily: 'AvenirLTStd-Roman'}}>No health records found!</Text>
  )}

  {this.state.notificationslist.length !=0 &&(
      <FlatList style= {{flexGrow:0, marginBottom:20}}
          data={this.state.notificationslist}
          numColumns={1}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
        />

    )}



</KeyboardAwareScrollView>
     </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#f2f2f2',
  },
  statusBar: {
  height: STATUSBAR_HEIGHT,
},
 appBar: {
   backgroundColor:'black',
   height: APPBAR_HEIGHT,
 },
 AndroidSafeArea: {
    flex: 0,
    backgroundColor: GLOBAL.COLOR.Header,
    paddingTop: Platform.OS === "android" ? 0 : 0
},
 loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
      },

});

export default HealthRecord;
