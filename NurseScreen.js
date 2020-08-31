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
    ImageBackground,
    AsyncStorage
} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import Loader from './Loader.js';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NurseScreen extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        isSelected_male:false,
        isSelected_female:false,
        text:'',

        selected:false,
        data:[],
        images :[

        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SELECT NURSE TYPE',
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



    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){

    }



    login = () => {
        if (this.state.isSelected_male == 1){

            GLOBAL.nurse = 'Male'
            this.props.navigation.navigate('NurseBooking')
            return
        }
        if (this.state.isSelected_female== 1){

            GLOBAL.nurse = 'Female'
            this.props.navigation.navigate('NurseBooking')
              return
        }


    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = () => {
        var a = this.state.images
        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }
        var index = a[0]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[0] = index
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

    firstChangeMale=()=> {
        this.setState({ isSelected_male: 1 })
        this.setState({ text: 'male' })
        this.setState({ isSelected_female: 0 })

      }

      secondChangeMale=()=> {
        this.setState({ isSelected_male: 0 })
      }

      firstChangeFemale=()=> {
        this.setState({ isSelected_female: 1 })
        this.setState({ text: 'female' })
        this.setState({ isSelected_male: 0 })
      }

      secondChangeFemale=()=> {
        this.setState({ isSelected_female: 0 })
      }


    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
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



                <ImageBackground style={{resizeMode:'contain',height:'100%',width:'100%'}} source={require('./choose.png')}>
                           <View style={{flex:3}}>
                           </View>
                           <View style={{flex:4}}>
                           <Text style={{fontSize:41,fontFamily:GLOBAL.semi,color:'white',alignSelf:'center',marginTop:-100}}>Select Gender</Text>

                           <View style={{flexDirection:'row',width:'58%',height:99,alignItems:'center',justifyContent:'space-between',alignSelf:'center',marginTop:65}}>

                             {this.state.isSelected_male == 0 &&  (

                              <TouchableOpacity style={{borderRadius:43.5,marginLeft:6}} onPress={()=>this.firstChangeMale()}>
                                <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#5836FF'}}>
                                 <Image source={require('./male.png')}
                                 style={{height:24,width:24,resizeMode:'contain',marginTop:15}}/>
                                 <Text style={{fontSize:15,fontFamily:GLOBAL.regular,color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>MALE</Text>
                                </View>

                              </TouchableOpacity>

                             )}

                             {this.state.isSelected_male == 1 &&  (


                               <TouchableOpacity style={{borderRadius:49.5}} onPress={()=>this.secondChangeMale()}>
                               <View style={{height:99,width:99,borderRadius:49.5,borderWidth:1,borderColor:'#5836FF80',justifyContent:'center',backgroundColor:'transparent'}}>
                                 <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#5836FF',alignSelf:'center'}}>
                                  <Image source={require('./male.png')}
                                  style={{height:24,width:24,resizeMode:'contain',marginTop:15}}/>
                                  <Text style={{fontSize:15,fontFamily:GLOBAL.regular,color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>MALE</Text>
                                 </View>

                                </View>
                               </TouchableOpacity>
                             )}


                             {this.state.isSelected_female == 0 &&  (

                              <TouchableOpacity style={{borderRadius:43.5,marginRight:6}} onPress={()=>this.firstChangeFemale()}>
                                <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#7E274A'}}>
                                 <Image source={require('./female.png')}
                                 style={{height:26,width:17,resizeMode:'contain',marginTop:15}}/>
                                 <Text style={{fontSize:15,fontFamily:GLOBAL.regular,color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>FEMALE</Text>
                                </View>

                              </TouchableOpacity>

                             )}

                             {this.state.isSelected_female == 1 &&  (


                               <TouchableOpacity style={{borderRadius:49.5}} onPress={()=>this.secondChangeFemale()}>
                               <View style={{height:99,width:99,borderRadius:49.5,borderWidth:1,borderColor:'#7E274A80',justifyContent:'center'}}>
                                 <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#7E274A',alignSelf:'center'}}>
                                  <Image source={require('./female.png')}
                                  style={{height:26,width:17,resizeMode:'contain',marginTop:15}}/>
                                  <Text style={{fontSize:15,fontFamily:GLOBAL.regular,color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>FEMALE</Text>
                                 </View>

                                </View>
                               </TouchableOpacity>
                             )}



                           </View>
                           </View>
                          <View style={{flex:2}}>

                          <Button
                              style={{padding:12,marginTop:8,fontSize: 18, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4,fontWeight:'bold'}}
                              styleDisabled={{color: 'red'}}
                              onPress={() => this.login()}>
                           SUBMIT
                          </Button>

                          </View>
                      </ImageBackground>












                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {


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
