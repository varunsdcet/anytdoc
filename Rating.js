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


import Dialog, { DialogContent } from 'react-native-popup-dialog';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
import Stars from 'react-native-stars';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
var params = [];
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

export default class Rating extends Component {
    state = {
        selectedIndex: 0,
        speciality : [],
        visible:false,
        rating:'Very Good',
        value:4,
        password:'',


    };

    componentDidMount(){
      params = this.props.navigation.state.params

    //  params = this.props.navigation.state.params

    }
    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'Rating',
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
_handlePress = () =>{


  const url = GLOBAL.BASE_URL +  'rating_doctor'

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id:GLOBAL.user_id,
                            doctor_id:params.doctor_id,
                            review:this.state.password,
                            rating:this.state.value,
                            booking_id:params.booking_id,




                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {






                            if (responseJson.status == true) {
                                alert('Rating Successfully Submit')
  this.prop.navigation.goBack()

                            }else {
                                alert('Unable to get Connect You. Please try again after Sometime.')
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });


}

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

star = (val) =>{
  this.setState({value:val})

  this.setState({stars: val})
  if (val == 1){
    this.setState({rating:'Poor'})
  }else if (val == 2){
    this.setState({rating:'Average'})
  }else if (val == 3){
    this.setState({rating:'Good'})
  }
  else if (val == 4){
    this.setState({rating:'Very Good'})
  }else if (val == 5){
    this.setState({rating:'Excellent'})
  }
}
//this.setState({stars: val})

    render(){
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <StatusBar backgroundColor="#639ced" barStyle="light-content" />



                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >

                <Image
                 source={{uri: this.props.navigation.state.params.doctor_image}}
                         style  = {{width:120, height:120,borderRadius:60,margin:20,marginTop:10,alignSelf:'center'
                         }}

  />
  <Text style={{fontFamily:GLOBAL.heavy,fontSize:20,marginLeft:6,marginTop:2,textAlign:'center',color:'#1E2432',fontWeight:'bold'}}>
      Rate Your Experience

  </Text>
    <Text style={{fontFamily:GLOBAL.medium,fontSize:17,marginLeft:6,marginTop:2,textAlign:'center',color:'#D90000'}}>
      Tell us how was your experience

  </Text>
  <View style = {{backgroundColor:'#fcebbf',borderRadius:32,width:200,alignSelf:'center',height:30,marginTop:30}}>
  <Text style={{fontFamily:GLOBAL.heavy,fontSize:15,marginLeft:6,marginTop:4,textAlign:'center',color:'#1E2432'}}>
   {this.state.rating}

</Text>



  </View>
  <View style={{alignItems:'center',marginTop:20}}>
    <Stars
      half={false}
      default={4}
      update={(val)=>{this.star(val)}}
      spacing={4}
      starSize={40}
      count={5}
      fullStar= {require('./fillstar.png')}
      emptyStar= {require('./emptystar.png')}
        halfStar= {require('./fillstar.png')}
    />
  </View>
  <Text style={{fontFamily:GLOBAL.medium,fontSize:15,marginLeft:6,marginTop:18,marginLeft:30,color:'black'}}>
      Write your feedback

  </Text>
  <TextInput
     style={{ height: 100, borderColor: '#bfc4d1', borderWidth: 2 ,width:window.width - 60,alignSelf:'center',marginTop:8,borderRadius:8}}
     onChangeText={(text) => this.setState({password:text})}
     value = {this.state.password}

   />

   <Button
       style={{marginLeft:28,paddingTop: 12 ,fontSize: 20,fontWeight:'bold',backgroundColor:'#D90000', color: 'white',fontFamily:GLOBAL.medium,marginTop:30,height:50,width:window.width - 56,borderRadius:4}}
       styleDisabled={{color: 'red'}}
       onPress={() => this._handlePress()}>
       SUBMIT
   </Button>

   <Dialog
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
  >
    <DialogContent>
   <View style = {{width :window.width - 100 ,height :200,borderRadius:12}}>

   <Image   source={require('./checks.png')}
            style  = {{width:90, height:90,margin:20,marginTop:20,alignSelf:'center'
          }}/>

          <Text style={{fontFamily:GLOBAL.medium,fontSize:22,marginTop:3,color:'black',textAlign:'center'}}>
            Thank  you for your feedback

          </Text>

   </View>



    </DialogContent>
  </Dialog>
  <Text style = {{height:40}}>
  </Text>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
