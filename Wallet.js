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

    ImageBackground, Image, Dimensions,
} from 'react-native';

import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
const window = Dimensions.get('window');

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

export default class Wallet extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        wallet:'',
        list:[],
        referral:'',
        total:'',

    };

    static navigationOptions = ({ navigation }) => {
    return {
        //   header: () => null,
        title: 'Wallet',
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



    getWallet =()=>{
var a = 0
  if (this.state.list.length == 0){
    a = 0
  }else{
    a = this.state.list.length + 1
  }


  const url = GLOBAL.BASE_URL +  'patient_wallet_history'

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
          user_id: GLOBAL.user_id,
          limit_from:a

      }),
  }).then((response) => response.json())
      .then((responseJson) => {




          if (responseJson.status == true) {
            const interest = [...this.state.list, ...responseJson.list];

                                           this.setState({list: interest})




          }

      })
      .catch((error) => {
          console.error(error);

      });
}





    renderFooter = () => {
          //it will show indicator at the bottom of the list when data is loading otherwise it returns null
          if (!this.state.loading) return null;
          return (
              <ActivityIndicator
                  style={{ color: '#000' }}
              />
          );
      };
    _handleStateChange = (state) =>{
      this.getWallet()
      const url = GLOBAL.BASE_URL +  'get_profile'

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                user_id:GLOBAL.user_id,


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {






                                if (responseJson.status == true) {
        var totalAmount = parseInt(responseJson.wallet) + parseInt(responseJson.refferal_wallet)
                    this.setState({wallet : responseJson.wallet})
                    this.setState({referral : responseJson.refferal_wallet})
  this.setState({total : totalAmount})

                                }else {
                                    alert('Unable to get Connect You. Please try again after Sometime.')
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
    }
    componentDidMount(){
this.props.navigation.addListener('willFocus', this._handleStateChange);
    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    renderRowItem1 = (itemData) => {
        return (

    <View style={{backgroundColor:'white',color :'white' , flex: 1 ,margin: 10, height: 'auto',borderRadius :6,width : window.width- 20, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5 }}>

    <View style = {{flexDirection:'row',margin:8}}>
    <Image
        source={require('./wallet.png')}
        style={{width: 60, height: 60,marginRight:20,marginTop:0,resizeMode:'contain'}}


    />


<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
    <View style = {{width :window.width - 230}}>
    <Text style = {{fontSize:17,margin:5,fontFamily:GLOBAL.medium, marginLeft:1,marginTop:10}}>
        {itemData.item.line}

    </Text>

    <Text style = {{fontSize:12,color:'#8E9198',fontFamily:GLOBAL.roman, marginLeft:1,marginTop:4}}>
   {itemData.item.date}

    </Text>
      </View>

    {itemData.item.condition == "add" && (
      <Text style = {{fontSize:20,color:'#D90000',marginTop:20 }}>
          +₹{itemData.item.amount}

      </Text>
    )}

    {itemData.item.condition != "add" && (
      <Text style = {{fontSize:20,color:'#D90000', marginLeft:10,marginTop:20 }}>
          -₹{itemData.item.amount}

      </Text>
    )}


    </View>
    </View>







                <Text style = {{fontSize:15,fontFamily:GLOBAL.roman, marginLeft:10,marginTop:4,marginBottom:1}}>
Closing Balance :   {itemData.item.closing_bal}

                </Text>


                  </View>


        )
    }



    render(){
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <StatusBar backgroundColor="#639ced" barStyle="light-content" />



                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >

                    <View style = {{width:window.width - 20 ,alignSelf:'center',backgroundColor:'#ced4e2',height:200,borderRadius:12,marginTop:20}}>


                        <Text style = {{color:'white',fontSize:22,fontFamily:GLOBAL.heavy,margin:18}}>
                            Wallet Balance


                        </Text>

                        <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
<View>
                            <Text style = {{color:'white',fontSize:18,fontFamily:GLOBAL.heavy,margin:18,marginTop:-10,width:220}}>
                            Wallet Balance:    ₹ {this.state.wallet}


                            </Text>
                            <Text style = {{color:'white',fontSize:18,fontFamily:GLOBAL.heavy,margin:18,marginTop:-16,width:220}}>
                            Referral Balance: ₹ {this.state.referral}


                            </Text>
                            <Text style = {{color:'white',fontSize:18,fontFamily:GLOBAL.heavy,margin:18,marginTop:-16,width:220}}>
                            Total Balance:      ₹ {this.state.total}


                            </Text>
</View>
                            <Image
                                source={require('./wallete.png')}
                                style={{width: 60, height: 60,marginRight:20,marginTop:0,resizeMode:'contain'}}


                            />

                        </View>

                        <Button
                            style={{marginLeft:18,paddingTop: 4 ,fontSize: 20, color: 'white',fontFamily:GLOBAL.medium,marginTop:0,height:40,width:100,borderRadius:4,borderWidth:1,borderColor:'white'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.props.navigation.navigate('WalletRecharge',this.state.wallet)}>
                           +  ADD
                        </Button>

                    </View>

                                  <FlatList style = {{marginTop:20,}}
                                      data={this.state.list}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={this.renderRowItem1}
                                      extraData={this.state}
                                      ListFooterComponent={this.renderFooter.bind(this)}
                                                 onEndReachedThreshold={0.5}
                                                 onEndReached={() => this.getWallet()}
                                  />


                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
